import { IsBoolean } from "class-validator";

export class CreateRespuestaParqDto {
    @IsBoolean()
    readonly respuestaParq: boolean;
}
