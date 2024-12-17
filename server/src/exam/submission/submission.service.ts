import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Submission } from '../entities/exam.entity';
import { AnswerDto, CreateSubmissionDto } from './dtos/create-submission.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SubmissionService {
    constructor(
        @InjectModel(Submission)
        private readonly submissionModel: typeof Submission,
    ) {}

    async findAll(): Promise<Submission[]> {
        return this.submissionModel.findAll();
    }

    async findById(id: string): Promise<Submission> {
        return this.submissionModel.findByPk(id);
    }

    async create(
        createSubmissionDto: CreateSubmissionDto,
    ): Promise<Submission> {
        try {
            const testId: number = createSubmissionDto.testId;
            const userId: string = createSubmissionDto.userId;
            const timeStart: Date = createSubmissionDto.timeStart;
            const answers: AnswerDto[] = createSubmissionDto.answers.map(
                (answer, index) => {
                    return {
                        questionId: index + 1,
                        answer: answer.answer,
                    };
                },
            );

            const timeConsumedMinutes: number =
                new Date().getMinutes() - new Date(timeStart).getMinutes();
            const timeConsumedSeconds: number =
                new Date().getSeconds() - new Date(timeStart).getSeconds();

            const submission = await this.submissionModel.create({
                id: uuidv4(),
                testId: testId,
                userId: userId,
                answers: answers,
                submitAt: new Date(),
                timeConsumed: `${Math.abs(timeConsumedMinutes)}:${Math.abs(timeConsumedSeconds)}`,
            });

            if (!submission) {
                throw new InternalServerErrorException(
                    'Failed to create submission',
                );
            }

            return submission;
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to create submission',
                error.message,
            );
        }
    }
}
