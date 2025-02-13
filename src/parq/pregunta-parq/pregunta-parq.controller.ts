import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PreguntaParqService } from './pregunta-parq.service';
import { CreatePreguntaParqDto } from './dto/create-pregunta-parq.dto';
import { UpdatePreguntaParqDto } from './dto/update-pregunta-parq.dto';

@Controller('pregunta-parq')
export class PreguntaParqController {
  constructor(private readonly preguntaParqService: PreguntaParqService) {}

  @Post()
  create(@Body() createPreguntaParqDto: CreatePreguntaParqDto) {
    return this.preguntaParqService.create(createPreguntaParqDto);
  }

  @Get()
  findAll() {
    return this.preguntaParqService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preguntaParqService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePreguntaParqDto: UpdatePreguntaParqDto) {
    return this.preguntaParqService.update(+id, updatePreguntaParqDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preguntaParqService.remove(+id);
  }
}
