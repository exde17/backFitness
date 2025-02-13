import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OpcionPreguntaService } from './opcion-pregunta.service';
import { CreateOpcionPreguntaDto } from './dto/create-opcion-pregunta.dto';
import { UpdateOpcionPreguntaDto } from './dto/update-opcion-pregunta.dto';

@Controller('opcion-pregunta')
export class OpcionPreguntaController {
  constructor(private readonly opcionPreguntaService: OpcionPreguntaService) {}

  @Post()
  create(@Body() createOpcionPreguntaDto: CreateOpcionPreguntaDto) {
    return this.opcionPreguntaService.create(createOpcionPreguntaDto);
  }

  @Get()
  findAll() {
    return this.opcionPreguntaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.opcionPreguntaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOpcionPreguntaDto: UpdateOpcionPreguntaDto) {
    return this.opcionPreguntaService.update(+id, updateOpcionPreguntaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.opcionPreguntaService.remove(+id);
  }
}
