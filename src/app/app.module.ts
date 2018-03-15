import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { UseraccountsComponent } from './useraccounts/useraccounts.component';
import { InvestmentsComponent } from './investments/investments.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { WithdrawalrequestsComponent } from './withdrawalrequests/withdrawalrequests.component';
import { AddwalletbalanceComponent } from './addwalletbalance/addwalletbalance.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminloginComponent,
    DashboardComponent,
    UsersComponent,
    UseraccountsComponent,
    InvestmentsComponent,
    TransactionsComponent,
    WithdrawalrequestsComponent,
    AddwalletbalanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
