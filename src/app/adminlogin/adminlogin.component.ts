import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StringLike } from '@firebase/util/dist/esm/src/errors';
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

  constructor(private router: Router) { }

  ngOnInit() {
  }
Login(){
  this.loading = true;
if((this.email==="info@catcotrade.info")&&(this.password==="catcotrade2000")){
  setTimeout(()=> {
this.loading = false;
    this.router.navigate(['/dashboard']);
  }, 2500);

}else{
  Messenger().post({
    message: 'Error loggin in : Incorrect Email or Password',
    type: 'error',
    showCloseButton: true
  });

}


}
}
