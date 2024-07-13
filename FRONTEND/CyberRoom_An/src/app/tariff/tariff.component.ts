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
}
