import { OpcionPregunta } from "src/opcion-pregunta/entities/opcion-pregunta.entity";
import { Pregunta } from "src/pregunta/entities/pregunta.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tipo_pregunta')
export class TipoPregunta {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        nullable: false,
        name: 'tipo_pregunta',
    })
    tipo: string;

    @Column('text', {
        nullable: false,
    })
    descripcion: string;

    @OneToMany(()=> Pregunta, pregunta => pregunta.tipoPregunta)
    pregunta: Pregunta;

    @OneToMany(() => OpcionPregunta, opcionPregunta => opcionPregunta.tipoPregunta)
    opcion_pregunta: OpcionPregunta;
}
