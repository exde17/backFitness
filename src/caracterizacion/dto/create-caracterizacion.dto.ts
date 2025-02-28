import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";
import { User } from "src/user/entities/user.entity";
import { GenderType } from "src/user/utils/genderType.enum";

export class CreateCaracterizacionDto {
  @IsEnum(GenderType)
    @IsNotEmpty()
    readonly gender: GenderType;

  @IsNumber()
  @IsNotEmpty()
  readonly peso: number;

  @IsNumber()
  @IsNotEmpty()
  readonly estatura: number;

  @IsNumber()
  @IsNotEmpty()
  readonly perimetroCuello: number;

  @IsNumber()
  @IsNotEmpty()
  readonly perimetroCadera: number;

  @IsNumber()
  @IsNotEmpty()
  readonly perimetroBrazoRellajado: number;

  @IsNumber()
  @IsNotEmpty()
  readonly perimetroBrazoContraido: number;

  @IsNumber()
  @IsNotEmpty()
  readonly perimetroAbdominalCintura: number;

  @IsNumber()
  @IsNotEmpty()
  readonly perimetroMusloMaximo: number;

  @IsNumber()
  @IsNotEmpty()
  readonly perimetroMusloMedial: number;

  @IsNumber()
  @IsNotEmpty()
  readonly perimetroPiernaMaxima: number;

  @IsString()
  @IsNotEmpty()
  readonly user: User;
}
