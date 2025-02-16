import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('respuesta_caracterizacion')
export class RespuestaCaracterizacion {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('json', {
        nullable: false,
    })
    respuesta: any;

    @ManyToOne(()=> User, user => user.respuestaCaracterizacion)
    user: User;
}
