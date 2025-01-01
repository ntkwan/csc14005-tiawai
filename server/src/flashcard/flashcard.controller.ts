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
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';
import { FlashcardService } from './flashcard.service';

@Controller('flashcard')
export class FlashcardController {
    constructor(private readonly flashcardService: FlashcardService) {}

    @ApiOperation({
        summary: 'Extract flashcards from a text',
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
}
