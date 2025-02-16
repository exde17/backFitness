import { Encuesta } from "src/encuesta/entities/encuesta.entity";
import { OpcionPregunta } from "src/opcion-pregunta/entities/opcion-pregunta.entity";
import { Pregunta } from "src/pregunta/entities/pregunta.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('respuesta')
export class Respuesta {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(()=> Pregunta, pregunta => pregunta.respuesta)
    pregunta: Pregunta;

    @ManyToOne(()=> OpcionPregunta, opcionPregunta => opcionPregunta.respuesta)
    opcionPregunta: OpcionPregunta;

    @ManyToOne(()=> User, user => user.respuesta)
    user: User;

    @ManyToOne(()=> Encuesta, encuesta => encuesta.respuesta)
    encuesta: Encuesta;
}
