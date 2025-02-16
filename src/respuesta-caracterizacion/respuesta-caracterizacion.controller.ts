import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RespuestaCaracterizacionService } from './respuesta-caracterizacion.service';
import { CreateRespuestaCaracterizacionDto } from './dto/create-respuesta-caracterizacion.dto';
import { UpdateRespuestaCaracterizacionDto } from './dto/update-respuesta-caracterizacion.dto';

@Controller('respuesta-caracterizacion')
export class RespuestaCaracterizacionController {
  constructor(private readonly respuestaCaracterizacionService: RespuestaCaracterizacionService) {}

  @Post()
  create(@Body() createRespuestaCaracterizacionDto: CreateRespuestaCaracterizacionDto) {
    return this.respuestaCaracterizacionService.create(createRespuestaCaracterizacionDto);
  }

  @Get()
  findAll() {
    return this.respuestaCaracterizacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.respuestaCaracterizacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRespuestaCaracterizacionDto: UpdateRespuestaCaracterizacionDto) {
    return this.respuestaCaracterizacionService.update(+id, updateRespuestaCaracterizacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.respuestaCaracterizacionService.remove(+id);
  }
}
