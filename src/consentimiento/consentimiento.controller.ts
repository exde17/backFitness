import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsentimientoService } from './consentimiento.service';
import { CreateConsentimientoDto } from './dto/create-consentimiento.dto';
import { UpdateConsentimientoDto } from './dto/update-consentimiento.dto';

@Controller('consentimiento')
export class ConsentimientoController {
  constructor(private readonly consentimientoService: ConsentimientoService) {}

  @Post()
  create(@Body() createConsentimientoDto: CreateConsentimientoDto) {
    return this.consentimientoService.create(createConsentimientoDto);
  }

  @Get()
  findAll() {
    return this.consentimientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consentimientoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsentimientoDto: UpdateConsentimientoDto) {
    return this.consentimientoService.update(+id, updateConsentimientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consentimientoService.remove(+id);
  }
}
