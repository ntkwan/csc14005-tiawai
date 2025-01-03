import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../users/entities/user.entity.js';

@Table({ tableName: 'chat_sessions' })
export class ChatSession extends Model<ChatSession> {
    @ApiProperty({ description: 'UUID of the chat session' })
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
    })
    id: string;

    @ApiProperty({ description: 'User associated with the chat session' })
    @ForeignKey(() => User)
    @Column({ type: DataType.UUID })
    userId: string;

    @ApiProperty({ description: 'Flag indicating if the session is active' })
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isActive: boolean;

    @ApiProperty({ description: 'Topic or label of the chat session' })
    @Column({ type: DataType.STRING, allowNull: true })
    topic: string;

    @ApiProperty({ description: 'Timestamp when the chat session was created' })
    @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
    createdAt: Date;

    @ApiProperty({
        description: 'Timestamp when the chat session was last updated',
    })
    @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
    updatedAt: Date;
}
