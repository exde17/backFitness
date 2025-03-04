import { IsNotEmpty, IsString } from "class-validator";

export class CreateTipoActividadDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;
}
