import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { LoadingModule } from 'ngx-loading';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule, AngularFireStorage} from 'angularfire2/storage';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { DataService } from './data.service';


import { AppComponent } from './app.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { UseraccountsComponent } from './useraccounts/useraccounts.component';
import { InvestmentsComponent } from './investments/investments.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { WithdrawalrequestsComponent } from './withdrawalrequests/withdrawalrequests.component';
import { AddwalletbalanceComponent } from './addwalletbalance/addwalletbalance.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';
var config = {
  apiKey: "AIzaSyDZctYRBSTRhuIjDsPP-j7ide7LrlHjf4o",
  authDomain: "investment-3327a.firebaseapp.com",
  databaseURL: "https://investment-3327a.firebaseio.com",
  projectId: "investment-3327a",
  storageBucket: "investment-3327a.appspot.com",
  messagingSenderId: "242794674827"
};

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
    AddwalletbalanceComponent,
    EditprofileComponent,
    ViewprofileComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoadingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
