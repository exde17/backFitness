import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PreguntaParqService } from './pregunta-parq.service';
import { CreatePreguntaParqDto } from './dto/create-pregunta-parq.dto';
import { UpdatePreguntaParqDto } from './dto/update-pregunta-parq.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseRoleGuard } from 'src/user/guards/use-role/use-role.guard';
import { Auth } from 'src/user/decorator';

@Controller('pregunta-parq')
export class PreguntaParqController {
  constructor(private readonly preguntaParqService: PreguntaParqService) {}

  @Post()
  create(@Body() createPreguntaParqDto: CreatePreguntaParqDto) {
    return this.preguntaParqService.create(createPreguntaParqDto);
  }

  @Get()
  // @UseGuards(AuthGuard(), UseRoleGuard.)
  @Auth()
  async findAll() {
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
