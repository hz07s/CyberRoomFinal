import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { Event } from './../models/event';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: any[] = []; // Array para almacenar eventos

  constructor(private eventService: EventsService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  /*loadEvents(): void {
    // Aquí puedes agregar lógica para cargar eventos desde una API o un servicio
    this.events = [
      { id: 1, title: 'Torneo de FIFA', date: '2024-08-15', location: 'Sala Principal', description: 'Participa en nuestro torneo de FIFA y gana premios.' },
      { id: 2, title: 'Noche de Juegos', date: '2024-08-20', location: 'Sala de Juegos', description: 'Una noche dedicada a los videojuegos con descuentos especiales.' },
      { id: 3, title: 'Maratón de LAN', date: '2024-09-05', location: 'Área LAN', description: 'Una maratón de LAN con premios para los mejores jugadores.' }
    ];
    
  }*/
  getEvents(): void {
    this.eventService.getEvents().subscribe((data: Event[]) => {
      this.events = data;
      console.log(data);
    });
  }
}
