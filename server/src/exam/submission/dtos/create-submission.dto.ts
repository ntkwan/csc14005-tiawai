import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsArray,
    IsDateString,
} from 'class-validator';

export class CreateSubmissionDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    testId: number;

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
    @IsNotEmpty()
    @IsArray()
    answers: AnswerDto[];

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    timeStart: Date;
}

export class AnswerDto {
    @IsNotEmpty()
    @IsNumber()
    questionId: number;

    @IsNotEmpty()
    @IsString()
    answer: string;
}
