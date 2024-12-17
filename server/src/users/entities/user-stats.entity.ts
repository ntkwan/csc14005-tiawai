import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

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
