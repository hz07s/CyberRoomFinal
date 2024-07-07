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

  constructor() { }

  ngOnInit(): void {
  }

}
