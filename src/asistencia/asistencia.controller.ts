import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { Auth, GetUser } from 'src/user/decorator';
import { User } from 'src/user/entities/user.entity';
import { ValidRoles } from 'src/user/interfaces';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GenderStatisticsResponse } from './interfaces/gender-statistics.interface';

@ApiTags('Asistencia')
@Controller('asistencia')
export class AsistenciaController {
  constructor(
    private readonly asistenciaService: AsistenciaService
  ) {}

  @Post()
  @Auth(ValidRoles.monitor, ValidRoles.superUser)
  async create(@Body() createAsistenciaDto: CreateAsistenciaDto) {
    return this.asistenciaService.create(createAsistenciaDto);
  }

  // asistencia no calificacdas
  @Get('no-calificadas')
  @Auth()
  async findAllNoCalificadas(
    @GetUser() user: User,
  ) {
    return this.asistenciaService.findAllNoCalificadas(user);
  }

  @Get()
  @Auth()
  findAll() {
    return this.asistenciaService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.asistenciaService.findOne(id);
  }

  // traer asistencias por id de actividad
  @Get('numActividad/:id')
  @Auth(ValidRoles.monitor, ValidRoles.superUser)
  async findByActividad(
    @Param('id') id: string
  ) {
    return this.asistenciaService.findByActividad(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAsistenciaDto: UpdateAsistenciaDto) {
    return this.asistenciaService.update(+id, updateAsistenciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asistenciaService.remove(+id);
  }

  @Get('estadisticas/genero')
  @Auth(ValidRoles.superUser)
  @ApiOperation({ summary: 'Obtener promedio de asistencias por género' })
  @ApiResponse({ 
    status: 200, 
    description: 'Retorna estadísticas de asistencia por género, incluyendo promedios generales, por barrio y por zona'
  })
  getAttendanceAverageByGender(): Promise<GenderStatisticsResponse> {
    return this.asistenciaService.getAttendanceAverageByGender();
  }
}
