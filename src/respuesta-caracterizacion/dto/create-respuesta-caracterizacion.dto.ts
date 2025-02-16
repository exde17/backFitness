import { IsJSON, IsNotEmpty, IsObject } from "class-validator";

export class CreateRespuestaCaracterizacionDto {

    @IsNotEmpty()
    @IsObject()
    readonly respuestaCaracterizacion: Record<string, any>;
}
