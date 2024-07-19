import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-control-panel',
  templateUrl: './admin-control-panel.component.html',
  styleUrls: ['./admin-control-panel.component.css']
})
export class AdminControlPanelComponent {
  isActive = true; // Estado inicial del sitio web
  areReservationsEnabled = true; // Estado inicial de las reservas

  toggleSiteStatus() {
    this.isActive = !this.isActive;
    // Lógica para habilitar/deshabilitar el sitio web
  }

  toggleReservationsStatus() {
    this.areReservationsEnabled = !this.areReservationsEnabled;
    // Lógica para habilitar/deshabilitar las reservas
  }
}
