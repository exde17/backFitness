import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CaracterizacionService } from './caracterizacion.service';
import { CreateCaracterizacionDto } from './dto/create-caracterizacion.dto';
import { UpdateCaracterizacionDto } from './dto/update-caracterizacion.dto';
import { Auth, GetUser } from 'src/user/decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('caracterizacion')
export class CaracterizacionController {
  constructor(private readonly caracterizacionService: CaracterizacionService) {}

  @Post()
  @Auth()
  async create(
    @Body() createCaracterizacionDto: CreateCaracterizacionDto,
    @GetUser() user: User
  ) {
    return this.caracterizacionService.create(createCaracterizacionDto, user);
  }

  @Get()
  findAll() {
    return this.caracterizacionService.findAll();
  }

  //traer todas las caracterizaciones de un usuario
  @Get('user')
  @Auth()
  async findAllByUser(@GetUser() user: User) {
    return this.caracterizacionService.findAllByUser(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.caracterizacionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCaracterizacionDto: UpdateCaracterizacionDto) {
    return this.caracterizacionService.update(+id, updateCaracterizacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.caracterizacionService.remove(+id);
  }
}
