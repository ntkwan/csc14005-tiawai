import { ApiProperty } from '@nestjs/swagger';
import { TestResultDetailsDto } from '../dtos/test-result-details.dto';

export class PublicTestResultsEntity {
    @ApiProperty()
    score: number;

    @ApiProperty()
    totalQuestions: number;

    @ApiProperty({
        example: [
            {
                question: 'What is the capital of France?',
                hasParagraph: false,
                choices: {
                    A: 'Paris',
                    B: 'London',
                    C: 'Berlin',
                    D: 'Madrid',
                },
                correctAnswer: 'A',
                answer: 'D',
                isCorrect: false,
                points: 0,
                explanation: 'Paris is the capital of France',
                isAnswered: true,
            },
        ],
    })
    questions: TestResultDetailsDto[];

    @ApiProperty()
    correctAnswers: number;

    @ApiProperty()
    incorrectAnswers: number;

    @ApiProperty()
    skippedQuestions: number;

    @ApiProperty()
    timeConsumed: number;
}
