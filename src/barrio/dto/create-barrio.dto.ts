import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ComunaCorregimiento } from "src/comuna_corregimiento/entities/comuna_corregimiento.entity";

export class CreateBarrioDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsOptional()
    comunaCorregimiento: ComunaCorregimiento;
}
