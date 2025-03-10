import { Actividade } from "src/actividades/entities/actividade.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Asistencia {

    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => User, user => user.asistencias)
    user: User;

    @ManyToOne(()=>Actividade, actividade => actividade.asistencias)
    actividad: Actividade;
}
