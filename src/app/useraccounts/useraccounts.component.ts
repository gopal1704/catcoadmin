import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'app-useraccounts',
  templateUrl: './useraccounts.component.html',
  styleUrls: ['./useraccounts.component.css']
})
export class UseraccountsComponent implements OnInit {
  usersearchForm : FormGroup;

  useraccounts : any;
  constructor(private ds: DataService,private fb: FormBuilder,private afs: AngularFirestore) {

   }

  converttimestamp(ts){
    var d = new Date(ts);
    return d.toLocaleString();
    // return  d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() + '--' + d.getHours() + ':' +d.getMinutes();
    
    }

    ngOnInit() {
      this.usersearchForm = this.fb.group({
        'search': '',
        'type': '',
        
  
      });
  
      var users = this.ds.get_user_accounts().subscribe(v => {
        console.log(v);
        this.useraccounts = v;
        
      });
  
    }
    search(formdata){
  console.log(formdata);
  if(formdata.type=="name"){
  
    var users = this.afs.collection('accountsummary', ref => {
      return ref.where('name', '==', formdata.search);
    });
  
    users.valueChanges().subscribe((v)=>{
    this.useraccounts = v;
  
    })
  }
  
  if(formdata.type=="uid"){
  
    var users = this.afs.collection('accountsummary', ref => {
      return ref.where('uid', '==', formdata.search);
    });
  
    users.valueChanges().subscribe((v)=>{
    this.useraccounts = v;
  
    })
  }
  if(formdata.type=="rid"){
  
    var users = this.afs.collection('accountsummary', ref => {
      return ref.where('referralid', '==', formdata.search);
    });
  
    users.valueChanges().subscribe((v)=>{
    this.useraccounts = v;
  
    })
  }
  
  
    }

}
