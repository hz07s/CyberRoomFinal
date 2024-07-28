export interface Reservation{
    id: number;
    idUser: number;
    idMachine: number;
    startTime: Date;
    endTime: Date;
    cost: number;
    reservationStatus: string; // Valor por defecto
}