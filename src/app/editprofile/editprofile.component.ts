import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import {HttpClient} from '@angular/common/http';
import { DataService } from '../data.service';
declare var Messenger: any;

declare var moment : any;
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
 
  id : string;
  CountryCodes : any;
  CountryCodesList : any;
  Profile : any;
  public loading : boolean = false;
  dob : any;
  gender : any;
  country : any;
  isdcode : any;
  mobile : any;
  address :any;
  city : any;
uid : any;
firstname : any;
lastname : any;
title : any;
  constructor( private router: Router,private route: ActivatedRoute,private http : HttpClient,private ds: DataService) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.id = params.id);
    console.log(this.id);
    this.CountryCodes = this.http.get('../../assets/CC.json');
    this.CountryCodes.subscribe((v)=>{
      this.CountryCodesList = v;
      console.log(v)});

      this.Profile= this.ds.get_profile_info(this.id).valueChanges();

      this.Profile.subscribe((v)=>{

        console.log(v.mobile);
      this.country = v.country;
      this.mobile = v.mobile;
      
      this.gender = v.gender;
      this.isdcode = v.isdcode;
      this.address = v.address;
      this.dob = this.cdob(v.dob);
      this.city = v.city;
      this.uid = v.uid;
      this.firstname = v.displayname;
      this.lastname = v.lastname;
      this.title = v.title;
      })





  }

  onchangecountry(value){
    console.log(value);
    
    for(var i=0;i<this.CountryCodesList.length;i++){
      
    if(this.CountryCodesList[i].name === value){
      console.log(this.CountryCodesList[i].dial_code);
      this.isdcode = this.CountryCodesList[i].dial_code;
    }
    
    
    }
      }

  cdob(d){
   var dd= new Date(d);
return moment(d).format('YYYY-MM-DD');
  }



}
