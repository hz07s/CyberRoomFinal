import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Event } from './../models/event';
@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private apiUrl = `${environment.apiBaseUrl}/event`;

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]>{
    return this.http.get<any[]>(this.apiUrl + '/list/');
  }

  createEvents(event: Event): Observable<Event>{
    return this.http.post<Event>(this.apiUrl + '/create/', event);
  }

  deleteEvent(id: number): Observable<any> {
    const url = `${this.apiUrl + '/delete/'}${id}/`;
    return this.http.delete(url);
  }
  updateEvent(event: Event): Observable<Event> {
    const url = `${this.apiUrl + '/update/'}${event.id}/`;
    return this.http.put<Event>(url, event);
  }

}
