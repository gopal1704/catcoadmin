import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-useraccounts',
  templateUrl: './useraccounts.component.html',
  styleUrls: ['./useraccounts.component.css']
})
export class UseraccountsComponent implements OnInit {
  useraccounts : any;
  constructor(private ds: DataService) {

   }

  ngOnInit() {
    var users = this.ds.get_user_accounts().subscribe(v => {
      console.log(v);
      this.useraccounts = v;
      
    });

  }
  converttimestamp(ts){
    var d = new Date(ts);
    return d.toLocaleString();
    // return  d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() + '--' + d.getHours() + ':' +d.getMinutes();
    
    }

}
