import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('consentimiento')
export class Consentimiento {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        nullable: false,

    })
    descripcion: string;
}
