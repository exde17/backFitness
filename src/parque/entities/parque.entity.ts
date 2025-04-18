import e from "express";
import { Actividade } from "src/actividades/entities/actividade.entity";
import { Barrio } from "src/barrio/entities/barrio.entity";
import { Evento } from "src/evento/entities/evento.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Parque {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        nullable: false,
    })
    nombre: string;

    @ManyToOne(()=> Barrio, barrio => barrio.parques)
    barrio: Barrio;

    @OneToMany(()=> Actividade, actividad => actividad.parque)
    actividad: Actividade[];

    @OneToMany(()=> Evento, evento => evento.lugar)
    eventos: Evento[];

    @Column('bool',{
        nullable: false,
        default: true,
    })
    estado: boolean;
}
