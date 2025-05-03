import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CalificacionService } from './calificacion.service';
import { CreateCalificacionDto } from './dto/create-calificacion.dto';
import { UpdateCalificacionDto } from './dto/update-calificacion.dto';
import { Auth, GetUser } from 'src/user/decorator';
import { User } from 'src/user/entities/user.entity';
import { ValidRoles } from 'src/user/interfaces';

@Controller('calificacion')
export class CalificacionController {
  constructor(private readonly calificacionService: CalificacionService) {}

  @Post()
  @Auth()
  async create(
    @Body() createCalificacionDto: CreateCalificacionDto,
    @GetUser() user: User,
    ) {
    return this.calificacionService.create(user,createCalificacionDto);
  }

  @Get()
  @Auth()
  findAll(
    @GetUser() user: User,
    ) {
    return this.calificacionService.findAll(user);
  }
  
  @Get('promedios')
  @Auth(ValidRoles.superUser, ValidRoles.monitor)
  getPromediosPorActividad() {
    return this.calificacionService.getPromediosPorActividad();
  }

  @Get('promedios/:actividadId')
  @Auth(ValidRoles.superUser, ValidRoles.monitor)
  getPromedioPorActividad(@Param('actividadId') actividadId: string) {
    return this.calificacionService.getPromedioPorActividad(actividadId);
  }

  @Get('actividad/:actividadId')
  @Auth(ValidRoles.superUser)
  getCalificacionesPorActividad(@Param('actividadId') actividadId: string) {
    return this.calificacionService.getCalificacionesPorActividad(actividadId);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.calificacionService.findOne(+id);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateCalificacionDto: UpdateCalificacionDto) {
    return this.calificacionService.update(+id, updateCalificacionDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.calificacionService.remove(+id);
  }
}
