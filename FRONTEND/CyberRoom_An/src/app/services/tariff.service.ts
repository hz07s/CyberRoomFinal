import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Tariff } from '../models/tariff';

@Injectable({
  providedIn: 'root'
})

export class TariffService {
  private apiUrl = `${environment.apiBaseUrl}/tariffs`;  // Ajusta según la URL de tu API

  constructor(private http: HttpClient) { }

  getTariffs(): Observable<Tariff[]> {
    return this.http.get<Tariff[]>(`${this.apiUrl}/list/`);
  }

  createTariff(tariff: Tariff): Observable<Tariff> {
    return this.http.post<Tariff>(`${this.apiUrl}/create/`, tariff);
  }

  deleteTariff(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}/`);
  }

  updateTariff(id: number, tariff: Tariff): Observable<Tariff> {
    return this.http.put<Tariff>(`${this.apiUrl}/update/${id}/`, tariff);
  }
}