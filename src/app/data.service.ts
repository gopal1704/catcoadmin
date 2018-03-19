import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchmap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/take'
import { element } from 'protractor';
import { scan } from 'rxjs/operator/scan';
import { FirebaseApp } from 'angularfire2';
import { take } from 'rxjs/operator/take';
declare var Messenger: any;

interface Transaction {
  timestamp: any;
  uid: string;
  type: string;
  status: string;
  from: string;
  to: string;
  amount: number;
  debit: number;
  credit: number;
  narration: string;


}
@Injectable()
export class DataService {

  constructor(private afs: AngularFirestore) { }

  //////////
  get_users() {
    var users = this.afs.collection('users');
    var r = users.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() ;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });

return r;

  }
  //////////
  get_user_accounts() {
  
    var useraccounts = this.afs.collection('accountsummary');
    var r = useraccounts.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() ;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });

return r;


  }
  //////////
  get_transactions() {

    var transactions = this.afs.collection('transactions',ref=>{return ref.orderBy('timestamp','desc');});
    var r = transactions.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });

return r;

  }
  //////////

  /////////

  get_investments() {

    var inv = this.afs.collection('investments');
    var r = inv.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() ;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });

return r;

  }
  //////////

  get_profile_info(id){
    var itemdoc = this.afs.doc<any>(`users/${id}`);
    return itemdoc;
  }


  ///////////
  get_admin_withdrawal(){
    var adminw = this.afs.collection('withdrawalrequest');
    var r = adminw.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });

return r;
     
  }
//////////
approve_withdrawal_request(id,uid,amount,details){

  var transaction_referral: Transaction = {
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    uid: uid,
    type: 'WD',
    status: 'success',
    from: '',
    to: '',
    amount: 0,
    debit: amount,
    credit: 0,
    narration: `Withdrawal ${details}`
  };
  var reftrans = this.afs.collection('/transactions');
  const withdrawalr :AngularFirestoreDocument<any> = this.afs.doc(`withdrawalrequest/${id}`);
  const summaryref: AngularFirestoreDocument<any> = this.afs.doc(`accountsummary/${uid}`);

  withdrawalr.update({status:'approved'}).then((v)=>{
    reftrans.add(transaction_referral).then((v)=>{
      this.afs.doc<any>(`accountsummary/${uid}`).valueChanges().take(1).subscribe((v) => {

        summaryref.update({
          walletpendingbalance : v.walletpendingbalance - amount,
        }).then(()=>{
          return true;
        });

      });


    })
  });

}


  /***********WALLET TRANSFER*************** */
  transfer_to_wallet(amount, to_wallet,name) {
    
    var reftrans = this.afs.collection('/transactions');
    const toaccountsummaryref: AngularFirestoreDocument<any> = this.afs.doc(`accountsummary/${to_wallet}`);

    var transaction_to: Transaction = {
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      uid: to_wallet,
      type: 'CWT',
      status: 'success',
      from: 'admin',
      to: to_wallet,
      amount: 0,
      debit: 0,
      credit: amount,
      narration: `Credit Wallet Transfer  from : admin to ${name} ,id ${to_wallet}`
    };         

         

   
      reftrans.add(transaction_to).then(()=>{
        
//UPDATE SUMMARY DATA
this.afs.doc<any>(`accountsummary/${to_wallet}`).valueChanges().take(1).subscribe((v) => {

  toaccountsummaryref.update({
    walletbalance: v.walletbalance + parseInt(amount)
  }).then(()=>{
    Messenger().post({
      message: 'Wallet balance added successfuly',
      type: 'success',
      showCloseButton: true
    });
  }).catch(e=>{
    Messenger().post({
      message: 'Error please try again.',
      type: 'error',
      showCloseButton: true
    });
  })

});




      });////to





  } ////

}
