import { IsString } from "class-validator";
import { Actividade } from "src/actividades/entities/actividade.entity";
import { User } from "src/user/entities/user.entity";

export class CreateAsistenciaDto {
    @IsString()
    user: User;

    @IsString()
    actividad: Actividade;
}
