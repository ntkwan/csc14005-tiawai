import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { Question, TestEntity } from 'src/exam/entities/exam.entity';
import {
    TEMPLATES_CLASSIFIER,
    TEMPLATES_GENERATOR,
} from './template.constants';
import { Category } from './enums/category.enum';

@Injectable()
export class PracticeService {
    constructor(
        @InjectModel(TestEntity)
        private readonly testModel: typeof TestEntity,
        private readonly configService: ConfigService,
    ) {}

    async judge(question: string): Promise<string> {
        try {
            const response = await axios.post(
                `${this.configService.get('OPENAI_ENDPOINT')}`,
                {
                    model: this.configService.get('OPENAI_ADVANCED_MODEL'),
                    messages: [
                        {
                            role: 'system',
                            content: TEMPLATES_CLASSIFIER.CONTEXT_AWARE,
                        },
                        {
                            role: 'user',
                            content: `${TEMPLATES_CLASSIFIER.CONSTANT_REQUEST} + ${question}`,
                        },
                    ],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.configService.get('OPENAI_API_KEY')}`,
                    },
                },
            );

            const msg: string = response.data.choices[0]?.message?.content;

            if (!msg) {
                throw new InternalServerErrorException(
                    'Failed to extract data',
                );
            }

            return msg;
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to classify the text',
                error.message,
            );
        }
    }

    async classify(category: Category): Promise<Question[]> {
        try {
            const strCategory = JSON.stringify(category);
            const modifiedStrCategory = strCategory.slice(1, -1);
            const formattedCategory = modifiedStrCategory.toLowerCase();
            const tests: TestEntity[] = await this.testModel.findAll();
            const targetQuestions: Question[] = [];
            for (const test of tests) {
                if (test.isGenerated == true) continue;
                const questions = test.questions;
                for (const question of questions) {
                    const formattedChoices = `
                    A. ${question.choices.A}\n
                    B. ${question.choices.B}\n
                    C. ${question.choices.C}\n
                    D. ${question.choices.D}\n`;
                    const formattedQuestion = `
                    Câu hỏi: ${question.content}
                    Các đáp án: ${formattedChoices}
                    Đáp án đúng: ${question.correctAnswer}`;
                    const result: string = await this.judge(formattedQuestion);
                    const formattedResult = result.toLowerCase();
                    if (formattedResult === formattedCategory) {
                        targetQuestions.push(question);
                    }
                }
            }

            return targetQuestions;
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to classify the text',
                error.message,
            );
        }
    }

    async generatePracticeQuestions(category: Category): Promise<TestEntity> {
        try {
            const questions: Question[] = await this.classify(category);
            const formattedQuestions: string[] = questions.map(
                (question, index) => {
                    const formattedChoices = `
                A. ${question.choices.A}\n
                B. ${question.choices.B}\n
                C. ${question.choices.C}\n
                D. ${question.choices.D}\n`;
                    return `
                Câu hỏi ${index + 1}: ${question.content}
                Các đáp án: ${formattedChoices}
                Đáp án đúng: ${question.correctAnswer}`;
                },
            );
            const newQuestions: Question[] = [];
            for (let i = 0; i < 10; ++i) {
                const response = await axios.post(
                    `${this.configService.get('OPENAI_ENDPOINT')}`,
                    {
                        model: this.configService.get('OPENAI_ADVANCED_MODEL'),
                        messages: [
                            {
                                role: 'system',
                                content: TEMPLATES_GENERATOR.CONTEXT_AWARE,
                            },
                            {
                                role: 'user',
                                content: `${TEMPLATES_GENERATOR.CONSTANT_REQUEST} + ${formattedQuestions}`,
                            },
                        ],
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${this.configService.get('OPENAI_API_KEY')}`,
                        },
                    },
                );

                const msg: string = response.data.choices[0]?.message?.content;
                console.log(msg);
                if (!msg) {
                    throw new InternalServerErrorException(
                        'Failed to generate questions',
                    );
                }

                const parseMsg = JSON.parse(msg);
                console.log(parseMsg);
                const question: Question = {
                    hasParagraph: false,
                    id: i + 1,
                    content: parseMsg.content,
                    choices: parseMsg.choices,
                    correctAnswer: parseMsg.correctAnswer,
                    points: 0.1,
                };
                newQuestions.push(question);
            }
            const test = await this.testModel.create({
                title: 'blank',
                questions: newQuestions,
                totalQuestions: 10,
                uploadAt: new Date(),
                duration: 15,
                isGenerated: true,
            });
            test.title = `[${new Date().toLocaleDateString()}] Chuyên đề ${category} #${test.id}`;
            await test.save();
            return test;
        } catch (error) {
            throw new InternalServerErrorException(
                'Failed to generate practice questions',
                error.message,
            );
        }
    }
}
