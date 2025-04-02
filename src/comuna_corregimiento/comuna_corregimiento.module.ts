import { Module } from '@nestjs/common';
import { ComunaCorregimientoService } from './comuna_corregimiento.service';
import { ComunaCorregimientoController } from './comuna_corregimiento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComunaCorregimiento } from './entities/comuna_corregimiento.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ComunaCorregimientoController],
  providers: [ComunaCorregimientoService],
  imports: [ConfigModule, TypeOrmModule.forFeature ([ComunaCorregimiento]),
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
export class ComunaCorregimientoModule {}
