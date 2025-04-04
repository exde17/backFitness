import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('genero')
export class Genero {
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
