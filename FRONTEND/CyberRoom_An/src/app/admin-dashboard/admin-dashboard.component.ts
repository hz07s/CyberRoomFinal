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