import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ParaphraseDto {
    @ApiProperty()
    @IsString()
    inputs: string;
}
