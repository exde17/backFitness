import { Parque } from "src/parque/entities/parque.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Actividade {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        nullable: false,
    })
    nombre: string;

    // fecha de actividad
    @Column('date',{
        nullable: false,
    })
    fecha: Date;

    // hora de actividad
    @Column('time',{
        nullable: false,
    })
    hora: Date;

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

    @ManyToOne(()=> User, user => user.actividad)
    user: User;

    @ManyToOne(()=> Parque, parque => parque.actividad)
    parque: Parque;
}
