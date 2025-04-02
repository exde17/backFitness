import { Module } from '@nestjs/common';
import { DatosGeneralesService } from './datos-generales.service';
import { DatosGeneralesController } from './datos-generales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatosGenerale } from './entities/datos-generale.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [DatosGeneralesController],
  providers: [DatosGeneralesService],
  imports: [ConfigModule, TypeOrmModule.forFeature([DatosGenerale]),
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
export class DatosGeneralesModule {}
