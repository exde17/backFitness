import { Encuesta } from "src/encuesta/entities/encuesta.entity";
import { Parq } from "src/parq/entities/parq.entity";
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

    @OneToMany(()=> Parq, parq => parq.pregunta)
    parq: Parq;

    // @ManyToOne(()=> Encuesta, encuesta => encuesta.pregunta)
    // encuesta: Encuesta;
}
