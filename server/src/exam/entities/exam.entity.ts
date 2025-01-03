import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    Model,
    Table,
    DataType,
    CreatedAt,
    AutoIncrement,
} from 'sequelize-typescript';

export interface Question {
    hasParagraph: boolean;
    paragraph?: string;
    id: number;
    content: string;
    choices: {
        A: string;
        B: string;
        C: string;
        D: string;
    };
    correctAnswer: string;
    points: number;
    explanation?: string;
}

export interface Answer {
    questionId: number;
    answer: string;
}

@Table({
    tableName: 'exams',
})
export class TestEntity extends Model {
    @ApiProperty({ example: 1 })
    @AutoIncrement
    @Column({
        primaryKey: true,
        allowNull: false,
        unique: true,
        type: DataType.INTEGER,
    })
    id: number;

    @ApiProperty({ example: 'Geography Test' })
    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    title: string;

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
                points: 0.2,
                explanation: 'Paris is the capital of France',
            },
        ],
    })
    @Column({
        type: DataType.ARRAY(DataType.JSONB),
        allowNull: false,
    })
    questions: Array<Question>;

    @ApiProperty({ example: 50 })
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    totalQuestions: number;

    @Column({
        type: DataType.ARRAY(DataType.UUID),
        allowNull: true,
    })
    submissions: Array<string>;

    @ApiProperty()
    @CreatedAt
    @Column({
        allowNull: false,
        type: DataType.DATE,
    })
    uploadAt: Date;

    @ApiProperty({ example: 60 })
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    duration: number;

    @ApiProperty()
    @Column({
        allowNull: false,
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    isGenerated: boolean;

    @ApiProperty()
    @Column({
        allowNull: false,
        unique: true,
        type: DataType.UUID,
    })
    author: string;
}

@Table({
    tableName: 'submissions',
})
export class Submission extends Model {
    @Column({
        primaryKey: true,
        allowNull: false,
        unique: true,
        type: DataType.UUID,
        defaultValue: DataType.UUID,
    })
    id: string;

    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    testId: number;

    @Column({
        allowNull: false,
        type: DataType.UUID,
        defaultValue: DataType.UUID,
    })
    userId: string;

    @Column({
        field: 'time_consumed',
        allowNull: false,
        type: DataType.STRING,
    })
    timeConsumed: string;

    @CreatedAt
    @Column({
        field: 'submitted_at',
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    submitAt: Date;

    @Column({
        allowNull: false,
        type: DataType.ARRAY(DataType.JSONB),
    })
    answers: Array<Answer>;
}
