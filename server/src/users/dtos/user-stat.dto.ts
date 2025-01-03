import { IsNumber, IsNotEmpty } from 'class-validator';

export class UserStatsDto {
    @IsNotEmpty()
    @IsNumber()
    examPracticeCount: number;

    @IsNumber()
    specializedExamPracticeCount: number;

    @IsNumber()
    vocabsPracticeCount: number;
}
