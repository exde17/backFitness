import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EpsService } from './eps.service';
import { CreateEpDto } from './dto/create-ep.dto';
import { UpdateEpDto } from './dto/update-ep.dto';

@Controller('eps')
export class EpsController {
  constructor(private readonly epsService: EpsService) {}

  @Post()
  create(@Body() createEpDto: CreateEpDto) {
    return this.epsService.create(createEpDto);
  }

  @Get()
  async findAll() {
    return this.epsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.epsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEpDto: UpdateEpDto) {
    return this.epsService.update(+id, updateEpDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.epsService.remove(+id);
  }
}
