import { PreguntaParq } from "src/parq/pregunta-parq/entities/pregunta-parq.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('respuesta_parq')
export class RespuestaParq {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('bool',{
        nullable: false,
        name: 'res´puesta_parq'
    })
    respuestaParq: boolean;

    @ManyToOne(()=> PreguntaParq, preguntaParq => preguntaParq.respuestaParq)
    preguntaParq: PreguntaParq;

    @ManyToOne(()=> User, user => user.respuestaParq)
    user: User;
}
