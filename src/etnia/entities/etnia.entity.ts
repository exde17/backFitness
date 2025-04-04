import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Etnia {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { nullable: false })
    nombre: string;

    @Column('bool',{
        default: true,
        nullable: false
    })
    estado: boolean;
}
