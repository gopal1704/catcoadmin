import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cornjob',
  templateUrl: './cornjob.component.html',
  styleUrls: ['./cornjob.component.css']
})
export class CornjobComponent implements OnInit {
  public investments_corn: any;
  public usersearchForm: FormGroup;
  constructor(private http: HttpClient, private ds: DataService, private fb: FormBuilder, private afs: AngularFirestore) { }

  ngOnInit() {
    this.usersearchForm = this.fb.group({
      'search': '',
      'type': '',
      'from': '',
      'to': ''


    });

    var investments = this.ds.get_investments_corn().subscribe(v => {
      console.log(v);
      this.investments_corn = v;

    });



  }

  converttimestamp(ts) {
    var d = new Date(ts);
    return d.toLocaleDateString();
    // return  d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() + '--' + d.getHours() + ':' +d.getMinutes();

  }
  calculateenddate(ts, days) {
    var d = new Date(ts);
    d.setDate(d.getDate() + parseInt(days));
    return this.converttimestamp(d);
  }

  send_first_bonus(id) {
    var txt;
    var r = confirm("confirm");
    if (r == true) {

      //
      console.log(id);

      this.http.post('https://catcotrade.com/firstmonth', { id: id }).subscribe(res => {
        alert(res);

      });
      //

    } else {
    }




  }
  send_second_bonus(id) {
    console.log(id);

    var txt;
    var r = confirm("confirm");
    if (r == true) {

      //
      console.log(id);

      this.http.post('https://catcotrade.com/secondmonth', { id: id }).subscribe(res => {
        alert(res);

      });
      //

    } else {
    }

  }
  send_third_bonus(id) {
    console.log(id);
    var txt;
    var r = confirm("confirm");
    if (r == true) {

      //
      console.log(id);

      this.http.post('https://catcotrade.com/thirdmonth', { id: id }).subscribe(res => {
        alert(res);

      });
      //

    } else {
    }

  }
  final(id){

    console.log(id);
    var txt;
    var r = confirm("confirm");
    if (r == true) {

      //
      console.log(id);

      this.http.post('https://catcotrade.com/final', { id: id }).subscribe(res => {
        alert(res);

      });
      //

    } else {
    }


  }
  search(formdata) {
    console.log(formdata);
    if ((formdata.from != "") && (formdata.to != "") && (formdata.type == "")) {
      var invest = this.afs.collection('investments', ref => {
        return ref.where("timestamp", ">=", new Date(formdata.from)).where("timestamp", "<=", new Date(formdata.to));
      });

      invest.valueChanges().subscribe((v) => {
        this.investments_corn = v;

      });


    }

    if ((formdata.type !== "") && (formdata.from == "") && (formdata.to == "")) {

      if (formdata.type == "name") {
        var invest = this.afs.collection('investments', ref => {
          return ref.where('name', '==', formdata.search);
        });

        invest.valueChanges().subscribe((v) => {
          this.investments_corn = v;
        });

      }

      if (formdata.type == "uid") {

        var invest = this.afs.collection('investments', ref => {
          return ref.where('uid', '==', formdata.search);
        });

        invest.valueChanges().subscribe((v) => {
          this.investments_corn = v;
        });
      }

      if (formdata.type == "rid") {

        var invest = this.afs.collection('investments', ref => {
          return ref.where('referralid', '==', formdata.search);
        });

        invest.valueChanges().subscribe((v) => {
          this.investments_corn = v;
        });
      }

    }

    if ((formdata.type !== "") && (formdata.from != "") && (formdata.to != "")) {

      if (formdata.type == "name") {
        var invest = this.afs.collection('investments', ref => {
          return ref.where('name', '==', formdata.search).where("timestamp", ">=", new Date(formdata.from)).where("timestamp", "<=", new Date(formdata.to));
        });

        invest.valueChanges().subscribe((v) => {
          this.investments_corn = v;
        });

      }
      if (formdata.type == "uid") {
        var invest = this.afs.collection('investments', ref => {
          return ref.where('uid', '==', formdata.search).where("timestamp", ">=", new Date(formdata.from)).where("timestamp", "<=", new Date(formdata.to));
        });

        invest.valueChanges().subscribe((v) => {
          this.investments_corn = v;
        });

      }

      if (formdata.type == "rid") {
        var invest = this.afs.collection('investments', ref => {
          return ref.where('referralid', '==', formdata.search).where("timestamp", ">=", new Date(formdata.from)).where("timestamp", "<=", new Date(formdata.to));
        });

        invest.valueChanges().subscribe((v) => {
          this.investments_corn = v;
        });
      }



    }



  }




}
