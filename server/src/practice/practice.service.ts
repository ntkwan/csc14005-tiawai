import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/sequelize';
import { Question, TestEntity } from 'src/exam/entities/exam.entity';
import { TEMPLATES_GENERATOR } from './template.constants';
import { Category } from './enums/category.enum';
import { User } from 'src/users/entities/user.entity';
import { MessageService } from 'src/chat/message/message.service';
import { CreateMessageDto } from 'src/chat/message/dtos/create-message.dto';

@Injectable()
export class PracticeService {
    constructor(
        @InjectModel(TestEntity)
        private readonly testModel: typeof TestEntity,
        private readonly messageService: MessageService,
    ) {}

    async generatePracticeQuestions(
        user: User,
        category: Category,
    ): Promise<TestEntity> {
        try {
            const newQuestions: Question[] = [];

            const sessionId = uuidv4();
            await this.messageService.createChatSession({
                id: sessionId,
                userId: user.id,
                isActive: true,
                topic: `generate practice questions for ${category}`,
            });

            const request =
                `Cho phân loại sau: ${category},` +
                TEMPLATES_GENERATOR.CONSTANT_REQUEST;
            const message: CreateMessageDto = {
                sessionId: sessionId,
                content: request,
                isBot: false,
            };
            const response = await this.messageService.receiveAndReply(
                message,
                TEMPLATES_GENERATOR,
            );
            const msg: string = response?.content;
            if (!msg) {
                throw new InternalServerErrorException(
                    'Failed to generate questions',
                );
            }
            const parseMsg = JSON.parse(msg);
            for (let i = 0; i < parseMsg.length; ++i) {
                const question: Question = {
                    hasParagraph: false,
                    id: i + 1,
                    content: parseMsg[i].content,
                    choices: parseMsg[i].choices,
                    correctAnswer: parseMsg[i].correctAnswer,
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
                author: user.id,
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
