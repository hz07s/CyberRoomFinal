import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

    private apiUrl = `${environment.apiBaseUrl}`;

    constructor(private http: HttpClient) { }

    getTransaction(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + '/CyberManage/transaction/list')
    }

    createTransaction(transaction: Transaction): Observable<Transaction> {
        return this.http.post<Transaction>(this.apiUrl + '/CyberManage/transaction/create', transaction);
    }

    updateTransaction(transaction: Transaction): Observable<Transaction> {
        const url = `${this.apiUrl + '/CyberManage/transaction/update/'}${transaction.id}`;
        return this.http.put<Transaction>(url, transaction);
    }

    deleteTransaction(id: number): Observable<any> {
        const url = `${this.apiUrl + '/CyberManage/transaction/delete/'}${id}`;
        return this.http.delete<any>(url);
    }
}
