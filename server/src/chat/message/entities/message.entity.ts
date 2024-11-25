import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { ChatSession } from '../../session/entities/chat-session.entity.js';

@Table({ tableName: 'messages' })
export class Message extends Model<Message> {
    @ApiProperty({ description: 'UUID of the message' })
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
    })
    id: string;

    @ApiProperty({ description: 'Chat session the message belongs to' })
    @ForeignKey(() => ChatSession)
    @Column({ type: DataType.UUID })
    sessionId: string;

    @ApiProperty({ description: 'Content of the message' })
    @Column({ type: DataType.TEXT })
    content: string;

    @ApiProperty({ description: 'Indicates if the message is from the bot' })
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isBot: boolean;

    @ApiProperty({ description: 'Timestamp when the message was sent' })
    @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
    timestamp: Date;
}
