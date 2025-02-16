import { IsString, IsUUID } from "class-validator";

export class CreateOpcionPreguntaDto {
    @IsString()
    readonly respuesta: string;

    @IsUUID()
    readonly tipoPreguntaId: string;
    
}
