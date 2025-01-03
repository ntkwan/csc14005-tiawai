import { ApiProperty } from '@nestjs/swagger';

export class TestQuestionDetailsDto {
    @ApiProperty()
    questionId: number;

    @ApiProperty()
    question: string;

    @ApiProperty()
    hasParagraph: boolean;

    @ApiProperty()
    paragraph?: string;

    @ApiProperty()
    choices: { A: string; B: string; C: string; D: string };
}
