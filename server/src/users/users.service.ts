import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UserSignUpDto } from './dtos/user-signup.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { Role } from '../auth/enums/roles.enum';
import { SubmissionService } from 'src/exam/submission/submission.service';
import { UserStatsDto } from './dtos/user-stat.dto';
import { FlashcardEntity } from 'src/flashcard/entities/flashcard.entity';
import { FlashcardService } from 'src/flashcard/flashcard.service';
import { ExamService } from 'src/exam/exam.service';
import { TestEntity } from 'src/exam/entities/exam.entity';
import { AnswerDto } from 'src/exam/submission/dtos/create-submission.dto';
import { TestDetailsEntity } from 'src/exam/entities/test-details.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        @InjectModel(FlashcardEntity)
        @InjectModel(TestEntity)
        private readonly userModel: typeof User,
        private flashcardService: FlashcardService,
        private submissionService: SubmissionService,
        private examService: ExamService,
        private configService: ConfigService,
    ) {}

    async getHistoryExams(profileUser: User): Promise<TestDetailsEntity[]> {
        try {
            const { id } = profileUser;
            const tests = await this.examService.findAll();
            const submissions = await this.submissionService.findAll();
            const userSubmissions = submissions.filter(
                (submission) => submission.userId === id,
            );
            const processedSubmission: {
                isGenerated: boolean;
                testId: number;
                submissionId: string;
                testTitle: string;
                pts: number;
                totalQuestions: number;
                cntCorrect: number;
            }[] = [];
            for (const submission of userSubmissions) {
                const test = tests.find(
                    (test) => test.id === submission.testId,
                );
                let pts = 0;
                let cntCorrect = 0;
                for (const question of test.questions) {
                    const answer = submission.answers.find(
                        (answer: AnswerDto) =>
                            answer.questionId === question.id,
                    );
                    if (
                        answer &&
                        answer.answer ===
                            test.questions[answer.questionId - 1].correctAnswer
                    ) {
                        pts = pts + 10 / test.totalQuestions;
                        cntCorrect = cntCorrect + 1;
                    }
                }
                processedSubmission.push({
                    isGenerated: test.isGenerated,
                    testId: test.id,
                    testTitle: test.title,
                    submissionId: submission.id,
                    pts: pts,
                    totalQuestions: test.totalQuestions,
                    cntCorrect: cntCorrect,
                });
            }
            const sortedSubmission = processedSubmission.sort(
                (a, b) => b.pts - a.pts && b.testId - a.testId,
            );
            sortedSubmission.push({
                isGenerated: false,
                testId: -1,
                submissionId: '0',
                testTitle: 'Specialized Exam',
                pts: -1,
                totalQuestions: -1,
                cntCorrect: -1,
            });
            const result = [];
            for (let i = 0; i + 1 < sortedSubmission.length; i++) {
                if (
                    sortedSubmission[i].testId !==
                    sortedSubmission[i + 1].testId
                ) {
                    result.push(sortedSubmission[i]);
                }
            }
            return result;
        } catch (error) {
            throw new InternalServerErrorException(
                'Error getting profile study stats',
                error.message,
            );
        }
    }
    async getProfileStudyStats(profileUser: User): Promise<UserStatsDto> {
        try {
            const { id } = profileUser;
            const submissions = await this.submissionService.findAll();
            const userSubmissions = submissions.filter(
                (submission) => submission.userId === id,
            );

            const uniqueUserSubmissions = Array.from(
                new Map(
                    userSubmissions.map((item) => [item['submissionId'], item]),
                ).values(),
            );

            const flashcards =
                await this.flashcardService.findAllTopics(profileUser);

            const practices =
                await this.examService.privateFindAllPractice(profileUser);

            return {
                examPracticeCount: uniqueUserSubmissions.length,
                specializedExamPracticeCount: practices.length,
                vocabsPracticeCount: flashcards.length,
            };
        } catch (error) {
            throw new InternalServerErrorException(
                'Error getting profile study stats',
                error.message,
            );
        }
    }
    async getAllProfiles(): Promise<
        { email: string; username: string; id: string }[]
    > {
        try {
            const users = await this.userModel.findAll();
            const newUsers = users.map((user) => {
                return {
                    email: user.email,
                    username: user.username,
                    id: user.id,
                };
            });
            return newUsers;
        } catch (error) {
            throw new InternalServerErrorException(
                'Error getting all profiles',
                error.message,
            );
        }
    }
    async getMyProfile(profileUser: User): Promise<any> {
        try {
            const { id } = profileUser;
            const user = await this.userModel.findByPk(id);

            if (!user) {
                throw new BadRequestException('User not found');
            }

            const newUser = {
                email: user.email,
                username: user.username,
                id: user.id,
            };
            return newUser;
        } catch (error) {
            throw new InternalServerErrorException(
                'Error getting profile',
                error.message,
            );
        }
    }

    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }

    async findByOtp(
        email: string,
        otp: string,
        otpExpiry: Date,
    ): Promise<User> {
        const project = await this.userModel.findOne<User>({
            where: { email, otp, otpExpiry },
        });
        if (!project) {
            throw new InternalServerErrorException(
                `User ${email} with the OTP not found`,
            );
        }
        return project.dataValues;
    }

    async findByOtpOnly(email: string, otp: string): Promise<User> {
        const project = await this.userModel.findOne<User>({
            where: { email, otp },
        });
        if (!project) {
            throw new InternalServerErrorException(
                `User ${email} with the OTP not found`,
            );
        }
        return project.dataValues;
    }

    async findByEmail(email: string): Promise<User> {
        const project = await this.userModel.findOne<User>({
            where: { email },
        });
        if (!project) {
            throw new InternalServerErrorException(
                `User with email ${email} not found`,
            );
        }
        return project.dataValues;
    }

    async findById(id: string): Promise<User> {
        const project = await this.userModel.findOne<User>({ where: { id } });
        if (!project) {
            throw new InternalServerErrorException(
                `User with id ${id} not found`,
            );
        }
        return project.dataValues;
    }

    async validatePassword(password: string, user: User): Promise<boolean> {
        try {
            return await bcrypt.compare(password, user.password);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async hashPassword(password: string): Promise<string> {
        try {
            const salt: number = await bcrypt.genSalt(
                parseInt(this.configService.get('SALT'), 10),
            );

            const hashedPassword: string = await bcrypt.hash(password, salt);

            return hashedPassword;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async create(CreateDto: UserSignUpDto): Promise<User> {
        const { username, email, password } = CreateDto;
        const hashedPassword = await this.hashPassword(password);

        const user = await this.userModel.create({
            id: uuidv4(),
            username: username,
            email: email,
            password: hashedPassword,
            otp: null,
            otpExpiry: null,
            role: Role.USER,
        });
        if (!user) {
            throw new InternalServerErrorException(
                'This email or username is already in use',
            );
        }
        return user;
    }

    async updateRefreshToken(id: string, refreshToken: string): Promise<void> {
        try {
            await this.userModel.update(
                { refreshToken: refreshToken },
                { where: { id: id } },
            );
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async updateOtp(
        email: string,
        otp: string,
        otpExpiry: Date,
    ): Promise<void> {
        try {
            await this.userModel.update(
                { otp: otp, otpExpiry: otpExpiry },
                { where: { email: email } },
            );
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async updatePassword(email: string, password: string): Promise<void> {
        try {
            await this.userModel.update(
                { password: password, otp: null, otpExpiry: null },
                { where: { email: email } },
            );
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async removeById(id: string): Promise<void> {
        const user = await this.findById(id);
        if (!user) {
            throw new InternalServerErrorException(
                `User with id ${id} not found`,
            );
        }
        await user.destroy();
    }

    async createDefaultAdmin() {
        try {
            const adminExists = await this.userModel.findOne<User>({
                where: {
                    role: Role.ADMIN,
                },
            });

            if (adminExists === null) {
                // Create the default admin user if not found
                const adminPassword: string =
                    this.configService.get('ADMIN_PASSWORD');
                const hashedPassword = await this.hashPassword(adminPassword);
                const admin = await User.create({
                    username: this.configService.get('ADMIN_USERNAME'),
                    email: this.configService.get('ADMIN_EMAIL'),
                    password: hashedPassword,
                    role: Role.ADMIN,
                });

                console.log('Admin account created successfully', admin);
            } else {
                console.log('Admin account already exists');
            }
        } catch (error) {
            console.log(
                'Error creating default admin account: ',
                error.message,
            );
        }
    }

    async updateRole(id: string, role: string): Promise<void> {
        try {
            const user = await this.userModel.findOne<User>({
                where: { id },
            });

            if (user.role === role) {
                throw new InternalServerErrorException(
                    'User already has this role',
                );
            }

            await this.userModel.update({ role: role }, { where: { id: id } });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
