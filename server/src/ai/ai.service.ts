import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ParaphraseDto } from './dto/paraphrase.dto';

@Injectable()
export class AIService {
    constructor(private configService: ConfigService) {}

    async paraphrase(inputs: string): Promise<ParaphraseDto> {
        try {
            console.log(inputs);
            const url = this.configService.get<string>('HF_MODEL_URL');
            const model = this.configService.get<string>('HF_MODEL_PARAPHRASE');
            const response = await fetch(`${url}${model}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.configService.get<string>('HF_API_KEY')}`,
                },
                body: JSON.stringify({
                    inputs: inputs,
                    parameters: {
                        max_length: 1024,
                        no_repeat_ngram_size: 3,
                    },
                }),
            });

            if (!response.ok) {
                throw new HttpException(
                    `Hugging Face API Error: ${response.statusText}`,
                    HttpStatus.BAD_GATEWAY,
                );
            }

            const data = await response.json();
            return data[0]?.generated_text || 'No response text found';
        } catch (error) {
            throw new HttpException(
                `Failed to call Hugging Face API: ${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
