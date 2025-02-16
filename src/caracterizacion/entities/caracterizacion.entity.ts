import { User } from "src/user/entities/user.entity";
import { GenderType } from "src/user/utils/genderType.enum";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Caracterizacion {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    //uso el enum de genero
    @Column('enum', {
        enum: GenderType,
        nullable: false,
    })
    gender: GenderType;

    @Column('numeric', {
        nullable: false,
    })
    peso: number;

    @Column('numeric', {
        nullable: false,
    })
    estatura: number;

    @Column('numeric', {
        nullable: false,
        name: 'perimetro_cuello'
    })
    perimetroCuello: number;

    @Column('numeric', {
        nullable: false,
        name: 'perimetro_cadera'
    })
    perimetroCadera: number;

    @Column('numeric', {
        nullable: false,
        name: 'perimetro_brazo_rellajado'
    })
    perimetroBrazoRellajado: number;

    @Column('numeric', {
        nullable: false,
        name: 'perimetro_brazo_contraido'
    })
    perimetroBrazoContraido: number;

    @Column('numeric', {
        nullable: false,
        name: 'perimetro_abdominal_cintura'
    })
    perimetroAbdominalCintura: number;

    @Column('numeric', {
        nullable: false,
        name: 'perimetro_muslo_maximo'
    })
    perimetroMusloMaximo: number;

    @Column('numeric', {
        nullable: false,
        name: 'perimetro_muslo_medial'
    })
    perimetroMusloMedial: number;

    @Column('numeric', {
        nullable: false,
        name: 'perimetro_pierna_maxima'
    })
    perimetroPiernaMaxima: number;

    @ManyToOne(() => User, user => user.caracterizacion)
    user: User;

}
