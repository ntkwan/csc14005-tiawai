import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChatSession } from './session/entities/chat-session.entity.js';
import { Message } from './message/entities/message.entity.js';
import { ChatSessionService } from './session/chat-session.service.js';
import { MessageService } from './message/message.service.js';
import { ChatSessionController } from './session/chat-session.controller.js';
import { MessageController } from './message/message.controller.js';
import { VectorStoreModule } from '../vector-store/vector-store.module.js';

@Module({
    imports: [
        SequelizeModule.forFeature([ChatSession, Message]),
        VectorStoreModule,
    ],
    controllers: [ChatSessionController, MessageController],
    providers: [ChatSessionService, MessageService],
    exports: [ChatSessionService, MessageService],
})
export class ChatModule {}
