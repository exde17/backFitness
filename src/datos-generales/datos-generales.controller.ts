import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DatosGeneralesService } from './datos-generales.service';
import { CreateDatosGeneraleDto } from './dto/create-datos-generale.dto';
import { UpdateDatosGeneraleDto } from './dto/update-datos-generale.dto';

@Controller('datos-generales')
export class DatosGeneralesController {
  constructor(private readonly datosGeneralesService: DatosGeneralesService) {}

  @Post()
  create(@Body() createDatosGeneraleDto: CreateDatosGeneraleDto) {
    return this.datosGeneralesService.create(createDatosGeneraleDto);
  }

  // @Get()
  // async findAll() {
  //   return this.datosGeneralesService.findAll();
  // }
@Get()
findAll(@Query('documentNumber') documentNumber?: string) {
  return this.datosGeneralesService.findAll(documentNumber);
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.datosGeneralesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDatosGeneraleDto: UpdateDatosGeneraleDto) {
    return this.datosGeneralesService.update(+id, updateDatosGeneraleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datosGeneralesService.remove(+id);
  }
}
