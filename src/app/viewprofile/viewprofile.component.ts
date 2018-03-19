import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewprofileComponent implements OnInit {
Profile : any;
id : any;  
constructor(private ds : DataService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {this.id = params.id;
      this.Profile= this.ds.get_profile_info(this.id).valueChanges();

    });


  }

  converttimestampdob(ts){
    var d = new Date(ts);
   // return d.toLocaleString();
     return  d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
    
    }
    converttimestamp(ts){
      var d = new Date(ts);
      return d.toLocaleString();
      // return  d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() + '--' + d.getHours() + ':' +d.getMinutes();
      
      }
}
