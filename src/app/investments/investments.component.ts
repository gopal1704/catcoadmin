import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit {
investments : any;
usersearchForm : FormGroup;

  constructor(private ds: DataService,private fb: FormBuilder,private afs: AngularFirestore) { 

  }

  ngOnInit() {
    this.usersearchForm = this.fb.group({
      'search': '',
      'type': '',
      'from':'',
      'to' : ''
      

    });

  var investments = this.ds.get_investments().subscribe(v => {
      console.log(v);
      this.investments = v;
      
    });

    
  }


  converttimestamp(ts){
    var d = new Date(ts);
    return d.toLocaleDateString();
    // return  d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() + '--' + d.getHours() + ':' +d.getMinutes();
    
    }
    calculateenddate(ts,days){
      var d = new Date(ts);
      d.setDate(d.getDate()+ parseInt(days));
      return this.converttimestamp(d);
       }

search(formdata){
console.log(formdata);
if((formdata.from!="")&&(formdata.to!="")&&(formdata.type==""))
{
var invest = this.afs.collection('investments', ref => {
  return ref.where("timestamp", ">=", new Date(formdata.from)).where("timestamp", "<=", new Date(formdata.to));
});

invest.valueChanges().subscribe((v)=>{
this.investments = v;

});


}

if((formdata.type!=="")&&(formdata.from=="")&&(formdata.to =="")){

if(formdata.type == "name")
{
  var invest = this.afs.collection('investments', ref => {
    return ref.where('name' , '==' ,formdata.search);
  });
  
  invest.valueChanges().subscribe((v)=>{
  this.investments = v;
  });

}

if(formdata.type == "uid"){

  var invest = this.afs.collection('investments', ref => {
    return ref.where('uid' , '==' ,formdata.search);
  });
  
  invest.valueChanges().subscribe((v)=>{
  this.investments = v;
  });
}

if(formdata.type == "rid"){
  
  var invest = this.afs.collection('investments', ref => {
    return ref.where('referralid' , '==' ,formdata.search);
  });
  
  invest.valueChanges().subscribe((v)=>{
  this.investments = v;
  });
}

}

if((formdata.type!=="")&&(formdata.from!="")&&(formdata.to !="")){

  if(formdata.type == "name")
{
  var invest = this.afs.collection('investments', ref => {
    return ref.where('name' , '==' ,formdata.search).where("timestamp", ">=", new Date(formdata.from)).where("timestamp", "<=", new Date(formdata.to));
  });
  
  invest.valueChanges().subscribe((v)=>{
  this.investments = v;
  });

}
if(formdata.type == "uid"){
  var invest = this.afs.collection('investments', ref => {
    return ref.where('uid' , '==' ,formdata.search).where("timestamp", ">=", new Date(formdata.from)).where("timestamp", "<=", new Date(formdata.to));
  });
  
  invest.valueChanges().subscribe((v)=>{
  this.investments = v;
  });

}

if(formdata.type == "rid"){
  var invest = this.afs.collection('investments', ref => {
    return ref.where('referralid' , '==' ,formdata.search).where("timestamp", ">=", new Date(formdata.from)).where("timestamp", "<=", new Date(formdata.to));
  });
  
  invest.valueChanges().subscribe((v)=>{
  this.investments = v;
  });
}
  
  
  
  }



}

      


}



