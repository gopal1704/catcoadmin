import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {


  //
  transactions : any;
  usersearchForm : FormGroup;

  constructor(private ds: DataService,private fb: FormBuilder,private afs: AngularFirestore) { }

  ngOnInit() {

    this.usersearchForm = this.fb.group({
      'search': '',
      'type': '',
      'ttype' : '',
      'from':'',
      'to' : ''
      

    });

    var transactions = this.ds.get_transactions().subscribe(v => {
      console.log(v);
      this.transactions = v;
      
    });
  }

  converttimestamp(ts){
    var d = new Date(ts);
    return d.toLocaleDateString();
    // return  d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() + '--' + d.getHours() + ':' +d.getMinutes();
    
    }

    search(formdata){

      console.log(formdata);
if((formdata.type=="")&&(formdata.from!="")&&(formdata.to!="")){
console.log('date');
  var invest = this.afs.collection('transactions', ref => {
    return ref.where("timestamp", ">=", new Date(formdata.from)).where("timestamp", "<=", new Date(formdata.to));
  });
  
  invest.valueChanges().subscribe((v)=>{
  this.transactions = v;
  
  });
}

if((formdata.type!="") && (formdata.ttype!="")){
  //if user id enter all fields
  var invest = this.afs.collection('transactions', ref => {
    return ref.where('uid', '==', formdata.search).where('type', '==', formdata.ttype).where("timestamp", ">=", new Date(formdata.from)).where("timestamp", "<=", new Date(formdata.to));
  });
  
  invest.valueChanges().subscribe((v)=>{
  this.transactions = v;
  
  });

}

if((formdata.type!="") && (formdata.ttype=="")){
  //if user id enter all fields
  var invest = this.afs.collection('transactions', ref => {
    return ref.where('uid', '==', formdata.search).where("timestamp", ">=", new Date(formdata.from)).where("timestamp", "<=", new Date(formdata.to));
  });
  
  invest.valueChanges().subscribe((v)=>{
  this.transactions = v;
  
  });

}


    }
}
