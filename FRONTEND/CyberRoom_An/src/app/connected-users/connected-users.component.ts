import { Component, OnInit } from '@angular/core';
import { ConnectedUsersService } from '../services/connected-users.service'; // Asegúrate de la ruta correcta

@Component({
  selector: 'app-connected-users',
  templateUrl: './connected-users.component.html',
  styleUrls: ['./connected-users.component.css']
})
export class ConnectedUsersComponent implements OnInit {
  connectedUsers: Array<{ id: number, name: string }> = []; // Define el tipo de datos para los usuarios de prueba

  constructor(private connectedUsersService: ConnectedUsersService) { }

  ngOnInit(): void {
    // Aquí puedes agregar usuarios de prueba
    this.connectedUsers = [
      { id: 1, name: 'Usuario 1' },
      { id: 2, name: 'Usuario 2' },
      { id: 3, name: 'Usuario 3' }
    ];
  }
}
