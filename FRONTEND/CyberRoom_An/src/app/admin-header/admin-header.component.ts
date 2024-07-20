import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  isLoggedIn = false; // Asume que no está autenticado al inicio

  constructor(private router: Router) { } // Inyecta el router

  ngOnInit(): void {
    this.checkAuthStatus(); // Verifica el estado de autenticación al inicializar
  }

  checkAuthStatus() {
    let accessToken = localStorage.getItem('accessToken');
    let user_type = localStorage.getItem('user_type');
    
    // Verifica si el usuario está autenticado y si es un admin
    this.isLoggedIn = !!accessToken && user_type === 'admin';
  }
