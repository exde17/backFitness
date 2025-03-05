import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TipoActividad {
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
}
