export interface Transaction {
  id: number;
  idReservation: number;
  idUser: number;
  idMachine: number;
  idProduct: number;
  amount: number;
  transactionDate: Date;
  transactionStatus: string;
}