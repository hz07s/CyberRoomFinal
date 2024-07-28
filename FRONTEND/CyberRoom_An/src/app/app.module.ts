import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReservationComponent } from './reservation/reservation.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { CreditCardComponent } from './credit-card/credit-card.component';

import { UserManageComponent } from './user-manage/user-manage.component';
import { TransactionComponent } from './transaction/transaction.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReserveComponent } from './reserve/reserve.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminControlPanelComponent } from './admin-control-panel/admin-control-panel.component';
import { ConnectedUsersComponent } from './connected-users/connected-users.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MachineComponent } from './machine/machine.component';
import { AdminExtraComponent } from './admin-extra/admin-extra.component';
import { TariffComponent } from './tariff/tariff.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { EventsComponent } from './events/events.component';
import { PromotionComponent } from './promotion/promotion.component';
import { EventComponent } from './event/event.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    UserManageComponent,
    CreditCardComponent,
    ReservationComponent,
    TransactionComponent,
    HeaderComponent,
    FooterComponent,
    ReserveComponent,
    AdminHeaderComponent,
    AdminControlPanelComponent,
    ConnectedUsersComponent,
    AdminHomeComponent,
    AdminDashboardComponent,
    MachineComponent,
    AdminExtraComponent,
    TariffComponent,
    UnauthorizedComponent,
    PromotionsComponent,
    EventsComponent,
    PromotionComponent,
    EventComponent,
    PaymentComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }