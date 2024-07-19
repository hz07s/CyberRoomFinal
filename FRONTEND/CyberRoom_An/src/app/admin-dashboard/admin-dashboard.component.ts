import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

// Registra todos los componentes necesarios
Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public chart: any;
  public totalMachines = 100;
  public activeMachines = 80;
  public inactiveMachines = 20;

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.chart = new Chart('machinesChart', {
      type: 'bar',
      data: {
        labels: ['Máquinas Activas', 'Máquinas Inactivas'],
        datasets: [{
          data: [this.activeMachines, this.inactiveMachines],
          backgroundColor: ['#01c38e', '#ff6f6f'],
          borderColor: '#ffffff',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false // Desactiva la leyenda
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
