import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router para la navegación
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  // Asume que no está autenticado al inicio

  constructor(private router: Router, private userService: UserService) { } // Inyecta el router

  ngOnInit(): void {
    this.checkAuthStatus(); // Verifica el estado de autenticación al inicializar
  }

  checkAuthStatus() {
    // Lógica para verificar si el usuario está autenticado
    let accessToken = localStorage.getItem('access_token');
    this.isLoggedIn = !!accessToken; // Cambia el estado en función del token
  }

  handleAuthAction() {
    const refreshToken = localStorage.getItem('refresh_token');
    console.log('Refresh Token:', refreshToken);
  
    if (refreshToken) {
      this.userService.logout(refreshToken).subscribe(
        (response) => {
          console.log('Logout successful:', response);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user_type');
          localStorage.removeItem('user');
          console.log("Datos removidos");
          this.isLoggedIn = false;
          this.router.navigate(['/home']); 
        },
        (error) => {
          console.error('Logout error:', error);
        }
      );
    } else {
      this.router.navigate(['/login']); 
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
