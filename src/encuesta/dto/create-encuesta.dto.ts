import { IsString } from "class-validator";

export class CreateEncuestaDto {
    @IsString()
    readonly nombre: string;

    @IsString()
    readonly descripcion: string;
}
