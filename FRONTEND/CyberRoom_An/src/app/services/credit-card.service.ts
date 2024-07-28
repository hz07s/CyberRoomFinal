import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  private apiBaseUrl = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) { }

  getCreditCards(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/CyberManage/credit-card/list/`);
  }

  createCreditCard(creditCard: any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/CyberManage/credit-card/create/`, creditCard);
  }

  updateCreditCard(id: number, creditCard: any): Observable<any> {
    return this.http.put(`${this.apiBaseUrl}/CyberManage/credit-card/update/${id}/`, creditCard);
  }

  deleteCreditCard(id: number): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/CyberManage/credit-card/delete/${id}/`);
  }
}
