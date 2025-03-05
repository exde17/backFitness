import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoActividadService } from './tipo-actividad.service';
import { CreateTipoActividadDto } from './dto/create-tipo-actividad.dto';
import { UpdateTipoActividadDto } from './dto/update-tipo-actividad.dto';
import { Auth } from 'src/user/decorator';

@Controller('tipo-actividad')
export class TipoActividadController {
  constructor(private readonly tipoActividadService: TipoActividadService) {}

  @Post()
  async create(@Body() createTipoActividadDto: CreateTipoActividadDto) {
    return this.tipoActividadService.create(createTipoActividadDto);
  }

  @Get()
  @Auth()
  async findAll() {
    return this.tipoActividadService.findAll();
  }

  @Get(':id')
  @Auth()
  async findOne(@Param('id') id: string) {
    return this.tipoActividadService.findOne(+id);
  }

  @Patch(':id')
  @Auth()
  async update(@Param('id') id: string, @Body() updateTipoActividadDto: UpdateTipoActividadDto) {
    return this.tipoActividadService.update(id, updateTipoActividadDto);
  }

  // cambiar estado
  @Patch('estado/:id')
  @Auth()
  async updateStado(@Param('id') id: string) {
    return this.tipoActividadService.updateStado(id);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.tipoActividadService.remove(+id);
  }
}
