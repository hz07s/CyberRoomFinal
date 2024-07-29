import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MachineService } from '../services/machine.service';
import { Reservation } from '../models/reservation';
import { Machine } from '../models/machine';
import { Tariff } from '../models/tariff';
declare let bootstrap: any;

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {
  machines: Machine[] = [];
  tariffs: Tariff[] = [];
  reservation: Reservation = {
    id: 0,
    idUser: 0,
    idMachine: 0,
    startTime: new Date(),
    endTime: new Date(),
    cost: 0,
    reservationStatus: 'pending'
  };
  qrCodeUrl: string | null = null;
  constructor(
    private http: HttpClient,
    private machineService: MachineService
  ) { }

  ngOnInit() {
    this.loadMachines();
    this.machineService.getTariffs().subscribe(tariffs => {
      console.log('Tarifas cargadas:', tariffs);  // Agrega un log para verificar las tarifas
      this.tariffs = tariffs;
    }, error => {
      console.error('Error al cargar tarifas:', error);
    });
  }

  loadMachines() {
    this.machineService.getMachines().subscribe((data: Machine[]) => {
      this.machines = data;
    });
  }

  calculateCost() {
    if (!this.reservation.idMachine || !this.reservation.startTime || !this.reservation.endTime) {
      this.reservation.cost = 0;
      return;
    }

    const startTime = new Date(this.reservation.startTime);
    const endTime = new Date(this.reservation.endTime);

    if (startTime >= endTime) {
      this.reservation.cost = 0;
      return;
    }

    // Calcula la duración en horas
    const durationInHours = Math.ceil((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60));
    console.log('Duración en horas:', durationInHours);

    // Obtén la tarifa para la máquina seleccionada
    const tariffRange = this.getTariffRange(this.reservation.idMachine);
    console.log('Rango de tarifa:', tariffRange);

    // Encuentra la tarifa correspondiente al rango
    const tariff = this.tariffs.find(t => t.tarifRange === tariffRange);

    console.log('Tarifas disponibles:', this.tariffs);
    console.log('Tarifa encontrada:', tariff);

    if (tariff) {
      this.reservation.cost = durationInHours * tariff.cost;
    } else {
      this.reservation.cost = 0;
    }
    console.log('Costo calculado:', this.reservation.cost);
  }

  onSubmit() {
    console.log('Reserva realizada:', this.reservation);
  }

  getTariffRange(idMachine: number): string {
    const numericIdMachine = Number(idMachine);
    const tariff = this.tariffs.find(t => t.id === numericIdMachine);
    return tariff ? tariff.tarifRange : 'Desconocido';
  }

  closeModal() {
    // Cierra el modal manualmente
    const modalElement = document.getElementById('qrModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
  }

  createCheckoutSession() {
    this.qrCodeUrl = 'assets/images/qr_yape.jpg';
  }

  getTariffRanges(): string[] {
    const ranges = new Set(this.tariffs.map(tariff => tariff.tarifRange));
    return Array.from(ranges);
  }
}
