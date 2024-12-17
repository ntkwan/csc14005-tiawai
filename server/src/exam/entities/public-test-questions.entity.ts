import { ApiProperty } from '@nestjs/swagger';

export class PublicTestQuestionsEntity {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    totalQuestions: number;

    @ApiProperty()
    uploadedAt: Date;

    @ApiProperty()
    duration: number;
}
