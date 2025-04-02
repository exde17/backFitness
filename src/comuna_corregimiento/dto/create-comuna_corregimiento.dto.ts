import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateComunaCorregimientoDto {
    @IsString()
    nombre: string;

    @IsBoolean()
    @IsOptional()
    estado?: boolean;
}
