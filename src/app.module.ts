import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CarnetModule } from './carnet/carnet.module';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { ActividadModule } from './actividad/actividad.module';
import { EncuestaModule } from './encuesta/encuesta.module';
import { ParqModule } from './parq/parq.module';
import { CaracterizacionModule } from './caracterizacion/caracterizacion.module';
import { ConsentimientoModule } from './consentimiento/consentimiento.module';
import { DatosGeneralesModule } from './datos-generales/datos-generales.module';
import { PreguntaModule } from './pregunta/pregunta.module';
import { TipoPreguntaModule } from './tipo-pregunta/tipo-pregunta.module';
import { OpcionPreguntaModule } from './opcion-pregunta/opcion-pregunta.module';
import { RespuestaModule } from './respuesta/respuesta.module';
import { RespuestaCaracterizacionModule } from './respuesta-caracterizacion/respuesta-caracterizacion.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ssl: process.env.STAGE === 'prod',
      extra: {
        ssl:
          process.env.STAGE === 'prod' ? { rejectUnauthorized: false } : null,
      },
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    CarnetModule,
    AsistenciaModule,
    ActividadModule,
    EncuestaModule,
    ParqModule,
    CaracterizacionModule,
    ConsentimientoModule,
    DatosGeneralesModule,
    PreguntaModule,
    TipoPreguntaModule,
    OpcionPreguntaModule,
    RespuestaModule,
    RespuestaCaracterizacionModule,
  ],
})
export class AppModule {}
