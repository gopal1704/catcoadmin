import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit {
investments : any;
  constructor(private ds: DataService) { }

  ngOnInit() {


  var investments = this.ds.get_investments().subscribe(v => {
      console.log(v);
      this.investments = v;
      
    });

    
  }


  converttimestamp(ts){
    var d = new Date(ts);
    return d.toLocaleString();
    // return  d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() + '--' + d.getHours() + ':' +d.getMinutes();
    
    }
    calculateenddate(ts,days){
      var d = new Date(ts);
      d.setDate(d.getDate()+ parseInt(days));
      return this.converttimestamp(d);
       }

}
