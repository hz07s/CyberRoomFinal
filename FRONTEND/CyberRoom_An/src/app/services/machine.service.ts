import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { environment } from '../../environments/environment';
import { Machine } from '../models/machine';
import { Tariff } from '../models/tariff';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MachineService {
  private apiUrl = `${environment.apiBaseUrl}/machines`;  // Ajusta según la URL de tu API

  constructor(private http: HttpClient) { }

  getMachines(): Observable<Machine[]> {
    return this.http.get<Machine[]>(`${this.apiUrl}/list/`);
  }

  createMachine(machine: Machine): Observable<Machine> {
    return this.http.post<Machine>(`${this.apiUrl}/create/`, machine);
  }

  deleteMachine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}/`);
  }

  updateMachine(id: number, machine: Machine): Observable<Machine> {
    return this.http.put<Machine>(`${this.apiUrl}/update/${id}/`, machine);
  }

  getMachineStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats`);
  }

  getMachineStatsWithPolling(interval: number): Observable<any> {
    return timer(0, interval).pipe(
      switchMap(() => this.getMachineStats())
    );
  }
  getTariffs(): Observable<Tariff[]> {
    return this.http.get<Tariff[]>(`${environment.apiBaseUrl}/tariffs/list`);
  }
}