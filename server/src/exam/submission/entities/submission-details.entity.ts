import { ApiProperty } from '@nestjs/swagger';
import { AnswerDto } from '../dtos/create-submission.dto';

export class SubmissionDetailsEntity {
    @ApiProperty()
    id: number;

    @ApiProperty()
    testId: string;

    @ApiProperty()
    userId: string;

    @ApiProperty({
        example: [
            {
                questionId: 1,
                answer: 'A',
            },
            {
                questionId: 2,
                answer: 'B',
            },
        ],
    })
    answers: AnswerDto[];

    @ApiProperty()
    submitAt: Date;

    @ApiProperty({
        example: '16:30',
    })
    timeConsumed: string;
}
