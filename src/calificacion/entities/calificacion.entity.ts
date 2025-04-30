import { Actividade } from "src/actividades/entities/actividade.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('calificacion')
export class Calificacion {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('numeric',{
        precision: 10,
        scale: 2,
        default: 0,
        nullable: false,
    })
    calificacion: number;

    @ManyToOne(()=> User, (user) => user.calificaciones )
    usuario: User;

    @ManyToOne(()=> Actividade, (actividade) => actividade.calificaciones )
    actividad: Actividade;

    @Column('timestamp', {
        default: () => 'CURRENT_TIMESTAMP',
        nullable: false,
    })
    fechaCreacion: Date;

    @Column('timestamp', {
        default: () => 'CURRENT_TIMESTAMP',
        nullable: false,
    })
    fechaActualizacion: Date;

    @Column('boolean', {
        default: true,
        nullable: false,
    })
    estado: boolean;

    @Column('text', {
        nullable: true,
    })
    comentario: string;
}
