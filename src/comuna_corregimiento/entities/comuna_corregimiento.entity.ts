import { Barrio } from 'src/barrio/entities/barrio.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

    @OneToMany(() => Barrio, barrio => barrio.comunaCorregimiento)
    barrios: 'Barrio[]';

}
