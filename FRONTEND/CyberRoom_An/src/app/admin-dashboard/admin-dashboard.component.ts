import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MachineService } from '../services/machine.service';
import { Subscription } from 'rxjs';

// Registra todos los componentes necesarios
Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  public chart: any;
  public totalMachines = 0;
  public activeMachines = 0;
  public inactiveMachines = 0;
  private statsSubscription: Subscription = new Subscription();

  constructor(private machineService: MachineService) {}

  ngOnInit(): void {
    this.statsSubscription.add(
      this.machineService.getMachineStatsWithPolling(30000) // Poll every 30 seconds
        .subscribe(stats => {
          this.totalMachines = stats.total_machines;
          this.activeMachines = stats.active_machines;
          this.inactiveMachines = stats.inactive_machines;
          this.updateChart();
        })
    );
  }

  ngOnDestroy(): void {
    this.statsSubscription.unsubscribe();
  }

  updateChart(): void {
    if (this.chart) {
      this.chart.data.datasets[0].data = [this.activeMachines, this.inactiveMachines];
      this.chart.update();
    } else {
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
}
