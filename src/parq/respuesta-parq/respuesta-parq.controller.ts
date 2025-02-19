import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RespuestaParqService } from './respuesta-parq.service';
import { CreateRespuestaParqDto } from './dto/create-respuesta-parq.dto';
import { UpdateRespuestaParqDto } from './dto/update-respuesta-parq.dto';
import { Auth, GetUser } from 'src/user/decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('respuesta-parq')
export class RespuestaParqController {
  constructor(private readonly respuestaParqService: RespuestaParqService) {}

  @Post()
  @Auth()
  async create(
    @Body() createRespuestaParqDto: CreateRespuestaParqDto,
    @GetUser() user: User,
  ) {
    return this.respuestaParqService.create(createRespuestaParqDto, user);
  }

  @Get()
  findAll() {
    return this.respuestaParqService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.respuestaParqService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRespuestaParqDto: UpdateRespuestaParqDto) {
    return this.respuestaParqService.update(+id, updateRespuestaParqDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.respuestaParqService.remove(+id);
  }
}
