import { IsString } from "class-validator";

export class CreatePreguntaParqDto {

    @IsString()
    readonly enunciado: string;
}
