import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comuna_corregimiento')
export class ComunaCorregimiento {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        unique: true,
        nullable: false
    })
    nombre: string;

    @Column('bool',{
        default: true
    })
    estado: boolean;

}
