import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './services/role-guard.service';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { UserManageComponent } from './user-manage/user-manage.component';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { TariffComponent } from './tariff/tariff.component';
//import { MachineComponent } from './machine/machine.component';
import { ReservationComponent } from './reservation/reservation.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ReserveComponent } from './reserve/reserve.component';
import { MachineComponent } from './machine/machine.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { PromotionComponent } from './promotion/promotion.component';
import { EventsComponent } from './events/events.component';
import { EventComponent } from './event/event.component';


const routes: Routes = [
    // HOME
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},

    // USER
    { path: 'login', component: UserComponent },  // Ruta para el login del usuario
    { path: 'register', component: UserComponent }, // Ruta para el resgistro del usuario
    { path: 'user/edit', component: UserComponent }, // Ruta para editar los datos del usuario

    // USER MANAGE
    { path: 'manage/users', component: UserManageComponent, canActivate: [RoleGuard], data: { expectedRoles: ['admin']}},
    { path: 'manage/users/new', component: UserManageComponent, canActivate: [RoleGuard], data: { expectedRoles: ['admin']}}, // Ruta para crear nuevo usuario
    { path: 'manage/users/:id/edit', component: UserManageComponent, canActivate: [RoleGuard], data: { expectedRoles: ['admin']}}, // Ruta para editar usuario por ID
    { path: 'manage/users/:id/delete', component: UserManageComponent, canActivate: [RoleGuard], data: { expectedRoles: ['admin']}}, // Ruta para eliminar usuario por ID
    { path: 'manage/users/:id', component: UserManageComponent, canActivate: [RoleGuard], data: { expectedRoles: ['admin']}}, // Ruta para ver detalles de usuario por ID

    // RESERVATION
    { path: 'reserve', component: ReserveComponent, canActivate: [RoleGuard], data: { expectedRoles: ['admin', 'employee', 'client']}},
    { path: 'reservations', component: ReservationComponent, canActivate: [RoleGuard], data: { expectedRoles: ['admin']}},
    { path: 'reservations/new', component: ReservationComponent, canActivate: [RoleGuard], data: { expectedRoles: ['admin']}}, // Ruta para crear nueva reserva
    { path: 'reservations/:id/edit', component: ReservationComponent, canActivate: [RoleGuard], data: { expectedRoles: ['admin']}}, // Ruta para editar reserva por ID
    { path: 'reservations/:id', component: ReservationComponent, canActivate: [RoleGuard], data: { expectedRoles: ['admin']}}, // Ruta para ver detalles de reserva por ID
    // { path: '**', component: ReservationComponent } // Manejo de rutas no encontradas
    
    // CREDITCARD
    { path: 'creditcard', component: CreditCardComponent },
    
    // TARIFF
    { path: 'tariff', component: TariffComponent },
    
    // MACHINE
    { path: 'machine', component: MachineComponent },
    
    // TRANSACTION
    { path: 'transaction', component: TransactionComponent },
    
    // PROMOTIONS
    { path: 'promotions', component: PromotionsComponent },
    { path: 'promotion', component: PromotionComponent },


    // EVENTS
    { path: 'events', component: EventsComponent },
    { path: 'event', component: EventComponent },

    // UNAUTHORIZED
    
    { path: 'unauthorized', component: UnauthorizedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
