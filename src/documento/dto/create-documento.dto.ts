import { Unique } from 'typeorm';
import { IsEmail, IsString, IsStrongPassword, MaxLength, MinLength, IsNotEmpty } from 'class-validator';


export class CreateDocumentoDto {
  @IsNotEmpty()
  numeroTramite: number;
  
  @IsNotEmpty()
  apellidos: string;
  
  @IsNotEmpty()
  nombres: string;
  
  @IsNotEmpty()
  sexo: string;
  
  @IsNotEmpty()
  numeroDni: number;
 
  @IsNotEmpty()
  ejemplar: string;
  
  @IsNotEmpty()
  nacimiento: Date;
  
  @IsNotEmpty()
  fechaEmision: Date;
  
  @IsNotEmpty()
  inicioFinCuil: number;
}
