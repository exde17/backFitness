import { Injectable } from '@nestjs/common';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { Evento } from './entities/evento.entity';

@Injectable()
export class EventoService {
  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
  ){}
  async create(createEventoDto: CreateEventoDto) {
    try {
      const evento = this.eventoRepository.create(createEventoDto);
      await this.eventoRepository.save(evento);

      return 'Evento creado con exito';
      
    } catch (error) {
      console.log(error);
      return 'Error al crear el evento';
      
    }
  }

  async findAll() {
    try {
      const fechaActual = new Date();
      
      // Buscar eventos cuya fecha sea mayor o igual a la fecha actual
      const eventos = await this.eventoRepository.find({
        relations: ['lugar'],
        where: {
          fecha: MoreThanOrEqual(fechaActual)
        },
        order: {
          fecha: 'ASC' // Ordenar por fecha ascendente
        }
      });

      return eventos;
      
    } catch (error) {
      console.log(error);
      return 'Error al obtener los eventos';
    }
  }

  // cambiar estado
  async findEstado(id: string) {
    try {
      const eventos = await this.eventoRepository.findOne({
        where: {
          id,
        },
      });
      if (!eventos) {
        return 'Evento no encontrado';
      }
      // Cambiar el estado del evento
      eventos.estado = !eventos.estado;
      await this.eventoRepository.save(eventos);
      return 'Estado cambiado con exito';
    } catch (error) {
      console.log(error);
      return 'Error al obtener los eventos';
    }
  }
  

  findOne(id: number) {
    return `This action returns a #${id} evento`;
  }

  update(id: string, updateEventoDto: UpdateEventoDto) {
    try {
      this.eventoRepository.update(id, updateEventoDto);
      return 'Evento actualizado con exito';
      
    } catch (error) {
      console.log(error);
      return 'Error al actualizar el evento';
      
    }
  }

  remove(id: number) {
    return `This action removes a #${id} evento`;
  }
}
