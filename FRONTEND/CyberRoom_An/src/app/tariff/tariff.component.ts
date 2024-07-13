import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.css']
})
export class TariffComponent implements OnInit {
  tariffs: Tariff[] = [];
  newTariff: Tariff = {
    id: 0,
    cost: 0,
    tarifRange: ''
  };
  selectedTariff: Tariff | null = null; 
  isEditing = false; 

  // Nuevas propiedades para manejar el formulario
  currentCost: number = 0;
  currentTarifRange: string = '';

  constructor(private tariffService: TariffService) {}

  ngOnInit(): void {
    this.getTariffs();
  }
  getTariffs(): void {
    this.tariffService.getTariffs().subscribe((data: Tariff[]) => {
      this.tariffs = data;
    });
  }
  createTariff(): void {
    this.newTariff.cost = this.currentCost;
    this.newTariff.tarifRange = this.currentTarifRange;
    this.tariffService.createTariff(this.newTariff).subscribe(() => {
      this.getTariffs();
      this.resetForm();
    });
  }
  deleteTariff(id: number): void {
    this.tariffService.deleteTariff(id).subscribe(() => {
      this.getTariffs();
    });
  }
  editTariff(tariff: Tariff): void {
    this.selectedTariff = { ...tariff };
    this.isEditing = true; 
    this.currentCost = tariff.cost;
    this.currentTarifRange = tariff.tarifRange;
  }
  updateTariff(): void {
    if (this.selectedTariff && this.selectedTariff.id) {
      this.selectedTariff.cost = this.currentCost;
      this.selectedTariff.tarifRange = this.currentTarifRange;
      this.tariffService.updateTariff(this.selectedTariff.id, this.selectedTariff).subscribe(() => {
        this.getTariffs(); 
        this.resetForm();
      });
    }
  }
}
