import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VulnerabilidadService } from './vulnerabilidad.service';
import { CreateVulnerabilidadDto } from './dto/create-vulnerabilidad.dto';
import { UpdateVulnerabilidadDto } from './dto/update-vulnerabilidad.dto';

@Controller('vulnerabilidad')
export class VulnerabilidadController {
  constructor(private readonly vulnerabilidadService: VulnerabilidadService) {}

  @Post()
  create(@Body() createVulnerabilidadDto: CreateVulnerabilidadDto) {
    return this.vulnerabilidadService.create(createVulnerabilidadDto);
  }

  @Get()
  async findAll() {
    return this.vulnerabilidadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vulnerabilidadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVulnerabilidadDto: UpdateVulnerabilidadDto) {
    return this.vulnerabilidadService.update(+id, updateVulnerabilidadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vulnerabilidadService.remove(+id);
  }
}
