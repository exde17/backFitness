import { PreguntaParq } from "src/parq/pregunta-parq/entities/pregunta-parq.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('respuesta_parq')
export class RespuestaParq {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('bool',{
        nullable: false,
        name: 'respuesta_parq'
    })
    respuestaParq: boolean;

    @ManyToOne(()=> PreguntaParq, preguntaParq => preguntaParq.respuestaParq)
    preguntaParq: PreguntaParq; 

    @ManyToOne(()=> User, user => user.respuestaParq)
    user: User;

    @Column('timestamp',{
        nullable: false,
        name: 'created_at',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column('timestamp',{
        nullable: false,
        name: 'updated_at',
        default: () => 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date;

    @Column('bool',{
        nullable: false,
        default: false  
    })
    terminada: boolean;
}
