import { ApiProperty } from '@nestjs/swagger';

export class TestResultDetailsDto {
    @ApiProperty()
    questionId?: number;

    @ApiProperty()
    question: string;

    @ApiProperty()
    hasParagraph: boolean;

    @ApiProperty()
    paragraph?: string;

    @ApiProperty()
    choices: { A: string; B: string; C: string; D: string };

    @ApiProperty()
    correctAnswer: string;

    @ApiProperty()
    answer: string;

    @ApiProperty()
    isCorrect: boolean;

    @ApiProperty()
    points: number;

    @ApiProperty()
    explanation?: string;

    @ApiProperty()
    isAnswered: boolean;
}
