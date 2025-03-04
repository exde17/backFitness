import { Module } from '@nestjs/common';
import { ParqueService } from './parque.service';
import { ParqueController } from './parque.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parque } from './entities/parque.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ParqueController],
  providers: [ParqueService],
  imports: [ConfigModule,TypeOrmModule.forFeature([Parque]),
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
export class ParqueModule {}
