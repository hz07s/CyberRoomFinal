import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { Event } from './../models/event';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  events: Event[] = [];
  newEvent: Event = {
    id: 0,
    nameEvent: '',
    description: '',
    startDate: new Date(),
    completionDate: new Date()
  }

  selectedEvent: Event | null = null;
  
  isEditing = false;

  get currentEvent(): Event {
    return this.isEditing && this.selectedEvent ? this.selectedEvent : this.newEvent
  }
  constructor(private eventService: EventsService) { }

  ngOnInit(): void {
    this.getEvents();
  }
  getEvents(): void {
    this.eventService.getEvents().subscribe((data: Event[]) => {
      this.events = data;
    });
  }
  createEvent(): void {
    this.eventService.createEvents(this.newEvent).subscribe(() => {
      this.getEvents();
      this.resetForm();
    });
  }

  deleteEvent(id: number): void {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.getEvents();
    });
  }

  editEvent(event: Event): void {
    this.selectedEvent = { ...event };
    this.isEditing = true; // Establecer el modo de edición
  }

  updateEvent(): void {
    if (this.selectedEvent && this.selectedEvent.id) {
      this.eventService.updateEvent(this.selectedEvent).subscribe(() => {
        this.getEvents(); // Obtener la lista actualizada de eventos
        this.resetForm();
      });
    }
  }

  resetForm(): void {
    this.newEvent = {
      id: 0,
      nameEvent: '',
      description: '',
      startDate: new Date(),
      completionDate: new Date()
    };
    this.selectedEvent = null; // Resetear el evento seleccionada
    this.isEditing = false; // Volver al modo agregar
  }

  onSubmit(): void {
    if (this.isEditing && this.selectedEvent) {
      this.updateEvent();
    } else {
      this.createEvent();
    }
  }
}
