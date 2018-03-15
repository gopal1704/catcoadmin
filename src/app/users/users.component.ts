import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  //
  users: any;

  //
  constructor(private ds: DataService) { }

  ngOnInit() {

    var users = this.ds.get_users().subscribe(v => {
      console.log(v);
      this.users = v;
      
    });

  }


}
