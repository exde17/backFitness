import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { DatosGenerale } from 'src/datos-generales/entities/datos-generale.entity';
import { RespuestaParq } from 'src/parq/respuesta-parq/entities/respuesta-parq.entity';
import { Caracterizacion } from 'src/caracterizacion/entities/caracterizacion.entity';
import { Encuesta } from 'src/encuesta/entities/encuesta.entity';
import { Respuesta } from 'src/respuesta/entities/respuesta.entity';
import { Parq } from 'src/parq/entities/parq.entity';


@Entity({
  name: 'users',
  schema: 'security',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false,
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column('text', {
    nullable: false,
    select: false,
  })
  @MinLength(8)
  password: string;

  @Column('bool', {
    name: 'is_active',
    default: true,
  })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  role: string[];

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;

  @OneToMany(() => DatosGenerale, (datosGenerale) => datosGenerale.user)
  datosGenerales: DatosGenerale[];

  @OneToMany(()=> RespuestaParq, respuestaParq => respuestaParq.user)
  respuestaParq: RespuestaParq[];

  @OneToMany(()=> Caracterizacion, caracterizacion => caracterizacion.user)
  caracterizacion: Caracterizacion[];

  @OneToMany(()=> Encuesta, encuesta => encuesta.userCreador)
  encuesta: Encuesta[];

  @OneToMany(()=> Respuesta, respuesta => respuesta.user)
  respuesta: Respuesta[];

  @OneToMany(()=> Parq, parq => parq.user)
  parq: Parq[];

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  emailToLowerCaseOnUpdate() {
    this.emailToLowerCase();
  }
}
