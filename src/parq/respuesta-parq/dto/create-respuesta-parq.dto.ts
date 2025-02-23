import { IsBoolean, IsString, IsUUID } from "class-validator";
import { PreguntaParq } from "src/parq/pregunta-parq/entities/pregunta-parq.entity";

export class CreateRespuestaParqDto {
    @IsBoolean()
    readonly respuestaParq: boolean;

    @IsString()
    readonly preguntaParq: PreguntaParq;

}
