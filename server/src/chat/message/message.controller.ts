import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MessageResponseDto } from './dtos/message-response.dto.js';
import { CreateMessageDto } from './dtos/create-message.dto.js';
import { MessageService } from './message.service.js';

@ApiTags('Messages')
@Controller('messages')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @ApiOperation({ summary: 'Receive a message and reply' })
    @ApiResponse({ type: MessageResponseDto })
    @Post()
    async receiveAndReply(
        @Body() createMessageDto: CreateMessageDto,
    ): Promise<MessageResponseDto> {
        return this.messageService.receiveAndReply(createMessageDto);
    }

    @ApiOperation({
        summary: 'Retrieve messages for a specific chat session by session ID',
    })
    @ApiResponse({ type: [MessageResponseDto] })
    @Get('session/:sessionId')
    async findBySessionId(
        @Param('sessionId') sessionId: string,
    ): Promise<MessageResponseDto[]> {
        return this.messageService.findBySessionId(sessionId);
    }
}
