import { Asistencia } from "src/asistencia/entities/asistencia.entity";
import { Calificacion } from "src/calificacion/entities/calificacion.entity";
import { Parque } from "src/parque/entities/parque.entity";
import { TipoActividad } from "src/tipo-actividad/entities/tipo-actividad.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Actividade {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        nullable: true,
        default: ""
    })
    motivoCancelado: string;

    // fecha de actividad
    @Column('date',{
        nullable: false,
    })
    fecha: Date;

    // hora de actividad
    @Column('time',{
        nullable: false,
    })
    hora: Date;

    @Column('timestamp',{
        nullable: false,
        name: 'created_at',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column('timestamp',{
        nullable: false,
        name: 'updated_at',
        default: () => 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date;

    @ManyToOne(()=> User, user => user.actividad)
    user: User;

    @ManyToOne(()=> Parque, parque => parque.actividad)
    parque: Parque;

    @ManyToOne(()=> TipoActividad, tipoActividad => tipoActividad.actividad)
    tipoActividad: TipoActividad;

    @OneToMany(()=> Asistencia, asistencia => asistencia.actividad)
    asistencias: Asistencia[];

    @OneToMany(()=> Calificacion , calificacion => calificacion.actividad)
    calificaciones: Calificacion[];

    @Column('bool',{
        nullable: false,
        default: true,
    })
    estado: boolean;

    // descripcion
    @Column('text',{
        nullable: true,
        default: ""
    })
    descripcion: string;
}
