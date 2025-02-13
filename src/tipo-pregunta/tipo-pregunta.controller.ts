import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoPreguntaService } from './tipo-pregunta.service';
import { CreateTipoPreguntaDto } from './dto/create-tipo-pregunta.dto';
import { UpdateTipoPreguntaDto } from './dto/update-tipo-pregunta.dto';

@Controller('tipo-pregunta')
export class TipoPreguntaController {
  constructor(private readonly tipoPreguntaService: TipoPreguntaService) {}

  @Post()
  create(@Body() createTipoPreguntaDto: CreateTipoPreguntaDto) {
    return this.tipoPreguntaService.create(createTipoPreguntaDto);
  }

  @Get()
  findAll() {
    return this.tipoPreguntaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoPreguntaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoPreguntaDto: UpdateTipoPreguntaDto) {
    return this.tipoPreguntaService.update(+id, updateTipoPreguntaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoPreguntaService.remove(+id);
  }
}
