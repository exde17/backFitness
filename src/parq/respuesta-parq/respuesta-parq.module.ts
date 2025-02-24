import { Module } from '@nestjs/common';
import { RespuestaParqService } from './respuesta-parq.service';
import { RespuestaParqController } from './respuesta-parq.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RespuestaParq } from './entities/respuesta-parq.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Parq } from '../entities/parq.entity';

@Module({
  controllers: [RespuestaParqController],
  providers: [RespuestaParqService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([RespuestaParq, Parq]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // console.log(configService.get('JWT_SECRET'));
        return{
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
        }
        
      },
    }),
  ],
})
export class RespuestaParqModule {}
