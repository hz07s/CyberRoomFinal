import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Promotion } from './../models/promotion';
@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  private apiUrl = `${environment.apiBaseUrl}/promotion`;
  constructor(private http: HttpClient) { }
  getPromotions(): Observable<Promotion[]>{
    return this.http.get<any[]>(this.apiUrl + '/list/');
  }

  createPromotions(promotion: Promotion): Observable<Promotion>{
    return this.http.post<Promotion>(this.apiUrl + '/create/', promotion);
  }

  deletePromotion(id: number): Observable<any> {
    const url = `${this.apiUrl + '/delete/'}${id}/`;
    return this.http.delete(url);
  }
  updatePromotion(promotion: Promotion): Observable<Promotion> {
    const url = `${this.apiUrl + '/update/'}${promotion.id}/`;
    return this.http.put<Promotion>(url, promotion);
  }
}
