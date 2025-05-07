import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BarrioService } from './barrio.service';
import { CreateBarrioDto } from './dto/create-barrio.dto';
import { UpdateBarrioDto } from './dto/update-barrio.dto';
import { Auth } from 'src/user/decorator';
import { ValidRoles } from 'src/user/interfaces';

@Controller('barrio')
export class BarrioController {
  constructor(private readonly barrioService: BarrioService) {}

  @Post()
  @Auth(ValidRoles.superUser)
  async create(@Body() createBarrioDto: CreateBarrioDto) {
    return this.barrioService.create(createBarrioDto);
  }

  @Get()
  @Auth()
  async findAll() {
    return this.barrioService.findAll();
  }

  @Get('filterBarrio')
  // @Auth()
  async findByCoincidence(@Query('texto') texto: string) {
    return this.barrioService.findByCoincidence(texto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.barrioService.findOne(+id);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateBarrioDto: UpdateBarrioDto) {
    return this.barrioService.update(id, updateBarrioDto);
  }

  //actualizar estado
  @Patch('estado/:id')
  @Auth()
  updateEstado(@Param('id') id: string) {
    return this.barrioService.updateEstado(id);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.barrioService.remove(+id);
  }
}
