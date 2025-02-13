import { Pregunta } from "src/pregunta/entities/pregunta.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('parq')
export class Parq {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('numeric', {
        nullable: false,
    })
    item: number;

    @ManyToOne(()=> Pregunta, pregunta => pregunta.parq)
    pregunta: Pregunta;
}
