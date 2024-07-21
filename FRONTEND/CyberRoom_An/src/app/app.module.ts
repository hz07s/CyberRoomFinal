import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminControlPanelComponent } from './admin-control-panel/admin-control-panel.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdeminHeaderComponent } from './ademin-header/ademin-header.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { ConnectedUsersComponent } from './connected-users/connected-users.component';
import { TransactionComponent } from './transaction/transaction.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminControlPanelComponent,
    AdminDashboardComponent,
    AdeminHeaderComponent,
    AdminHeaderComponent,
    ConnectedUsersComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
