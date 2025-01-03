import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiResponse,
} from '@nestjs/swagger';
import { ATAuthGuard } from 'src/auth/guards/at-auth.guard';
import { ExtractFlashcardDto } from './dtos/extract-flashcard.dto';
import { FlashcardEntity } from './entities/flashcard.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import {
    Controller,
    HttpCode,
    UseGuards,
    Post,
    Body,
    Request,
    Get,
    Param,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';
import { FlashcardService } from './flashcard.service';

@Controller('flashcard')
export class FlashcardController {
    constructor(private readonly flashcardService: FlashcardService) {}

    @ApiOperation({
        summary: 'Extract flashcards from a text [USER]',
    })
    @ApiBody({
        type: ExtractFlashcardDto,
    })
    @ApiResponse({
        status: 200,
        description: 'Extract flashcards successfully',
        type: FlashcardEntity,
    })
    @HttpCode(200)
    @UseGuards(ATAuthGuard, RolesGuard)
    @ApiBearerAuth('access-token')
    @Roles(Role.USER)
    @Post()
    async extract(
        @Body() extractFlashcardDto: ExtractFlashcardDto,
        @Request() req: any,
    ) {
        return this.flashcardService.extract(extractFlashcardDto, req.user);
    }

    @ApiOperation({
        summary: 'Get all topics [USER]',
    })
    @ApiResponse({
        status: 200,
        description: 'Get all topics successfully',
    })
    @HttpCode(200)
    @UseGuards(ATAuthGuard, RolesGuard)
    @ApiBearerAuth('access-token')
    @Roles(Role.USER)
    @Get()
    async getAllTopics(@Request() req: any) {
        return this.flashcardService.findAllTopics(req.user);
    }

    @ApiOperation({
        summary: 'Get flashcards by topic [USER]',
    })
    @ApiResponse({
        status: 200,
        description: 'Get flashcards by topic successfully',
        type: FlashcardEntity,
    })
    @HttpCode(200)
    @UseGuards(ATAuthGuard, RolesGuard)
    @ApiBearerAuth('access-token')
    @Roles(Role.USER)
    @Get(':topic')
    async getByTopic(@Request() req: any, @Param('topic') topic: string) {
        return this.flashcardService.findFlashcardsByTopic(topic, req.user);
    }
}
