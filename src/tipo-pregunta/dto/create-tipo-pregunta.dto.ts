import { IsString } from "class-validator";

export class CreateTipoPreguntaDto {

    @IsString()
    readonly tipo: string;

    @IsString()
    readonly descripcion: string;
}
