import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EtniaService } from './etnia.service';
import { CreateEtniaDto } from './dto/create-etnia.dto';
import { UpdateEtniaDto } from './dto/update-etnia.dto';

@Controller('etnia')
export class EtniaController {
  constructor(private readonly etniaService: EtniaService) {}

  @Post()
  create(@Body() createEtniaDto: CreateEtniaDto) {
    return this.etniaService.create(createEtniaDto);
  }

  @Get()
  async findAll() {
    return this.etniaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.etniaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEtniaDto: UpdateEtniaDto) {
    return this.etniaService.update(+id, updateEtniaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.etniaService.remove(+id);
  }
}
