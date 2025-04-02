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
} from 'class-validator';
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
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
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
    @IsNotEmpty()
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
