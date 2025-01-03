import { ApiProperty } from '@nestjs/swagger';

export class TestDetailsEntity {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty({
        example: [
            {
                questionId: 1,
                question: 'What is the capital of France?',
                hasParagraph: false,
                choices: {
                    A: 'Paris',
                    B: 'London',
                    C: 'Berlin',
                    D: 'Madrid',
                },
            },
        ],
    })
    questions: {
        questionId: number;
        question: string;
        hasParagraph: boolean;
        paragraph?: string;
        choices: { A: string; B: string; C: string; D: string };
    }[];

    @ApiProperty()
    totalQuestions: number;

    @ApiProperty()
    totalAttempts: number;

    @ApiProperty()
    uploadedAt: Date;

    @ApiProperty()
    duration: number;
}
