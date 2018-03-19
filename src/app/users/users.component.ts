import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
declare var Messenger: any;

declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  //
  users: any;
  usersearchForm : FormGroup;
  approval : any;
  approvalid : any;
  //
  constructor(private ds: DataService,private fb: FormBuilder,private afs: AngularFirestore) { }

  ngOnInit() {
    this.usersearchForm = this.fb.group({
      'search': '',
      'type': '',
      

    });

    var users = this.ds.get_users().subscribe(v => {
      console.log(v);
      this.users = v;
      
    });

  }
  search(formdata){
console.log(formdata);
if(formdata.type=="name"){

  var users = this.afs.collection('users', ref => {
    return ref.where('displayname', '==', formdata.search);
  });

  users.valueChanges().subscribe((v)=>{
  this.users = v;

  })
}

if(formdata.type=="email"){

  var users = this.afs.collection('users', ref => {
    return ref.where('email', '==', formdata.search);
  });

  users.valueChanges().subscribe((v)=>{
  this.users = v;

  })
}
if(formdata.type=="mobile"){

  var users = this.afs.collection('users', ref => {
    return ref.where('mobile', '==', parseInt(formdata.search));
  });

  users.valueChanges().subscribe((v)=>{
  this.users = v;

  })
}
if(formdata.type=="id"){

  var users = this.afs.collection('users', ref => {
    return ref.where('uid', '==', formdata.search);
  });

  users.valueChanges().subscribe((v)=>{
  this.users = v;

  })
}

  }

 cc(ts){

        
        var d = new Date(ts);
       // return d.toLocaleString();
         return  d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
        
        }
        a(name,id){
          this.approval = name;
          this.approvalid = id;
          $('#approval').modal({show:true});

        }
      
approve(){
  console.log(this.approvalid);
  const usersummaryref: AngularFirestoreDocument<any> = this.afs.doc(`accountsummary/${this.approvalid}`); //get the refrence for updating initial user data
usersummaryref.update({
  approvalstatus : "approved"
}).then(()=>{
  Messenger().post({
    message: `user ${this.approval} approved!`,
    type: 'success',
    showCloseButton: true
  });
}).catch(()=>{

  Messenger().post({
    message: 'error in approval please try again',
    type: 'success',
    showCloseButton: true
  });
});





}
}
