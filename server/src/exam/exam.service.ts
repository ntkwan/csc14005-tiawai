import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTestDto, TestQuestionDto } from './dtos/create-test.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Question, TestEntity } from './entities/exam.entity';
import { SubmissionService } from './submission/submission.service';
import { PublicTestQuestionsEntity } from './entities/public-test-questions.entity';
import { TestDetailsEntity } from './entities/test-details.entity';
import { TestQuestionDetailsDto } from './dtos/test-question-details.dto';
import { TestResultDetailsDto } from './dtos/test-result-details.dto';
import { MessageService } from 'src/chat/message/message.service';
import { TEMPLATES } from './template.constants';
import { CreateMessageDto } from 'src/chat/message/dtos/create-message.dto';
import { MessageResponseDto } from 'src/chat/message/dtos/message-response.dto';
import { PrivateTestQuestionsEntity } from './entities/private-test-questions.entity';
import { User } from 'src/users/entities/user.entity';
import { VectorStoreService } from 'src/vector-store/vector-store.service';
import { Document } from '@langchain/core/documents';
import { ChatOpenAI } from '@langchain/openai';
import { ConfigService } from '@nestjs/config';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

@Injectable()
export class ExamService {
    constructor(
        @InjectModel(TestEntity)
        private readonly testModel: typeof TestEntity,
        private readonly submissionService: SubmissionService,
        private readonly messageService: MessageService,
        private readonly vectorStoreService: VectorStoreService,
        private readonly configService: ConfigService,
    ) {}

    async findAll() {
        try {
            const tests = await this.testModel.findAll();
            return tests;
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to get all exams',
                error.message,
            );
        }
    }

    async getSubmissionsByTestId(
        user: User,
        testId: number,
    ): Promise<
        {
            testId: number;
            pts: number;
            timeConsumed: string;
            submitAt: Date;
            submissionId: string;
        }[]
    > {
        try {
            const submissions = await this.submissionService.findAll();

            if (!submissions) {
                throw new InternalServerErrorException(
                    'Failed to get submissions by test id',
                );
            }

            const filteredSubmissions = submissions.filter((submission) => {
                return (
                    submission.testId === testId &&
                    submission.userId === user.id
                );
            });

            const test = await this.testModel.findByPk(testId);
            const questions = test.questions;
            const formattedSubmissions: {
                testId: number;
                pts: number;
                timeConsumed: string;
                submitAt: Date;
                submissionId: string;
            }[] = [];
            for (let i = 0; i < filteredSubmissions.length; i++) {
                const submission = filteredSubmissions[i];
                let cntCorrect = 0;
                for (const question of questions) {
                    const answer = submission.answers.find(
                        (answer) => answer.questionId === question.id,
                    );
                    if (!answer) {
                        continue;
                    }
                    const isCorrect = answer.answer === question.correctAnswer;
                    if (isCorrect) {
                        cntCorrect++;
                    }
                }
                const pts = (cntCorrect / test.totalQuestions) * 100;
                const timeConsumed = submission.timeConsumed;
                const submitAt = submission.submitAt;

                formattedSubmissions.push({
                    testId,
                    pts,
                    timeConsumed,
                    submitAt,
                    submissionId: submission.id,
                });
            }
            return formattedSubmissions;
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to get submissions by test id',
                error.message,
            );
        }
    }

    async publicFindAll(): Promise<PublicTestQuestionsEntity[]> {
        try {
            const tests = await this.testModel.findAll();
            const publicTests: PublicTestQuestionsEntity[] = [];
            for (const test of tests) {
                if (test.isGenerated === false) {
                    const newTest = {
                        id: test.id,
                        title: test.title,
                        totalQuestions: test.totalQuestions,
                        duration: test.duration,
                        totalAttempts: test.submissions?.length || 0,
                    };

                    publicTests.push(newTest);
                }
            }
            publicTests.sort((a, b) => {
                return a.id - b.id;
            });
            return publicTests;
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to get all exams',
                error.message,
            );
        }
    }

    async privateFindAllPractice(
        user: User,
    ): Promise<PublicTestQuestionsEntity[]> {
        try {
            const tests = await this.testModel.findAll({
                where: {
                    author: user.id,
                },
            });
            const publicTests: PublicTestQuestionsEntity[] = [];
            for (const test of tests) {
                if (test.isGenerated === true) {
                    const newTest = {
                        id: test.id,
                        title: test.title,
                        totalQuestions: test.totalQuestions,
                        duration: test.duration,
                        totalAttempts: test.submissions?.length || 0,
                    };

                    publicTests.push(newTest);
                }
            }
            publicTests.sort((a, b) => {
                return a.id - b.id;
            });
            return publicTests;
        } catch (error) {
            console.log(error.message);
            throw new InternalServerErrorException(
                'Failed to get all practices',
                error.message,
            );
        }
    }

    async privateFindAll(): Promise<PrivateTestQuestionsEntity[]> {
        try {
            const tests = await this.testModel.findAll();
            const privateTests: PrivateTestQuestionsEntity[] = tests.map(
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
            const sortedTests = privateTests.sort((a, b) => {
                return a.uploadedAt.getTime() - b.uploadedAt.getTime();
            });
            return sortedTests;
        } catch (error) {
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
                totalAttempts: test.submissions?.length || 0,
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

    formattedContent(question: Question): string {
        const {
            hasParagraph,
            paragraph,
            content: questionContent,
            choices,
            correctAnswer,
            explanation,
            id,
        } = question;

        const content =
            `Câu hỏi ${id}: ${questionContent}\n` +
            (hasParagraph ? `Đoạn văn: ${paragraph}\n` : '') +
            `Các đáp án: A. ${choices.A} B. ${choices.B} C. ${choices.C} D. ${choices.D}\n` +
            `Đáp án đúng: ${correctAnswer}\n` +
            (explanation && explanation.length > 0
                ? `Giải thích mẫu: ${explanation}\n`
                : '');

        return content;
    }

    async classify(question: Question): Promise<string> {
        const model = new ChatOpenAI({
            model: this.configService.get('OPENAI_MODEL'),
            temperature: parseFloat(
                this.configService.get<string>('OPENAI_TEMPERATURE'),
            ),
        });

        const prompt = PromptTemplate.fromTemplate(TEMPLATES.CLASSIFY);
        const chain = prompt.pipe(model).pipe(new StringOutputParser());
        const input = this.formattedContent(question);
        return await chain.invoke({
            input: input,
        });
    }

    async saveQuestionsToVectorStore(exam: TestEntity) {
        const { title, questions } = exam;
        const documents = await Promise.all(
            questions.map(async (question) => {
                const category = await this.classify(question);
                const content =
                    `${title}\n` +
                    this.formattedContent(question) +
                    `Phân loại: ${category}`;
                return new Document({
                    pageContent: content,
                    metadata: {
                        title: title,
                        questionId: question.id,
                    },
                });
            }),
        );
        await this.vectorStoreService.addDocuments(documents);
    }

    async saveNotEmbeddedTestToVectorStore() {
        try {
            const tests = await this.testModel.findAll({
                where: {
                    isGenerated: false,
                },
            });
            for (const test of tests) {
                await this.saveQuestionsToVectorStore(test);
            }
            return 'Successfully saved not embedded test to vector store';
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to save not embedded test to vector store',
                error.message,
            );
        }
    }

    async judger(
        testResult: TestResultDetailsDto[],
        submissionId: string,
        userId: string,
    ): Promise<TestResultDetailsDto[]> {
        const session =
            await this.messageService.findChatSessionById(submissionId);
        if (session === null) {
            await this.messageService.createChatSession({
                id: submissionId,
                userId: userId,
                isActive: true,
                topic: `explanation ${submissionId}`,
            });
        }
        const newTestResult: TestResultDetailsDto[] = await Promise.all(
            testResult.map(async (question, index) => {
                const sampleExplanation = question.explanation || '';
                const formattedChoices = `
                A. ${question.choices.A}\n
                B. ${question.choices.B}\n
                C. ${question.choices.C}\n
                D. ${question.choices.D}\n`;
                if (question.hasParagraph == false) {
                    const formattedQuestion =
                        sampleExplanation.length > 0
                            ? `Câu hỏi: ${question.question}
                    Các đáp án: ${formattedChoices}
                    Đáp án đúng: ${question.correctAnswer}
                    Tham khảo giải thích mẫu: ${sampleExplanation}`
                            : `Câu hỏi: ${question.question}
                    Các đáp án: ${formattedChoices}
                    Đáp án đúng: ${question.correctAnswer}`;

                    const message =
                        await this.messageService.findBySessionId(submissionId);
                    if (
                        message === null ||
                        message.length <= testResult.length
                    ) {
                        const message: CreateMessageDto = {
                            sessionId: submissionId,
                            content: formattedQuestion,
                            isBot: false,
                        };
                        const explanation: Partial<MessageResponseDto> =
                            await this.messageService.receiveAndReply(
                                message,
                                TEMPLATES,
                            );
                        return {
                            ...question,
                            explanation: explanation.content,
                        };
                    } else {
                        const filteredMsg = message.filter((msg) => {
                            return msg.isBot === true;
                        });
                        const sortedMsg = filteredMsg.sort((a, b) => {
                            return (
                                a.timestamp.getTime() - b.timestamp.getTime()
                            );
                        });
                        return {
                            ...question,
                            explanation: sortedMsg[index].content,
                        };
                    }
                } else {
                    const formattedQuestion =
                        sampleExplanation.length > 0
                            ? `Đoạn văn: ${question.paragraph}
                    Câu hỏi: ${question.question}
                    Các đáp án: ${formattedChoices}}
                    Đáp án đúng: ${question.correctAnswer}
                    Tham khảo giải thích mẫu: ${sampleExplanation}`
                            : `Đoạn văn: ${question.paragraph}
                    Câu hỏi: ${question.question}
                    Các đáp án: ${formattedChoices}
                    Đáp án đúng: ${question.correctAnswer}`;

                    const message =
                        await this.messageService.findBySessionId(submissionId);
                    if (
                        message === null ||
                        message.length <= testResult.length
                    ) {
                        const message: CreateMessageDto = {
                            sessionId: submissionId,
                            content: formattedQuestion,
                            isBot: false,
                        };
                        const explanation: Partial<MessageResponseDto> =
                            await this.messageService.receiveAndReply(
                                message,
                                TEMPLATES,
                            );
                        return {
                            ...question,
                            explanation: explanation.content,
                        };
                    } else {
                        const filteredMsg = message.filter((msg) => {
                            return msg.isBot === true;
                        });
                        const sortedMsg = filteredMsg.sort((a, b) => {
                            return (
                                a.timestamp.getTime() - b.timestamp.getTime()
                            );
                        });
                        return {
                            ...question,
                            explanation: sortedMsg[index].content,
                        };
                    }
                }
            }),
        );
        return newTestResult;
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
                if (answer.answer !== null) {
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
                    isCorrect:
                        answer.answer != null &&
                        question.correctAnswer === answer.answer,
                    explanation: question.explanation,
                    points: question.points,
                    isAnswered: answer.answer !== null,
                });
            });
            const newTestResult = await this.judger(
                testQuestions,
                submissionId,
                submission.userId,
            );

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
                questions: newTestResult,
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

    async create(
        user: User,
        createTestDto: CreateTestDto,
    ): Promise<TestEntity> {
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
                isGenerated: false,
                author: user.id,
            });
            await this.saveQuestionsToVectorStore(test);

            if (!test) {
                throw new InternalServerErrorException('Failed to create test');
            }

            return test;
        } catch (error) {
            console.log(error.message);
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
