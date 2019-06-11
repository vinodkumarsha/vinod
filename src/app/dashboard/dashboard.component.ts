import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { User } from '../user/user.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: User;
  errorMessage:string;
  isLoggedIn$: Observable<boolean>; 
  selectedUser:User;

  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
    this.getLoginData();
    this.isLoggedIn$ = this.appService.isLoggedIn;
  }

  getLoginData(){
    console.log("Inside getLoginData in UserComponent");
    this.appService.apiData$.subscribe(data=> {
    this.users = data;
     
      if(!(typeof this.users!='undefined' && this.users)){
        console.log("Inside if of getLoginData");
        this.appService.getAllUser().subscribe(data=>{
          this.users = data;
        });
      }else{
        console.log("Inside else");
      }
      //console.log("Inside User : "+this.users.email)
    }, err => this.errorMessage = <any> err
    );
    /*  this.appService.getUsers().subscribe(
      data => {
        this.users = data});*/
  }

  onSelect(user: User): void{
    this.selectedUser = user;
  }

}
