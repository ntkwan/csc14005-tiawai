import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './entities/message.entity.js';
import { CreateMessageDto } from './dtos/create-message.dto.js';
import { MessageResponseDto } from './dtos/message-response.dto.js';
import { TEMPLATES } from '../template.constants.js';
import { ConfigService } from '@nestjs/config';
import { ChatSession } from '../session/entities/chat-session.entity.js';
import { VectorStoreService } from '../../vector-store/vector-store.service.js';
import {
    ChatPromptTemplate,
    MessagesPlaceholder,
} from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { BaseChatMessageHistory } from '@langchain/core/dist/chat_history.js';
import { RunnableWithMessageHistory } from '@langchain/core/runnables';
import { ChatMessageHistory } from 'langchain/memory';
import { createHistoryAwareRetriever } from 'langchain/chains/history_aware_retriever';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { createRetrievalChain } from 'langchain/chains/retrieval';

@Injectable()
export class MessageService {
    constructor(
        @InjectModel(ChatSession) private chatSessionModel: typeof ChatSession,
        @InjectModel(Message) private messageModel: typeof Message,
        private vectorStoreService: VectorStoreService,
        private configService: ConfigService,
    ) {}

    async receiveAndReply(
        createMessageDto: CreateMessageDto,
    ): Promise<MessageResponseDto> {
        try {
            const sessionId = createMessageDto.sessionId;
            const session = await this.chatSessionModel.findByPk(sessionId, {
                include: { all: true },
            });
            if (!session) {
                throw new NotFoundException('Chat session not found');
            }
            if (!session.isActive) {
                throw new HttpException('Chat session is not active', 400);
            }

            const chatHistory = new ChatMessageHistory();
            session.messages.forEach((message) => {
                if (message.isBot) {
                    chatHistory.addAIMessage(message.content);
                } else {
                    chatHistory.addUserMessage(message.content);
                }
            });

            await this.messageModel.create(createMessageDto);

            const userInput = createMessageDto.content;
            const chain = this.loadRagChain(chatHistory);
            const answer = await (
                await chain
            ).invoke(
                { input: userInput },
                { configurable: { sessionId: sessionId } },
            );

            const message = await this.messageModel.create({
                sessionId,
                content: answer.answer,
                isBot: true,
            });

            return this.toMessageResponseDto(message);
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    private async loadRagChain(chatHistory: BaseChatMessageHistory) {
        const retriever = this.vectorStoreService.asRetriever();
        const gpt4omini = new ChatOpenAI({
            model: this.configService.get('OPENAI_MODEL'),
            temperature: parseFloat(
                this.configService.get<string>('OPENAI_TEMPERATURE'),
            ),
        });

        const contextPrompt = ChatPromptTemplate.fromMessages([
            ['system', TEMPLATES.HISTORY_AWARE],
            new MessagesPlaceholder('chat_history'),
            ['human', '{input}'],
        ]);

        const historyAwareRetriever = await createHistoryAwareRetriever({
            llm: gpt4omini,
            retriever: retriever,
            rephrasePrompt: contextPrompt,
        });

        const qaPrompt = ChatPromptTemplate.fromMessages([
            ['system', TEMPLATES.CONTEXT_AWARE],
            new MessagesPlaceholder('chat_history'),
            ['human', '{input}'],
        ]);

        const qaChain = await createStuffDocumentsChain({
            llm: gpt4omini,
            prompt: qaPrompt,
        });

        const ragChain = await createRetrievalChain({
            retriever: historyAwareRetriever,
            combineDocsChain: qaChain,
        });

        const conversationalRagChain = new RunnableWithMessageHistory({
            runnable: ragChain,
            getMessageHistory: async () => chatHistory,
            inputMessagesKey: 'input',
            historyMessagesKey: 'chat_history',
            outputMessagesKey: 'answer',
        });

        return conversationalRagChain;
    }

    async findBySessionId(sessionId: string): Promise<MessageResponseDto[]> {
        const messages = await this.messageModel.findAll({
            where: { sessionId },
        });
        if (messages.length === 0) {
            throw new NotFoundException(
                'No messages found for the specified session',
            );
        }
        return messages.map((message) => this.toMessageResponseDto(message));
    }

    private toMessageResponseDto(message: Message): MessageResponseDto {
        return {
            id: message.id,
            sessionId: message.sessionId,
            content: message.content,
            isBot: message.isBot,
            timestamp: message.timestamp,
        };
    }
}
