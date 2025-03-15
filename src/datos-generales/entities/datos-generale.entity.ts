import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DocumentType } from "../../user/utils/documentType.enum";
import { GenderType } from "src/user/utils/genderType.enum";
import { User } from "src/user/entities/user.entity";

@Entity('datos_generales')
export class DatosGenerale {
    @PrimaryGeneratedColumn('uuid')
    id: string;

     @Column('text', {
        nullable: false,
        name: 'first_name',
      })
      name: string;
    
      //enum de tipo documento
      @Column('enum', {
        enum: DocumentType,
        nullable: false,
        name: 'document_type',
      })
      documentType: DocumentType;
    
      @Column('text',{
        nullable: true,
        name: 'document_number',
      })
      documentNumber: string;

      @Column('text', {
        nullable: false,
        name: 'phone_number',
      })
        phoneNumber: string;

     //fecha de nacimiento
        @Column('date', {
            nullable: false,
            name: 'birth_date',
        })
        birthDate: Date;
    
        @Column('text', {
            nullable: false,
            name: 'address',
        })
        address: string;
    
        @Column('text', {
            nullable: false,
            name: 'barrio',
        })
        barrio: string;
    
        @Column('text', {
            nullable: false,
            name: 'comuna_corregimiento',
        })
        comunaCorregimiento: string;
    
        @Column('text', {
            nullable: false,
            name: 'etnia',
        })
        etnia: string;
    
        @Column('text', {
            nullable: false,
            name: 'discapacidad',
        })
        discapacidad: string;
    
        @Column('enum',{
            enum: GenderType,
            nullable: false,
        })
        gender: GenderType;

        @Column('text',{
            nullable: false,
            name: 'poblacion_bulnerable',
        })
        poblacionVulnerable: string;

        @Column('text',{
            nullable: false,
            name: 'nivel_educativo',
        })
        nivelEducativo: string;

        @Column('text',{
            nullable: false,
            name: 'ocupacion',
        })
        ocupacion: string;

        @Column('text',{
            nullable: false,
            name: 'regimen_salud',
        })
        regimenSalud: string;

        @Column('text',{
            nullable: false,
        })
        eps: string;

        @Column('text',{
            nullable: false,
            name: 'grupo_sanquineo',
        })
        grupoSanquineo: string;

        @Column('text',{
            nullable: false,
            name: 'contacto_emergencia',
        })
        contactoEmergencia: string;

        @Column('text',{
            nullable: false,
            name: 'telefono_contacto',
        })
        telefonoContacto: string;

        @ManyToOne(() => User, user => user.datosGenerales)
        user: User;
    
}
