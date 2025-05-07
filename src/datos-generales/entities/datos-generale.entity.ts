import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DocumentType } from "../../user/utils/documentType.enum";
import { GenderType } from "src/user/utils/genderType.enum";
import { User } from "src/user/entities/user.entity";
import { ZonaType } from "src/user/utils/zonaType.enum";
import { Barrio } from "src/barrio/entities/barrio.entity";

@Entity('datos_generales')
export class DatosGenerale {
    @PrimaryGeneratedColumn('uuid')
    id: string;

     @Column('text', {
        nullable: true,
        name: 'first_name',
      })
      name: string;
    
      //enum de tipo documento
      @Column('enum', {
        enum: DocumentType,
        nullable: true,
        name: 'document_type',
      })
      documentType: DocumentType;
    
      @Column('text',{
        nullable: true,
        name: 'document_number',
      })
      documentNumber: string;

      @Column('text', {
        nullable: true,
        name: 'phone_number',
      })
        phoneNumber: string;

     //fecha de nacimiento
        @Column('date', {
            nullable: true,
            name: 'birth_date',
        })
        birthDate: Date;
    
        @Column('text', {
            nullable: true,
            name: 'address',
        })
        address: string;
    
        @Column('text', {
            nullable: true,
            name: 'barrio',
        })
        barrio: string;

        @ManyToOne(()=> Barrio, b => b.datosGenerales, {nullable: true})
        barrioId: Barrio;
    
        @Column('text', {
            nullable: true,
            name: 'comuna_corregimiento',
        })
        comunaCorregimiento: string;
    
        @Column('text', {
            nullable: true,
            name: 'etnia',
        })
        etnia: string;
    
        @Column('text', {
            nullable: true,
            name: 'discapacidad',
        })
        discapacidad: string;
    
        @Column('enum',{
            enum: GenderType,
            nullable: true,
        })
        gender: GenderType;

        @Column('text',{
            nullable: true,
            name: 'poblacion_bulnerable',
        })
        poblacionVulnerable: string;

        @Column('text',{
            nullable: true,
            name: 'nivel_educativo',
        })
        nivelEducativo: string;

        @Column('text',{
            nullable: true,
            name: 'ocupacion',
        })
        ocupacion: string;

        @Column('text',{
            nullable: true,
            name: 'regimen_salud',
        })
        regimenSalud: string;

        @Column('text',{
            nullable: true,
        })
        eps: string;

        @Column('text',{
            nullable: true,
            name: 'grupo_sanquineo',
        })
        grupoSanquineo: string;

        @Column('text',{
            nullable: true,
            name: 'contacto_emergencia',
        })
        contactoEmergencia: string;

        @Column('text',{
            nullable: true,
            name: 'telefono_contacto',
        })
        telefonoContacto: string;

        @ManyToOne(() => User, user => user.datosGenerales)
        user: User;

        @Column('enum',{
            enum: ZonaType,
            nullable: true,
        })
        zona: ZonaType;
         
}
