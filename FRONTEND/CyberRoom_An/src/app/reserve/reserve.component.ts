import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import { MachineService } from '../services/machine.service';
import { UserService } from '../services/user.service';
import { Reservation } from '../models/reservation';
import { Machine } from '../models/machine';
import { User } from '../models/user.model';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {
  stripe: any;
  sessionId: string = '';
  machines: Machine[] = [];
  reservation: Reservation = {
    id: 0,
    idUser: 0,  // Inicialmente en 0, será actualizado con el ID del usuario
    idMachine: 0,
    startTime: new Date(),
    endTime: new Date(),
    cost: 0,
    reservationStatus: 'pending'
  };
  user: User | null = null;

  constructor(
    private http: HttpClient,
    private machineService: MachineService,
    private userService: UserService
  ) { }

  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_51PfA8cRppbh7POuNM08iGaR5wlUOcUbDwnvA1NsiNvxD1s7M1t0UXtaHmzFoWfzXqau1GpeGWurAzvfgSUfgdFtP00BFZrY0Rm');
    this.loadMachines();
    this.loadUserProfile();
  }

  loadMachines() {
    this.machineService.getMachines()
      .subscribe((data: Machine[]) => {
        console.log('Máquinas recibidas:', data);
        this.machines = data;
      });
  }

  loadUserProfile() {
    this.userService.getProfile()
      .subscribe((profile: User) => {
        console.log('Perfil del usuario:', profile);
        if (profile.id !== undefined) {  // Verifica si el ID está definido
          this.reservation.idUser = profile.id;
        } else {
          console.error('El perfil del usuario no tiene un ID definido.');
        }
      }, error => {
        console.error('Error al obtener el perfil del usuario:', error);
      });
  }

  async createCheckoutSession() {
    this.http.post('http://localhost:8000/api/create-checkout-session/', this.reservation)
      .subscribe((data: any) => {
        this.sessionId = data.id;
        this.redirectToCheckout();
      });
  }

  async redirectToCheckout() {
    const { error } = await this.stripe.redirectToCheckout({
      sessionId: this.sessionId,
    });

    if (error) {
      console.error(error);
    }
  }

  onSubmit() {
    console.log('Reserva realizada:', this.reservation);
    this.createCheckoutSession();
  }
}
