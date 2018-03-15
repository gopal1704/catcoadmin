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

  }
  //////////

  /////////
  get_investments() {

  }
  //////////
  get_withdrawal_requests(){

  }
//////////


}
