import { Module } from '@nestjs/common';
import { BarrioService } from './barrio.service';
import { BarrioController } from './barrio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barrio } from './entities/barrio.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [BarrioController],
  providers: [BarrioService],
  imports: [ConfigModule,TypeOrmModule.forFeature([Barrio]),
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
export class BarrioModule {}
