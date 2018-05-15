import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { CornjobComponent } from './cornjob/cornjob.component';


const routes: Routes = [

  {path : '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component :AdminloginComponent },
  {path: 'dashboard', component :DashboardComponent,
children :[
  {path : '', redirectTo: '/dashboard/users', pathMatch: 'full' },
  { path : 'users' , component : UsersComponent },
    { path : 'useraccounts' , component : UseraccountsComponent},
    { path : 'investments' , component :InvestmentsComponent },
    { path : 'transactions' , component : TransactionsComponent},
    { path : 'withdrawalrequests' , component : WithdrawalrequestsComponent },
    { path : 'addwalletbalance' , component : AddwalletbalanceComponent },
    { path : 'editprofile/:id' , component : EditprofileComponent },
    { path : 'viewprofile/:id' , component : ViewprofileComponent },
    { path : 'corn' , component : CornjobComponent },

    
    

 
]

}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {



 }
