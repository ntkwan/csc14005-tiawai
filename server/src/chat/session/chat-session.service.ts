import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ChatSession } from './entities/chat-session.entity.js';
import { CreateChatSessionDto } from './dtos/create-chat-session.dto.js';
import { ChatSessionResponseDto } from './dtos/chat-session-response.dto.js';
import { MessageResponseDto } from '../message/dtos/message-response.dto.js';
import { Message } from '../message/entities/message.entity.js';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ChatSessionService {
    constructor(
        @InjectModel(ChatSession) private chatSessionModel: typeof ChatSession,
        @InjectModel(Message) private messageModel: typeof Message,
        private readonly sequelize: Sequelize,
    ) {}

    async create(
        createChatSessionDto: CreateChatSessionDto,
    ): Promise<ChatSessionResponseDto> {
        const session =
            await this.chatSessionModel.create(createChatSessionDto);
        return this.toChatSessionResponseDto(session);
    }

    async findAll(): Promise<ChatSessionResponseDto[]> {
        const sessions = await this.chatSessionModel.findAll({
            include: { all: true },
        });
        return sessions.map((session) =>
            this.toChatSessionResponseDto(session),
        );
    }

    async findById(id: string): Promise<ChatSessionResponseDto> {
        const session = await this.chatSessionModel.findByPk(id, {
            include: { all: true },
        });
        if (!session) {
            throw new NotFoundException('Chat session not found');
        }
        return this.toChatSessionResponseDto(session);
    }

    async remove(id: string): Promise<void> {
        const transaction = await this.sequelize.transaction();
        try {
            const session = await this.chatSessionModel.findByPk(id, {
                transaction,
            });
            if (!session) {
                throw new NotFoundException('Chat session not found');
            }

            await this.messageModel.destroy({
                where: { sessionId: id },
                transaction,
            });
            await this.chatSessionModel.destroy({
                where: { id },
                transaction,
            });
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    private toChatSessionResponseDto(
        session: ChatSession,
    ): ChatSessionResponseDto {
        return {
            id: session.id,
            userId: session.userId,
            topic: session.topic,
            isActive: session.isActive,
            createdAt: session.createdAt,
            updatedAt: session.updatedAt,
            messages: session.messages?.map((message) => ({
                id: message.id,
                sessionId: message.sessionId,
                content: message.content,
                isBot: message.isBot,
                timestamp: message.timestamp,
            })) as MessageResponseDto[],
        };
    }
}