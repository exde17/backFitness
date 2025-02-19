import { Module } from '@nestjs/common';
import { CaracterizacionService } from './caracterizacion.service';
import { CaracterizacionController } from './caracterizacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Caracterizacion } from './entities/caracterizacion.entity';
import { User } from 'src/user/entities/user.entity';
import { Auth } from 'src/user/decorator';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [CaracterizacionController],
  providers: [CaracterizacionService],
  imports: [ConfigModule, TypeOrmModule.forFeature([Caracterizacion,User]),
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
export class CaracterizacionModule {}
