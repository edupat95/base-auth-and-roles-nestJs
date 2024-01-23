import { IsString, MinLength, MaxLength, IsEmpty, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class SingInDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}