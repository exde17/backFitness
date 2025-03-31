import { Parque } from "src/parque/entities/parque.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('evento')
export class Evento {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    nombre: string;

    @Column('text')
    descripcion: string;

    @ManyToOne(()=> Parque, (parque) => parque.eventos, { eager: true })
    lugar: Parque;

    @Column('date')
    fecha: Date;

    @Column('time')
    hora: Date;

    @Column('bool',{
        nullable: false,
        default: true,
    })
    estado: boolean;

}
