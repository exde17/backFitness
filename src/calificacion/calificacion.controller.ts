import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CalificacionService } from './calificacion.service';
import { CreateCalificacionDto } from './dto/create-calificacion.dto';
import { UpdateCalificacionDto } from './dto/update-calificacion.dto';
import { Auth, GetUser } from 'src/user/decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('calificacion')
export class CalificacionController {
  constructor(private readonly calificacionService: CalificacionService) {}

  @Post()
  @Auth()
  async create(
    @Body() createCalificacionDto: CreateCalificacionDto,
    @GetUser() user: User,
    ) {
    return this.calificacionService.create(user,createCalificacionDto);
  }

  @Get()
  @Auth()
  findAll(
    @GetUser() user: User,
    ) {
    return this.calificacionService.findAll(user);
  }
  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.calificacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCalificacionDto: UpdateCalificacionDto) {
    return this.calificacionService.update(+id, updateCalificacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.calificacionService.remove(+id);
  }
}
