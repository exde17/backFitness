import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComunaCorregimientoService } from './comuna_corregimiento.service';
import { CreateComunaCorregimientoDto } from './dto/create-comuna_corregimiento.dto';
import { UpdateComunaCorregimientoDto } from './dto/update-comuna_corregimiento.dto';

@Controller('comuna-corregimiento')
export class ComunaCorregimientoController {
  constructor(private readonly comunaCorregimientoService: ComunaCorregimientoService) {}

  @Post()
  async create(@Body() createComunaCorregimientoDto: CreateComunaCorregimientoDto) {
    return this.comunaCorregimientoService.create(createComunaCorregimientoDto);
  }

  @Get()
  async findAll() {
    return this.comunaCorregimientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comunaCorregimientoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComunaCorregimientoDto: UpdateComunaCorregimientoDto) {
    return this.comunaCorregimientoService.update(+id, updateComunaCorregimientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comunaCorregimientoService.remove(+id);
  }
}
