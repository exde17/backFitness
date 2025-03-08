import { Actividade } from "src/actividades/entities/actividade.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TipoActividad {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        nullable: false,
    })
    nombre: string;

    @Column('bool',{
        nullable: false,
        default: true,
    })
    estado: boolean;

    @OneToMany(()=> Actividade, actividad => actividad.tipoActividad)
    actividad: Actividade[];
}
