import { IsString } from "class-validator";

export class CreateConsentimientoDto {

    @IsString()
    readonly descripcion: string;
}
