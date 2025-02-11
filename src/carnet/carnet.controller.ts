import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarnetService } from './carnet.service';
import { CreateCarnetDto } from './dto/create-carnet.dto';
import { UpdateCarnetDto } from './dto/update-carnet.dto';

@Controller('carnet')
export class CarnetController {
  constructor(private readonly carnetService: CarnetService) {}

  @Post()
  create(@Body() createCarnetDto: CreateCarnetDto) {
    return this.carnetService.create(createCarnetDto);
  }

  @Get()
  findAll() {
    return this.carnetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carnetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarnetDto: UpdateCarnetDto) {
    return this.carnetService.update(+id, updateCarnetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carnetService.remove(+id);
  }
}
