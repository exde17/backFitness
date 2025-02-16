import { Respuesta } from "src/respuesta/entities/respuesta.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('encuesta')
export class Encuesta {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        nullable: false,
    })
    nombre: string;

    @Column('text', {
        nullable: false,
    })
    descripcion: string;

    @ManyToOne(()=> User, user => user.encuesta)
    userCreador: User;

    @OneToMany(()=> Respuesta, respuesta => respuesta.encuesta)
    respuesta: Respuesta[];
}
