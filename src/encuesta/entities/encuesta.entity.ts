import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
}
