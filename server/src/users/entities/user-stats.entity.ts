import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UserStatsEntity {
    @ApiProperty()
    @IsNumber()
    examPracticeCount: number;

    @ApiProperty()
    @IsNumber()
    specializedExamPracticeCount: number;

    @ApiProperty()
    @IsNumber()
    vocabsPracticeCount: number;
}

export class UserHistoryExams {
    @ApiProperty()
    @IsNumber()
    testId: number;

    @ApiProperty()
    @IsNumber()
    result: number;

    @ApiProperty()
    @IsString()
    submissionId: string;

    @ApiProperty()
    @IsNumber()
    pts: number;

    @ApiProperty()
    @IsNumber()
    totalQuestions: number;

    @ApiProperty()
    @IsNumber()
    correctAnswers: number;
}
