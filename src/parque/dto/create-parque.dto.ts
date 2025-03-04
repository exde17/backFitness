import { IsNotEmpty, IsString } from "class-validator";
import { Barrio } from "src/barrio/entities/barrio.entity";

export class CreateParqueDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    barrioId: Barrio;
}
