import { Component, OnInit } from '@angular/core';
import { MachineService } from '../services/machine.service';
import { Machine } from '../models/machine';
import { TariffService } from '../services/tariff.service';
import { Tariff } from '../models/tariff';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit {
  machines: any[] = [];
  tariffs: Tariff[] = [];
  machineStates = [
    { value: 'available', label: 'Disponible' },
    { value: 'booked', label: 'Reservada' },
    { value: 'disabled', label: 'Deshabilitada' }
  ];
  newMachine: Machine = this.initializeMachine();
  selectedMachine: Machine = this.initializeMachine();
  isEditing = false;

  get currentMachine(): Machine {
    return this.isEditing ? this.selectedMachine : this.newMachine;
  }

  constructor(
    private machineService: MachineService,
    private tariffService: TariffService
  ) {} 
}
