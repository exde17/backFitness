import { ComunaCorregimiento } from "src/comuna_corregimiento/entities/comuna_corregimiento.entity";
import { DatosGenerale } from "src/datos-generales/entities/datos-generale.entity";
import { Parque } from "src/parque/entities/parque.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(()=> ComunaCorregimiento, comunaCorregimiento => comunaCorregimiento.barrios)
    comunaCorregimiento: ComunaCorregimiento;

    @OneToMany(()=> DatosGenerale, d => d.barrioId)
    datosGenerales: DatosGenerale[];
}
