import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActividadesService } from './actividades.service';
import { CreateActividadeDto } from './dto/create-actividade.dto';
import { UpdateActividadeDto } from './dto/update-actividade.dto';
import { Auth, GetUser } from 'src/user/decorator';

@Controller('actividades')
export class ActividadesController {
  constructor(private readonly actividadesService: ActividadesService) {}

  @Post()
  @Auth()
  async create(
    @Body() createActividadeDto: CreateActividadeDto,
    @GetUser() user: any
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
    return this.actividadesService.findDia();
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
}
