import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../models/transaction';

@Component({
    selector: 'app-transaction',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

    transaction: Transaction = {
        id: 1,
        idReservation: 0,
        idUser: 0,
        idMachine: 0,
        idProduct: 0,
        amount: 0,
        transactionDate: new Date(),
        transactionStatus: '',
    }
    transactions: any[] =[];
    showForm: boolean = false;
    selectedTransaction: Transaction | null = null;

    constructor(private transactionService: TransactionService) { }

    ngOnInit(): void {
        this.fechTransactions();
    }

    viewUpdate(transaction: Transaction): void {
        this.selectedTransaction = {...transaction};
        this.showForm = true;
    }

    fechTransactions() {
        this.transactionService.getTransaction().subscribe(res => {
            this.transactions = res;
        }, (error) => {
            console.error('Error obteniendo las transacciones', error);
        });
    }

    createTransaction(): void {
        this.transactionService.createTransaction(this.transaction).subscribe((res) => {
            console.log('Transaccion creada: ', res);
            this.fechTransactions();
        }, (error) => {
            console.error('Error al crear la transaccion: ', error);
        });
    }

    updateTransaction(transaction: Transaction): void {
    if (this.transactionService) {
        this.transactionService.updateTransaction(this.transaction).subscribe(() => {
            console.log('Transaccion actualizada exitosamente.');
            this.fechTransactions();
            this.showForm = false;
            this.selectedTransaction = null;
            }, (error) => {
            console.error('Error al actualizar la transaccion:', error);
            });
    } else {
        console.error('No hay ninguna transaccion seleccionada para actualizar');
    }
  }

    deleteTransaction(id: number): void {
        this.transactionService.deleteTransaction(id).subscribe(() => {
            console.log(`Transaccion con ID ${id} eliminado`);
            this.fechTransactions();
            this.showForm = false;
        }, (error) => {
            console.error('Error al actualizar la transaccion: ', error);
        });
    }

}
