import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
declare var bootstrap: any;

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
  passwordVisible = false;
  registerPasswordVisible = false;

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
        this.closeRegisterModal();
      },
      (error) => {
        console.error('Error en el registro:', error);
      }
    );
  }

  // login(): void {
  //   this.userService.login(this.credentials).subscribe(
  //     (response) => {
  //       console.log('Login successful:', response);
  //       localStorage.setItem('access_token', response.access);
  //       localStorage.setItem('refresh_token', response.refresh);
  //       this.refreshToken = response.refresh;
  //       this.getUserProfile();
  //     },
  //     (error) => {
  //       console.error('Login error:', error);
  //     }
  //   );
  // }

  login(): void {
    this.userService.login(this.credentials).subscribe(
      (response) => {
        console.log('Login successful:', response);
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
        localStorage.setItem('user_type', response.user_type);
        this.refreshToken = response.refresh;
        this.getUserProfile();
        this.closeLoginModal();
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
  closeLoginModal() {
    const loginModal = document.getElementById('loginModal') as any;
    if (loginModal) {
      const modal = bootstrap.Modal.getInstance(loginModal);
      if (modal) {
        modal.hide();
      }
    }
  }

  closeRegisterModal() {
    const registerModal = document.getElementById('registerModal') as any;
    if (registerModal) {
      const modal = bootstrap.Modal.getInstance(registerModal);
      if (modal) {
        modal.hide();
      }
    }
  }
  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
    const passwordField = document.getElementById('password') as HTMLInputElement;
    passwordField.type = this.passwordVisible ? 'text' : 'password';
    const icon = document.getElementById('passwordToggleIcon') as HTMLElement;
    icon.classList.toggle('bi-eye', !this.passwordVisible);
    icon.classList.toggle('bi-eye-slash', this.passwordVisible);
  }

  toggleRegisterPassword() {
    this.registerPasswordVisible = !this.registerPasswordVisible;
    const passwordField = document.getElementById('registerPassword') as HTMLInputElement;
    passwordField.type = this.registerPasswordVisible ? 'text' : 'password';
    const icon = document.getElementById('registerPasswordToggleIcon') as HTMLElement;
    icon.classList.toggle('bi-eye', !this.registerPasswordVisible);
    icon.classList.toggle('bi-eye-slash', this.registerPasswordVisible);
  }
  toggleConfirmPassword() {
    this.registerPasswordVisible = !this.registerPasswordVisible;
    const passwordField = document.getElementById('confirmPassword') as HTMLInputElement;
    passwordField.type = this.registerPasswordVisible ? 'text' : 'password';
    const icon = document.getElementById('registerPasswordToggleIcon2') as HTMLElement;
    icon.classList.toggle('bi-eye', !this.registerPasswordVisible);
    icon.classList.toggle('bi-eye-slash', this.registerPasswordVisible);
  }
}

