import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthSignUpDto {
    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;
}
