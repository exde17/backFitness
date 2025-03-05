import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParqueService } from './parque.service';
import { CreateParqueDto } from './dto/create-parque.dto';
import { UpdateParqueDto } from './dto/update-parque.dto';
import { Auth } from 'src/user/decorator';

@Controller('parque')
export class ParqueController {
  constructor(private readonly parqueService: ParqueService) {}

  @Post()
  @Auth()
  async create(@Body() createParqueDto: CreateParqueDto) {
    return this.parqueService.create(createParqueDto);
  }

  @Get()
  findAll() {
    return this.parqueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parqueService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateParqueDto: UpdateParqueDto) {
    return this.parqueService.update(id, updateParqueDto);
  }

  // cambiar estado
  @Patch('estado/:id')
  async cambiarEstado(@Param('id') id: string) {
    return this.parqueService.cambiarEstado(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parqueService.remove(+id);
  }
}
