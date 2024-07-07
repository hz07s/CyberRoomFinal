import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  user: User = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  credentials = {
    username: '',
    password: ''
  };
  editedUser: User = {
    username: '',
    email: '',
    name: '',
    lastName: '',
    imagen: '',
    balance: 0,
    dni: '',
    phoneNumber: '',
    age: 0,
  };
  refreshToken = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.userService.getProfile().subscribe(
      (response) =>  {
        this.editedUser = response;
      },
      (error) => {
        console.error('Error al obtener el perfil del usuario:', error);
        
      }
    );
  }

  register(): void {
    this.userService.register(this.user).subscribe(
      (response) => {
        console.log('Registro exitoso:', response);
      },
      (error) => {
        console.error('Error en el registro:', error);
      }
    );
  }

  login(): void {
    this.userService.login(this.credentials).subscribe(
      (response) => {
        console.log('Login successful:', response);
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
        localStorage.setItem('user_type', response.user_type);
        this.refreshToken = response.refresh;
        this.getUserProfile();
      },
      (error) => {
        console.error('Login error:', error);
      }
    );
  }

  logout(): void {
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
    }
  }

  edit(): void {
    this.userService.edit(this.editedUser).subscribe(
      (response) => {
        console.log('Edición de usuario exitosa:', response);
      },
      (error) => {
        console.error('Error en la edición de usuario:', error);
      }
    );
  }
}
