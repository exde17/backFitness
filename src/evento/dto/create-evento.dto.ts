import { IsString } from "class-validator";
import { Parque } from "src/parque/entities/parque.entity";

export class CreateEventoDto {

    @IsString()
    nombre: string;

    @IsString()
    descripcion: string;

    @IsString()
    lugar: Parque;

    @IsString()
    fecha: Date;

    @IsString()
    hora: Date
}
