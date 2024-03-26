import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class SingInDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    username: string;

    @IsNotEmpty()
    password: string;

}