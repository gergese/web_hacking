import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventDto } from './dtos/create-event.dto';
import xss from 'xss';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) { }

  findAll(): Promise<Event[]> {
    return this.eventRepository.find({ order: { date: 'desc' } });
  }

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const event = new Event();

    event.title = xss(createEventDto.title); // XSS 필터링 적용
    event.content = xss(createEventDto.content);

    return this.eventRepository.save(event);
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { id: id } });
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found.`);
    }
    return event;
  }
}
