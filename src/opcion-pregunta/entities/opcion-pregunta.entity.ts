import { Respuesta } from "src/respuesta/entities/respuesta.entity";
import { TipoPregunta } from "src/tipo-pregunta/entities/tipo-pregunta.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('opcion_pregunta')
export class OpcionPregunta {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { 
        nullable: false,
    })
    descripcion: string;

    @ManyToOne(()=> TipoPregunta, tipoPregunta => tipoPregunta.opcion_pregunta)
    tipoPregunta: TipoPregunta;

    @OneToMany(()=> Respuesta, respuesta => respuesta.opcionPregunta)
    respuesta: Respuesta[];
}
