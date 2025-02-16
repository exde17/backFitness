import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
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
}
