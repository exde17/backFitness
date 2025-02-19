import { Module } from '@nestjs/common';
import { PreguntaParqService } from './pregunta-parq.service';
import { PreguntaParqController } from './pregunta-parq.controller';
import { TypeORMError } from 'typeorm';
import { PreguntaParq } from './entities/pregunta-parq.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [PreguntaParqController],
  providers: [PreguntaParqService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([PreguntaParq]),
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
export class PreguntaParqModule {}
