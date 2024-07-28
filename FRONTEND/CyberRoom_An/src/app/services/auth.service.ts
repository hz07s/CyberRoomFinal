import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}`;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/CyberManage/login/`, credentials).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
        this.getProfile().subscribe();
      })
    );
  }

  logout(): void {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      });
      this.http.post<any>(`${this.apiUrl}/CyberManage/logout/`, { refresh_token: refreshToken }, { headers }).subscribe(
        () => {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          this.currentUserSubject.next(null);
        },
        (error) => {
          console.error('Logout error:', error);
        }
      );
    }
  }

  getProfile(): Observable<User> {
    const token = localStorage.getItem('access_token');
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      return this.http.get<User>(`${this.apiUrl}/CyberManage/profile/`, { headers }).pipe(
        tap(user => this.currentUserSubject.next(user))
      );
    } else {
      return new Observable(observer => {
        observer.error('No access token found');
      });
    }
  }
}
