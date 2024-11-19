import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class CreateChatSessionDto {
    @ApiProperty({ description: 'User ID associated with the chat session' })
    @IsUUID()
    userId: string;

    @ApiProperty({
        description: 'Topic or label for the chat session',
        required: false,
    })
    @IsString()
    @IsOptional()
    topic?: string;

    @ApiProperty({
        description: 'Flag to indicate if the session is active',
        default: false,
    })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean = false;
}
