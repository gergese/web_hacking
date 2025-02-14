import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './event.entity';
import { CreateEventDto } from './dtos/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Get()
  findAll(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Post('/newevent')
  create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventService.createEvent(createEventDto);
  }

  @Get(':id')
  getEvent(@Param('id') id: number): Promise<Event> {
    return this.eventService.findOne(id);
  }
}
