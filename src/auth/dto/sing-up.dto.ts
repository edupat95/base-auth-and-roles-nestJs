import { Transform } from 'class-transformer';
import { IsEmail, IsString, IsStrongPassword, MinLength, isString, MaxLength, IsNotEmpty } from 'class-validator';

export class SingUpDto {
    
    @IsString()
    @MinLength(4)
    @MaxLength(10)
    @IsNotEmpty()
    username: string;

    @IsString()
    @MinLength(8)
    @Transform(({ value }) => value.trim()) // Quita los espacios en blanco
    @MaxLength(20)
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;
}