import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTestDto, TestQuestionDto } from './dtos/create-test.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TestEntity } from './entities/exam.entity';
import { SubmissionService } from './submission/submission.service';
import { PublicTestQuestionsEntity } from './entities/public-test-questions.entity';
import { TestDetailsEntity } from './entities/test-details.entity';
import { TestQuestionDetailsDto } from './dtos/test-question-details.dto';
import { TestResultDetailsDto } from './dtos/test-result-details.dto';

@Injectable()
export class ExamService {
    constructor(
        @InjectModel(TestEntity)
        private readonly testModel: typeof TestEntity,
        private readonly submissionService: SubmissionService,
    ) {}

    async findAll(): Promise<PublicTestQuestionsEntity[]> {
        try {
            const tests = await this.testModel.findAll();
            const publicTests: PublicTestQuestionsEntity[] = tests.map(
                (test) => {
                    return {
                        id: test.id,
                        title: test.title,
                        totalQuestions: test.totalQuestions,
                        uploadedAt: test.uploadAt,
                        duration: test.duration,
                        totalAttempts: test.submissions?.length || 0,
                    };
                },
            );
            return publicTests;
        } catch (error) {
            console.log(error.message);
            throw new InternalServerErrorException(
                'Failed to get all tests',
                error.message,
            );
        }
    }

    async findById(id: number): Promise<TestDetailsEntity> {
        try {
            const test = await this.testModel.findByPk(id);
            const newTestQuestions: TestQuestionDetailsDto[] =
                test.questions.map((question, index) => {
                    return {
                        questionId: index + 1,
                        question: question.content,
                        choices: question.choices,
                        hasParagraph: question.hasParagraph,
                        paragraph: question.paragraph,
                    };
                });

            const newTest: TestDetailsEntity = {
                id: test.id,
                title: test.title,
                totalQuestions: test.totalQuestions,
                uploadedAt: test.uploadAt,
                duration: test.duration,
                questions: newTestQuestions,
            };

            return newTest;
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to find test by id',
                error.message,
            );
        }
    }

    async getSubmissionResult(
        testId: number,
        submissionId: string,
    ): Promise<any> {
        try {
            const test = await this.testModel.findByPk(testId);
            if (!test) {
                throw new InternalServerErrorException('Test not found');
            }

            const submission =
                await this.submissionService.findById(submissionId);
            if (!submission) {
                throw new InternalServerErrorException('Submission not found');
            }

            let score: number = 0;
            let cntCorrect: number = 0;
            let cntIncorrect: number = 0;
            const testQuestions: TestResultDetailsDto[] = [];
            submission.answers.forEach((answer) => {
                const question = test.questions.find(
                    (question) => question.id === answer.questionId,
                );
                if (answer.answer.length > 0) {
                    if (question.correctAnswer === answer.answer) {
                        score += question.points;
                        cntCorrect = cntCorrect + 1;
                    } else {
                        cntIncorrect = cntIncorrect + 1;
                    }
                }
                testQuestions.push({
                    questionId: answer.questionId,
                    paragraph: question.paragraph,
                    hasParagraph: question.hasParagraph,
                    question: question.content,
                    choices: question.choices,
                    correctAnswer: question.correctAnswer,
                    answer: answer.answer,
                    isCorrect: question.correctAnswer === answer.answer,
                    points: question.points,
                    explanation: question.explanation,
                    isAnswered: answer.answer.length > 0,
                });
            });

            let isUpdated: boolean = false;
            let submissions: string[] = test.submissions;
            if (submissions === null) {
                submissions = [submission.id];
                isUpdated = true;
            } else {
                if (!submissions.includes(submission.id)) {
                    submissions.push(submission.id);
                    isUpdated = true;
                }
            }

            if (isUpdated) {
                await this.testModel.update(
                    { submissions: submissions },
                    { where: { id: testId } },
                );
            }

            return {
                score: score,
                totalQuestions: test.totalQuestions,
                questions: testQuestions,
                correctAnswers: cntCorrect,
                incorrectAnswers: cntIncorrect,
                skippedQuestions:
                    test.totalQuestions - cntCorrect - cntIncorrect,
                timeConsumed: submission.timeConsumed,
            };
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to get submission result',
                error.message,
            );
        }
    }

    async create(createTestDto: CreateTestDto): Promise<TestEntity> {
        try {
            const title: string = createTestDto.title;
            const totalQuestions: number = createTestDto.totalQuestions;
            const duration: number = createTestDto.duration;
            const questions: TestQuestionDto[] = createTestDto.questions.map(
                (question, index) => {
                    return {
                        id: index + 1,
                        content: question.content,
                        choices: question.choices,
                        correctAnswer: question.correctAnswer,
                        points: 10 / totalQuestions,
                        hasParagraph: question.hasParagraph,
                        paragraph: question.paragraph,
                        explanation: question.explanation,
                    };
                },
            );

            const test = await this.testModel.create({
                title: title,
                questions: questions,
                totalQuestions: totalQuestions,
                uploadAt: new Date(),
                duration: duration,
            });

            if (!test) {
                throw new InternalServerErrorException('Failed to create test');
            }

            return test;
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to create test',
                error.message,
            );
        }
    }

    async removeById(id: number): Promise<void> {
        try {
            const test = await this.testModel.findByPk(id);
            if (!test) {
                throw new InternalServerErrorException('Test not found');
            }

            await test.destroy();
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to remove test',
                error.message,
            );
        }
    }
}
