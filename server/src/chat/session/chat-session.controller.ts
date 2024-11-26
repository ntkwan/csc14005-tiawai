import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    Res,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ChatSessionService } from './chat-session.service.js';
import { CreateChatSessionDto } from './dtos/create-chat-session.dto.js';
import { ChatSessionResponseDto } from './dtos/chat-session-response.dto.js';
import { Response } from 'express';

@ApiTags('ChatSession')
@Controller('chat-sessions')
export class ChatSessionController {
    constructor(private readonly chatSessionService: ChatSessionService) {}

    @ApiOperation({ summary: 'Create a new chat session' })
    @ApiResponse({ type: ChatSessionResponseDto })
    @Post()
    async create(
        @Body() createChatSessionDto: CreateChatSessionDto,
    ): Promise<ChatSessionResponseDto> {
        return this.chatSessionService.create(createChatSessionDto);
    }

    @ApiOperation({ summary: 'Retrieve all chat sessions' })
    @ApiResponse({ type: [ChatSessionResponseDto] })
    @Get()
    async findAll(): Promise<ChatSessionResponseDto[]> {
        return this.chatSessionService.findAll();
    }

    @ApiOperation({ summary: 'Retrieve a specific chat session by ID' })
    @ApiResponse({ type: ChatSessionResponseDto })
    @Get(':id')
    async findById(@Param('id') id: string): Promise<ChatSessionResponseDto> {
        return this.chatSessionService.findById(id);
    }

    @ApiOperation({ summary: 'Remove a chat session by ID' })
    @ApiResponse({
        status: 200,
        description:
            'Chat session with ID <id> and all its messages have been successfully removed',
    })
    @Delete(':id')
    async remove(@Param('id') id: string, @Res() res: Response): Promise<void> {
        await this.chatSessionService.remove(id);
        res.send({
            message: `Chat session with ID ${id} and all its messages have been successfully removed`,
        });
    }
}
