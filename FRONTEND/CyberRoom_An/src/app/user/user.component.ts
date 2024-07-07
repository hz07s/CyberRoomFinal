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
}
