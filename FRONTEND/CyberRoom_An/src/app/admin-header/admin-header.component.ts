import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  isLoggedIn = false; // Asume que no está autenticado al inicio

  constructor(private router: Router, private userService: UserService) { } // Inyecta el router

  ngOnInit(): void {
    this.checkAuthStatus(); // Verifica el estado de autenticación al inicializar
  }

  checkAuthStatus() {
    let accessToken = localStorage.getItem('access_token');
    let user_type = localStorage.getItem('user_type');
    
    // Verifica si el usuario está autenticado y si es un admin
    this.isLoggedIn = !!accessToken && user_type === 'admin';
  }

  handleAuthAction() {
    const refreshToken = localStorage.getItem('refresh_token');

    if (refreshToken) {
      this.userService.logout(refreshToken).subscribe(
        (response) => {
          console.log('Logout successful:', response);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user_type');
          console.log("removido");
        },
        (error) => {
          console.error('Logout error:', error);
        }
      );
      this.isLoggedIn = false;
      this.router.navigate(['/home']); // Redirige a la página principal o cualquier otra página
    } else {
      this.router.navigate(['/login']); // Redirige a la página de login
    }
  }

  is_LoggedIn(){
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
    return this.isLoggedIn;
  }
}