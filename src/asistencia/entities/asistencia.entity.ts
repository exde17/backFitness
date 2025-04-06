import { Actividade } from "src/actividades/entities/actividade.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Asistencia {

    @PrimaryGeneratedColumn()
    id: string;

    // @ManyToOne(() => User, user => user.asistencias)
    // user: User;

    @Column('text', {
        nullable: false,
    })
    documento: string;

    @ManyToOne(() => Actividade, actividade => actividade.asistencias)
    actividad: Actividade;

    @Column('date', {
        nullable: true,
    })
    fecha: Date;

    @Column('bool',{
        nullable: false,
        default: true,
    })
    calificado: boolean;
}
