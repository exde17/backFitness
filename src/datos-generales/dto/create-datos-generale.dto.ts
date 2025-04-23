import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { GenderType } from "src/user/utils/genderType.enum";
import { DocumentType } from "../../user/utils/documentType.enum";
import { ZonaType } from "src/user/utils/zonaType.enum";

export class CreateDatosGeneraleDto {
    @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEnum(DocumentType)
  @IsNotEmpty()
  readonly documentType: DocumentType;

  @IsString()
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

  @IsEnum(ZonaType)
  @IsNotEmpty()
  readonly zona: ZonaType;
  

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

  // Se asume que se enviará el id del usuario relacionado
//   @IsString()
//   @IsNotEmpty()
//   readonly userId: string;
}
