import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectedUsersService {
  constructor() {}

  getConnectedUsers(): Observable<string[]> {
    // Aquí deberías hacer una llamada HTTP a tu backend para obtener los usuarios conectados
    // Por simplicidad, devolveremos una lista simulada
    return of(['Usuario1', 'Usuario2', 'Usuario3']);
  }
}
