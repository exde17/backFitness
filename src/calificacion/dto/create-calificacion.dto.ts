import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Actividade } from "src/actividades/entities/actividade.entity";
import { User } from "src/user/entities/user.entity";

export class CreateCalificacionDto {

    @IsNotEmpty()
    @IsString()
    calificacion: number;

    @IsOptional()
    @IsString()
    usuario?: User;

    @IsOptional()
    @IsString()
    actividad?: Actividade;

    @IsOptional()
    fechaCreacion?: Date;

    @IsOptional()
    fechaActualizacion?: Date;

    @IsOptional()
    estado?: boolean;

    @IsOptional()
    @IsString()
    comentario?: string;
}
