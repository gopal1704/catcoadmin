import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StringLike } from '@firebase/util/dist/esm/src/errors';
import { AngularFireAuth, AngularFireAuthProvider } from 'angularfire2/auth';
import { DataService } from '../data.service';

declare var $ : any;
declare var Messenger: any;

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
email : string;
password : string;
public loading = false;
passwordresetemail : string;


  constructor(private router: Router, private afAuth: AngularFireAuth, private ds: DataService) { }

  ngOnInit() {
  }
  
// Login(){
//   this.loading = true;
// if((this.email==="info@catcotrade.info")&&(this.password==="catcotrade2000")){
//   setTimeout(()=> {
// this.loading = false;
//     this.router.navigate(['/dashboard']);
//   }, 2500);

// }
// else{
//   Messenger().post({
//     message: 'Error loggin in : Incorrect Email or Password',
//     type: 'error',
//     showCloseButton: true
//   });

// }


// }

//login
//
sendpasswordreset(){
  this.afAuth.auth.sendPasswordResetEmail(this.passwordresetemail).then(()=>{
    Messenger().post({
      message: 'Password reset email sent',
      type: 'error',
      showCloseButton: true
    });
  }).catch(()=>{
    Messenger().post({
      message: 'Error sending password reset email',
      type: 'error',
      showCloseButton: true
    });
  });
}



Login() {
  this.loading = true;

 if(this.email=="info@catcotrade.info") //
{
  this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
    .then(value => {
this.ds.logged_in=true;
      this.router.navigate(['/dashboard']);
      

    })
    .catch(err => {
console.log(err);
      this.loading = false;
      Messenger().post({
        message: 'Error loggin in : Incorrect Email or Password',
        type: 'error',
        showCloseButton: true
      });
      console.log('Something went wrong: ', err.message);
      return false;
    });

  }else{
    this.loading = false;

    Messenger().post({
      message: 'Error loggin in : Email is not admin email',
      type: 'error',
      showCloseButton: true
    });
  }

}


//

}
