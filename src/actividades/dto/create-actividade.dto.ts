import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Parque } from "src/parque/entities/parque.entity";
import { User } from "src/user/entities/user.entity";

export class CreateActividadeDto {

    @IsString()
    @IsNotEmpty()
    nombre: string;

    // fecha de actividad
    @IsString()
    @IsNotEmpty()
    fecha: Date;

    // hora de actividad
    @IsString()
    @IsNotEmpty()
    hora: Date;

    @IsString()
    @IsOptional()
    user?: User;

    @IsString()
    @IsNotEmpty()
    parque: Parque;
}
