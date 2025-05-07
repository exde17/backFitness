import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ComunaCorregimientoService } from './comuna_corregimiento.service';
import { CreateComunaCorregimientoDto } from './dto/create-comuna_corregimiento.dto';
import { UpdateComunaCorregimientoDto } from './dto/update-comuna_corregimiento.dto';
import { Auth } from '../user/decorator/auth.decorator';
import { ValidRoles } from 'src/user/interfaces';

@Controller('comuna-corregimiento')
export class ComunaCorregimientoController {
  constructor(private readonly comunaCorregimientoService: ComunaCorregimientoService) {}

  @Post()
  async create(@Body() createComunaCorregimientoDto: CreateComunaCorregimientoDto) {
    return this.comunaCorregimientoService.create(createComunaCorregimientoDto);
  }

  // @Get()
  // @Auth(ValidRoles.superUser)
  // async findAll() {
  //   return this.comunaCorregimientoService.findAll();
  // }

@Get('/search')
@Auth(ValidRoles.superUser)
async findAll(@Query('nombre') nombre?: string) {
  return this.comunaCorregimientoService.findAll(nombre);
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
