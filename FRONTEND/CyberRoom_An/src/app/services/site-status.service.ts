import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteStatusService {
  private apiUrl = 'https://api.example.com/site-status'; // Cambia esto a tu API real

  constructor(private http: HttpClient) { }

  getStatus(): Observable<boolean> {
    return this.http.get<boolean>(this.apiUrl);
  }

  updateStatus(status: boolean): Observable<void> {
    return this.http.post<void>(this.apiUrl, { status });
  }
}
