import {
    Controller,
    HttpCode,
    Post,
    Request,
    Res,
    UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ParaphraseService } from './paraphrase.service';
import { ParaphraseDto } from './dtos/paraphrase.dto';
import {
    ApiResponse,
    ApiOperation,
    ApiBody,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';
import { ATAuthGuard } from 'src/auth/guards/at-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('paraphrase')
export class ParaphraseController {
    constructor(private readonly paraphraseService: ParaphraseService) {}

    @ApiOperation({ summary: 'Paraphrase text [USER]' })
    @ApiBody({ type: ParaphraseDto })
    @ApiResponse({
        status: 200,
        description: 'Paraphrased text',
        type: ParaphraseDto,
    })
    @HttpCode(200)
    @UseGuards(ATAuthGuard, RolesGuard)
    @ApiBearerAuth('access-token')
    @Roles(Role.USER)
    @Post('')
    async paraphrase(@Request() req: any, @Res() res: Response): Promise<void> {
        const regex = /[^\w\s~!$@#$%^&*(){}\[\]_+-=:;"'’<>.,?/ ]+/;
        const { inputs } = req.body;
        if (regex.test(inputs)) {
            res.status(400).send({
                message: 'Invalid input',
                data: 'Input should contain only English alphabets',
            });
            return;
        }

        const paraphrasedText = await this.paraphraseService.paraphrase(inputs);
        res.send({
            message: 'Paraphrased text',
            data: paraphrasedText,
        });
    }
}
