import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'app-addwalletbalance',
  templateUrl: './addwalletbalance.component.html',
  styleUrls: ['./addwalletbalance.component.css']
})
export class AddwalletbalanceComponent implements OnInit {

/***FORM DECLARATIONS */
WalletTransferForm: FormGroup;  // From Group Instance
amountlimit:number =  1;
walletbalance : number = 0;
proceed : boolean = false;
amount : number = 0;
accountstatus : boolean  = false;
amountstatus : boolean = false;
/******************/
Accountname : any;

  constructor(private ds :DataService ,    private afs: AngularFirestore,
    private fb: FormBuilder) { 
      this.WalletTransferForm = fb.group({
        'amount': '',
        'toaccount': '',
  
      });
    }

  ngOnInit() {


  }

  onSearchChange(value : string){
    if(value && value!=""){
        //get name 
        var name =this.afs.doc<any>(`accountsummary/${value}`).valueChanges();
          
    name.subscribe((v)=>{
      if(v){
      this.Accountname = 'Transfer to : '+ v.name;
     this.accountstatus = true;
     this.proceed = true;
    
    }
      else{  this.Accountname = 'Account does not exist';
      this.accountstatus = false;
      this.proceed = false;
    }
    }),err=>{
      this.Accountname = 'Account does not exist';
      this.proceed = false;

    }
    
    
    
    }
    else{
      this.proceed = false;
    }
      }
    

  confirmwallettransfer(formdata){
this.proceed = false;
    console.log(formdata);

    if((formdata.amount!="")&&(formdata.amount>0 )&&(formdata.amount!=null)){
this.ds.transfer_to_wallet(formdata.amount,formdata.toaccount,this.Accountname);
    }
      }

}
