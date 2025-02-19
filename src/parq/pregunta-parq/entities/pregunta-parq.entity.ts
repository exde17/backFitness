import { RespuestaParq } from "src/parq/respuesta-parq/entities/respuesta-parq.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('pregunta_parq')
export class PreguntaParq {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('numeric', {
        nullable: false,
    })
    item: number;

    @Column('text', {
        nullable: false,
    })
    enunciado: string;

    @OneToMany(()=> RespuestaParq, respuestaParq => respuestaParq.preguntaParq)
    respuestaParq: RespuestaParq[];
}
