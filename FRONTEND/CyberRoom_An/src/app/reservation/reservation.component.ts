import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { Reservation } from '../models/reservation';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
}) 
export class ReservationComponent implements OnInit {
    currentUser: User | null = null;
    reservation: Reservation = {
        id: 1,
        idUser: 0,
        idMachine: 0,
        startTime: new Date(),
        endTime: new Date(),
        cost: 0,
        reservationStatus: 'pending', // Valor por defecto
    };
    reservations: Reservation[] = [];
    showForm: boolean = false;
    selectedReservation: Reservation | null = null;
    isEditing = false;
    statusChoices: { value: string, display: string }[] = [
        { value: 'pending', display: 'Pending' },
        { value: 'confirmed', display: 'Confirmed' },
        { value: 'cancelled', display: 'Cancelled' },
    ];

    constructor(
        private reservationService: ReservationService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.fetchReservations();
        this.authService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    viewUpdate(reservation: Reservation): void {
        this.selectedReservation = { ...reservation };
        this.showForm = true;
    }

    fetchReservations(): void {
        this.reservationService.getReservations().subscribe(res => {
            this.reservations = res;
        }, (error) => {
            console.error('Error obteniendo las reservas', error);
        });
    }

    createReservation(): void {
        this.calculateCost();
        console.log(this.reservation);
        this.reservationService.createReservation(this.reservation).subscribe((res) => {
            console.log('Reserva creada: ', res);
            this.fetchReservations();
        }, (error) => {
            console.error('Error al crear la reserva: ', error);
        });
    }

    updateReservation(): void {
        if (this.selectedReservation) {
            this.calculateCost(); // Asegurarse de que el costo se actualice antes de la actualización
            this.reservationService.updateReservation(this.selectedReservation).subscribe(() => {
                console.log('Reserva actualizada exitosamente.');
                this.fetchReservations();
                this.showForm = false;
                this.selectedReservation = null;
            }, (error) => {
                console.error('Error al actualizar la reserva:', error);
            });
        } else {
            console.error('No hay ninguna reserva seleccionada para actualizar');
        }
    }

    deleteReservation(id: number): void {
        this.reservationService.deleteReservation(id).subscribe(() => {
            console.log(`Reserva con ID ${id} eliminada`);
            this.fetchReservations();
            this.showForm = false;
        }, (error) => {
            console.error('Error al eliminar la reserva: ', error);
        });
    }

    calculateCost(): void {
        if (this.reservation.startTime && this.reservation.endTime) {
            const start = new Date(this.reservation.startTime).getTime();
            const end = new Date(this.reservation.endTime).getTime();
            const durationInHours = (end - start) / (1000 * 60 * 60);
            const hourlyRate = 10; // Ejemplo de tarifa por hora
            this.reservation.cost = durationInHours * hourlyRate;
        } else {
            this.reservation.cost = 0;
        }
    }
    onSubmit(): void {
        if (this.isEditing && this.selectedReservation) {
          this.updateReservation();
        } else {
          this.createReservation();
        }
      }
    editReservation(reservation: Reservation): void {
        this.selectedReservation = { ...reservation };
        this.isEditing = true; 
    }
}

