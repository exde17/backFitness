import { Parque } from "src/parque/entities/parque.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Barrio {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        nullable: false,
    })
    nombre: string;

    @Column('bool',{
        nullable: false,
        default: true,
    })
    estado: boolean;

    @OneToMany(()=> Parque, parque => parque.barrio)
    parques: Parque[];
}
