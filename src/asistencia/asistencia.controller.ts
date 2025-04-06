import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { Auth, GetUser } from 'src/user/decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('asistencia')
export class AsistenciaController {
  constructor(
    private readonly asistenciaService: AsistenciaService
  ) {}

  @Post()
  async create(@Body() createAsistenciaDto: CreateAsistenciaDto) {
    return this.asistenciaService.create(createAsistenciaDto);
  }

  // asistencia no calificacdas
  @Get('no-calificadas')
  @Auth()
  async findAllNoCalificadas(
    @GetUser() user: User,
  ) {
    return this.asistenciaService.findAllNoCalificadas(user);
  }

  @Get()
  findAll() {
    return this.asistenciaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asistenciaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAsistenciaDto: UpdateAsistenciaDto) {
    return this.asistenciaService.update(+id, updateAsistenciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asistenciaService.remove(+id);
  }
}
