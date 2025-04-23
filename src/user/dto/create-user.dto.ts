import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { GenderType } from '../utils/genderType.enum';
import { DocumentType } from "../../user/utils/documentType.enum";
import { ZonaType } from '../utils/zonaType.enum';

export class CreateUserDto {
  // @IsString()
  // @IsNotEmpty()
  // firstName: string;

  // @IsString()
  // @IsNotEmpty()
  // lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  // @MinLength(4, { message: 'Username must be at least 4 characters long' })
  // @MaxLength(20)
  // @Matches(/^[a-zA-Z0-9]+$/, {
  //   message: 'Username can only contain letters and numbers',
  // })
  usuario: string;

  @IsString()
  // @MinLength(4, { message: 'Password must be at least 4 characters long' })
  // @MaxLength(20)
  @IsOptional()
  password: string;

  //////////////////////////////////////////////////////

    @IsString()
    @IsNotEmpty()
    readonly name: string; 
  
    @IsEnum(DocumentType)
    @IsNotEmpty()
    readonly documentType: DocumentType;
  
    @IsNumber()
    @IsNotEmpty()
    readonly documentNumber: string;
  
    @IsString()
    @IsNotEmpty()
    readonly phoneNumber: string;
  
    @IsDateString()
    @IsNotEmpty()
    readonly birthDate: Date;
  
    @IsString()
    @IsNotEmpty()
    readonly address: string;
  
    @IsString()
    @IsNotEmpty()
    readonly barrio: string;
  
    @IsString()
    @IsOptional()
    readonly comunaCorregimiento: string;
  
    @IsString()
    @IsNotEmpty()
    readonly etnia: string;
  
    @IsString()
    @IsNotEmpty()
    readonly discapacidad: string;
  
    @IsEnum(GenderType)
    @IsNotEmpty()
    readonly gender: GenderType;
  
    @IsString()
    @IsNotEmpty()
    readonly poblacionVulnerable: string;
  
    @IsString()
    @IsNotEmpty()
    readonly nivelEducativo: string;
  
    @IsString()
    @IsOptional()
    readonly ocupacion?: string;
  
    @IsString()
    @IsNotEmpty()
    readonly regimenSalud: string;
  
    @IsString()
    @IsNotEmpty()
    readonly eps: string;
  
    @IsString()
    @IsNotEmpty()
    readonly grupoSanquineo: string;
  
    @IsString()
    @IsNotEmpty()
    readonly contactoEmergencia: string;
  
    @IsString()
    @IsNotEmpty()
    readonly telefonoContacto: string;

    @IsEnum(ZonaType)
    @IsNotEmpty()
    readonly zona: ZonaType;

    
}
