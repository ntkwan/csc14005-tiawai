import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UseGuards,
    HttpCode,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { MessageResponseDto } from './dtos/message-response.dto.js';
import { CreateMessageDto } from './dtos/create-message.dto.js';
import { MessageService } from './message.service.js';
import { ATAuthGuard } from '../../auth/guards/at-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/enums/roles.enum';
import { TEMPLATES } from '../template.constants.js';

@ApiTags('Messages')
@Controller('messages')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @ApiBearerAuth('access-token')
    @HttpCode(200)
    @UseGuards(ATAuthGuard, RolesGuard)
    @Roles(Role.USER)
    @ApiOperation({ summary: 'Receive a message and reply' })
    @ApiResponse({ type: MessageResponseDto })
    @Post()
    async receiveAndReply(
        @Body() createMessageDto: CreateMessageDto,
    ): Promise<MessageResponseDto> {
        return this.messageService.receiveAndReply(createMessageDto, TEMPLATES);
    }

    @ApiBearerAuth('access-token')
    @HttpCode(200)
    @UseGuards(ATAuthGuard, RolesGuard)
    @Roles(Role.USER)
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
