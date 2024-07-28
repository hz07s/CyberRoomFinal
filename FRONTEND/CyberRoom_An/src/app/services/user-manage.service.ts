// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserManageService {
//   private apiBaseUrl = `${environment.apiBaseUrl}`;

//   constructor(private http: HttpClient) { }

//   getUsers(): Observable<any> {
//     return this.http.get(`${this.apiBaseUrl}/user-manage/list/`);
//   }

//   createUser(user: any): Observable<any> {
//     return this.http.post(`${this.apiBaseUrl}/user-manage/create/`, user);
//   }

//   updateUser(id: number, user: any): Observable<any> {
//     return this.http.put(`${this.apiBaseUrl}/user-manage/update/${id}/`, user);
//   }

//   deleteUser(id: number): Observable<any> {
//     return this.http.delete(`${this.apiBaseUrl}/user-manage/delete/${id}/`);
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserManageService {
  private apiBaseUrl = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/user-manage/list/`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/user-manage/create/`, user);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiBaseUrl}/user-manage/update/${id}/`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/user-manage/delete/${id}/`);
  }
}