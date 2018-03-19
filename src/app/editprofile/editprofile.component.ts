import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import {HttpClient} from '@angular/common/http';
import { DataService } from '../data.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

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
  constructor( private router: Router,private route: ActivatedRoute,private http : HttpClient,private ds: DataService,private afs: AngularFirestore) { }

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
      
    if(this.CountryCodesList[i].name == value){
      console.log('aaa');
      console.log(this.CountryCodesList[i].dial_code);
      this.isdcode = this.CountryCodesList[i].dial_code;
    }
    
    
    }
      }

  cdob(d){
   var dd= new Date(d);
return moment(d).format('YYYY-MM-DD');
  }
  UpdateProfile(){
    this.loading = true;
    console.log(this.gender);
    console.log(this.country);
    console.log(this.dob);
    const userprofileref: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.uid}`); //get the refrence for updating initial user data
    const usersummaryref: AngularFirestoreDocument<any> = this.afs.doc(`accountsummary/${this.uid}`); //get the refrence for updating initial user data

    userprofileref.update({
    displayname : this.firstname,
    lastname : this.lastname,
    title:this.title,
      dob: this.dob,
      gender : this.gender, 
      country : this.country,
      isdcode : this.isdcode,
      mobile : this.mobile,
      address : this.address,

      city: this.city

    }).then(()=>{
      usersummaryref.update({
        name : this.title +' '+this.firstname+' '+this.lastname
      });
this.loading = false;
      Messenger().post({
        message: 'Profile updated successfull!',
        type: 'success',
        showCloseButton: true
      });
    }).catch(e=>{
console.log(e);
this.loading = false;
      Messenger().post({
        message: 'error updating profile',
        type: 'success',
        showCloseButton: true
      });
    });
   

  }






}
