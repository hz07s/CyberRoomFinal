import { Component } from '@angular/core';
// import { AuthService } from './auth.service'; // Asegúrate de importar tu servicio de autenticación

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAdmin = false;

  constructor() {
    //this.checkAdminStatus();
  }

  is_Admin2() {
    //console.log("aaaaaaaaaaaaaaaa");
    this.isAdmin = false;
    let accessToken = localStorage.getItem('accessToken');
    let refreshToken = localStorage.getItem('refreshToken');
    let user_type = localStorage.getItem('user_type');
    
    if (user_type != null) {
      if ('admin' != localStorage.getItem('user_type')){
        this.isAdmin = false;
      } else {
        this.isAdmin = true;
      }
    }
    return this.isAdmin;
  }

  is_Admin() {
    //console.log("aaaaaaaaaaaaaaaa");
    this.isAdmin = false;
    let access_token = localStorage.getItem('access_token');
    let refresh_token = localStorage.getItem('refresh_token');
    let user_type = localStorage.getItem('user_type');

    if (refresh_token) {
      if ('admin' == user_type){
        this.isAdmin = true;
      }
    }
    return this.isAdmin;
  }
}
