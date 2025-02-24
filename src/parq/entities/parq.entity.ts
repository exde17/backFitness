import { Pregunta } from "src/pregunta/entities/pregunta.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('parq')
export class Parq {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('bool',{
        nullable: true,
        default: false
    })
    aprobado: boolean;

    @ManyToOne(()=> User, user => user.parq)
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

    // @ManyToOne(()=> Pregunta, pregunta => pregunta.parq)
    // pregunta: Pregunta;
}
