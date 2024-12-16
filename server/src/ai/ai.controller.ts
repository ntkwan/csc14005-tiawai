import { Controller, HttpCode, Post, Request, Res } from '@nestjs/common';
import { Response } from 'express';
import { AIService } from './ai.service';
import { ParaphraseDto } from './dto/paraphrase.dto';
import { ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';

@Controller('ai')
export class AIController {
    constructor(private readonly aiService: AIService) {}

    @ApiOperation({ summary: 'Paraphrase text' })
    @ApiBody({ type: ParaphraseDto })
    @ApiResponse({
        status: 200,
        description: 'Paraphrased text',
        type: ParaphraseDto,
    })
    // @UseGuards(LocalAuthGuard)
    @HttpCode(200)
    @Post('paraphrase')
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

        const paraphrasedText = await this.aiService.paraphrase(inputs);
        res.send({
            message: 'Paraphrased text',
            data: paraphrasedText,
        });
    }
}
