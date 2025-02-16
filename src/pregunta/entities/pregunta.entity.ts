import { Encuesta } from "src/encuesta/entities/encuesta.entity";
import { Parq } from "src/parq/entities/parq.entity";
import { Respuesta } from "src/respuesta/entities/respuesta.entity";
import { TipoPregunta } from "src/tipo-pregunta/entities/tipo-pregunta.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('pregunta')
export class Pregunta {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        nullable: false,
    })
    enunciado: string;

    @ManyToOne(()=> TipoPregunta, tipoPregunta => tipoPregunta.pregunta)
    tipoPregunta: TipoPregunta;

    @OneToMany(()=> Respuesta, respuesta => respuesta.pregunta)
    respuesta: Respuesta[];
}
