import { TipoPregunta } from "src/tipo-pregunta/entities/tipo-pregunta.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('opcion_pregunta')
export class OpcionPregunta {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        nullable: false,
    })
    respuesta: string;

    @ManyToOne(()=> TipoPregunta, tipoPregunta => tipoPregunta.opcion_pregunta)
    tipoPregunta: TipoPregunta;
}
