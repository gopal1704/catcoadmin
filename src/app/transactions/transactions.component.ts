import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {


  //
  transactions : any;

  constructor(private ds: DataService) { }

  ngOnInit() {

    var transactions = this.ds.get_transactions().subscribe(v => {
      console.log(v);
      this.transactions = v;
      
    });
  }

  converttimestamp(ts){
    var d = new Date(ts);
    return d.toLocaleString();
    // return  d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() + '--' + d.getHours() + ':' +d.getMinutes();
    
    }
}
