import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParqService } from './parq.service';
import { CreateParqDto } from './dto/create-parq.dto';
import { UpdateParqDto } from './dto/update-parq.dto';

@Controller('parq')
export class ParqController {
  constructor(private readonly parqService: ParqService) {}

  @Post()
  create(@Body() createParqDto: CreateParqDto) {
    return this.parqService.create(createParqDto);
  }

  // LISTA DE USUARIOS APROBADOS
  @Get('aprobados')
  findAllAprobados() {
    return this.parqService.findAllAprobados();
  }  

  @Get()
  findAll() {
    return this.parqService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parqService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParqDto: UpdateParqDto) {
    return this.parqService.update(+id, updateParqDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parqService.remove(+id);
  }
}
