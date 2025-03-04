import { Module } from '@nestjs/common';
import { ActividadesService } from './actividades.service';
import { ActividadesController } from './actividades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actividade } from './entities/actividade.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ActividadesController],
  providers: [ActividadesService],
  imports: [ConfigModule, TypeOrmModule.forFeature([Actividade]),
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
export class ActividadesModule {}
