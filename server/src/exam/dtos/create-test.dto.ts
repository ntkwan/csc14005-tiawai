import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
    IsObject,
    IsOptional,
    IsBoolean,
    IsNumber,
    IsArray,
} from 'class-validator';

export class TestQuestionDto {
    @ApiProperty()
    @IsOptional()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    hasParagraph: boolean;

    @ApiProperty()
    @IsString()
    paragraph?: string;

    @ApiProperty()
    @IsObject()
    @IsNotEmpty()
    choices: {
        A: string;
        B: string;
        C: string;
        D: string;
    };

    @IsString()
    @IsNotEmpty()
    correctAnswer: string;

    @IsNotEmpty()
    points: number;

    @IsString()
    explanation?: string;
}

export class CreateTestDto {
    @ApiProperty({ example: 'Geography Test' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ example: 50 })
    @IsNotEmpty()
    @IsNumber()
    totalQuestions: number;

    @ApiProperty({
        example: [
            {
                content: 'What is the capital of France?',
                hasParagraph: false,
                choices: {
                    A: 'Paris',
                    B: 'London',
                    C: 'Berlin',
                    D: 'Madrid',
                },
                correctAnswer: 'A',
                explanation: 'Paris is the capital of France',
            },
        ],
    })
    @IsNotEmpty()
    @IsArray()
    questions: TestQuestionDto[];

    @ApiProperty({ example: 60 })
    @IsNotEmpty()
    @IsNumber()
    duration: number;
}
