import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ActividadesService } from './actividades.service';
import { CreateActividadeDto } from './dto/create-actividade.dto';
import { UpdateActividadeDto } from './dto/update-actividade.dto';
import { Auth, GetUser } from 'src/user/decorator';
import { User } from 'src/user/entities/user.entity';
import { ValidRoles } from 'src/user/interfaces';

@Controller('actividades')
export class ActividadesController {
  constructor(private readonly actividadesService: ActividadesService) {}

  @Post()
  @Auth()
  async create(
    @Body() createActividadeDto: CreateActividadeDto,
    @GetUser() user: User
  ) {
    return this.actividadesService.create(createActividadeDto, user);
  }

  // crear actividad por el administrador
  @Post('admin')
  @Auth()
  async createAdmin(
    @Body() createActividadeDto: CreateActividadeDto
  ) {
    return this.actividadesService.createAdmin(createActividadeDto);
  }

  // traer actividades de el dia actual
  @Get('dia')
  @Auth()
  async findDia() {
    return this.actividadesService.findSemana();
  }

  // trae actividades para la asistencia exclusiva del  monitor y del dia en curso
  @Get('asistencia-dia')
  @Auth(ValidRoles.monitor)
  async findDiaAsistencia(
    @GetUser() user: User
  ) {
    return this.actividadesService.findDiaAsistencia(user);
  }

  // actividades por monitor 
  @Get('monitor')
  @Auth(ValidRoles.monitor)
  async findMonitor(
    @GetUser() user: User,
  ) {
    return this.actividadesService.findMonitor(user);
  }

  // actividades por rango de fechas
  @Get('por-fechas')
  @Auth()
  async findByDateRange(
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string
  ) {
    return this.actividadesService.findByDateRange(fechaInicio, fechaFin);
  }

  // actividades por rango de fechas y usuario monitor logueado
  @Get('monitor-por-fechas')
  @Auth()
  async findByDateRangeAndMonitor(
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string,
    @GetUser() user: User
  ) {
    return this.actividadesService.findByDateRangeAndMonitor(fechaInicio, fechaFin, user);
  }

  @Get()
  @Auth()
  findAll() {
    return this.actividadesService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.actividadesService.findOne(id);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateActividadeDto: UpdateActividadeDto) {
    return this.actividadesService.update(id, updateActividadeDto);
  }

  // cancelar actividad
  @Patch('cancelar/:id')
  @Auth()
  updateCancelada(
    @Param('id') id: string,
    @Body('motivoCancelado') motivoCancelado: string
  ) {
    return this.actividadesService.updateCancelada(id, motivoCancelado);
  }

  // cambiar estado
  @Patch('estado/:id')
  @Auth()
  updateEstado(@Param('id') id: string) {
    return this.actividadesService.updateStado(id);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.actividadesService.remove(+id);
  }

  @Patch('checkAsistenca/:id')
  @Auth(ValidRoles.superUser)
  checkAsistencia(@Param('id') id: string) {
    return this.actividadesService.checkAsistencia(id);
  }
}
