import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DatosGeneralesService } from './datos-generales.service';
import { CreateDatosGeneraleDto } from './dto/create-datos-generale.dto';
import { UpdateDatosGeneraleDto } from './dto/update-datos-generale.dto';
import { Auth, GetUser } from 'src/user/decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('datos-generales')
export class DatosGeneralesController {
  constructor(private readonly datosGeneralesService: DatosGeneralesService) {}

  @Post()
  @Auth()
  create(
    @Body() createDatosGeneraleDto: CreateDatosGeneraleDto,
    @GetUser() user: User,
  ) {
    return this.datosGeneralesService.create(user,createDatosGeneraleDto);
  }

  // @Get()
  // async findAll() {
  //   return this.datosGeneralesService.findAll();
  // }
@Get()
@Auth()
findAll(@Query('documentNumber') documentNumber?: string) {
  return this.datosGeneralesService.findAll(documentNumber);
}

  @Get('one')
  @Auth()
  async findOne(
    // @Param('id') id: string,
    @GetUser() user:User
  ) {
    return this.datosGeneralesService.findOne(user);
  }

  @Patch()
  @Auth()
  async update(
    // @Param('id') id: string,
    @GetUser() user:User,
     @Body() updateDatosGeneraleDto: UpdateDatosGeneraleDto) {
    return this.datosGeneralesService.update(user, updateDatosGeneraleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datosGeneralesService.remove(+id);
  }
}
