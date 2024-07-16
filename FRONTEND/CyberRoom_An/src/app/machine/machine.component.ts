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
  
  ngOnInit(): void {
    this.getMachines();
    this.getTariffs();
  }

  getMachines(): void {
    this.machineService.getMachines().subscribe((data: Machine[]) => {
      this.machines = data;
    });
  }
  getTariffs(): void {
    this.tariffService.getTariffs().subscribe((data: Tariff[]) => {
      this.tariffs = data;
    });
  }
  createMachine(): void {
    this.machineService.createMachine(this.newMachine).subscribe(() => {
      this.getMachines();
      this.resetForm();
    });
  }
  deleteMachine(id: number): void {
    this.machineService.deleteMachine(id).subscribe(() => {
      this.getMachines();
    });
  }
  editMachine(machine: Machine): void {
    this.selectedMachine = { ...machine };
    this.isEditing = true;
  }
  updateMachine(): void {
    if (this.selectedMachine && this.selectedMachine.idMachine) {
      this.machineService.updateMachine(this.selectedMachine.idMachine, this.selectedMachine).subscribe(() => {
        console.log(this.selectedMachine.idMachine);
        this.getMachines();
        this.resetForm();
        this.isEditing = false;
      });
      console.log(this.selectedMachine.machineName);
    }
}
