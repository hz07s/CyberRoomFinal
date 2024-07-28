import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reservation } from '../models/reservation';

@Injectable({
    providedIn: 'root'
})

export class ReservationService {

    private apiUrl = `${environment.apiBaseUrl}`;

    constructor(private http: HttpClient) { }

    getReservations(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + '/reservation/list')
    }

    createReservation(reservation: Reservation): Observable<Reservation> {
        return this.http.post<Reservation>(this.apiUrl + '/reservation/create/', reservation);
    }

    updateReservation(reservation: Reservation): Observable<Reservation> {
        const url = `${this.apiUrl + '/reservation/update/'}${reservation.id}`;
        return this.http.put<Reservation>(url, reservation);
    }

    deleteReservation(id: number): Observable<any> {
        const url = `${this.apiUrl + '/reservation/delete/'}${id}`;
        return this.http.delete<any>(url);
    }
}