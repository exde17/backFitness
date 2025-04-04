import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SituacionService } from './situacion.service';
import { CreateSituacionDto } from './dto/create-situacion.dto';
import { UpdateSituacionDto } from './dto/update-situacion.dto';

@Controller('situacion')
export class SituacionController {
  constructor(private readonly situacionService: SituacionService) {}

  @Post()
  create(@Body() createSituacionDto: CreateSituacionDto) {
    return this.situacionService.create(createSituacionDto);
  }

  @Get()
  async findAll() {
    return this.situacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.situacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSituacionDto: UpdateSituacionDto) {
    return this.situacionService.update(+id, updateSituacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.situacionService.remove(+id);
  }
}
