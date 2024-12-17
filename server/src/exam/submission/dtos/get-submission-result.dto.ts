import { IsNotEmpty, IsString, IsNumber, IsArray } from 'class-validator';

export class GetSubmissionResultDto {
    @IsNotEmpty()
    @IsNumber()
    testId: number;

    @IsNotEmpty()
    @IsArray()
    answers: AnswerDto[];

    @IsNotEmpty()
    @IsString()
    userId: string;
}

export class AnswerDto {
    @IsNotEmpty()
    @IsNumber()
    questionId: number;

    @IsNotEmpty()
    @IsString()
    answer: string;
}
