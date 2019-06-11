import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { User } from './user.model';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User;
  userDetails: User;
  errorMessage:string;
  selectedUser: User;
  isLoggedIn$: Observable<boolean>; 
  
  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
        //this.getLoginData();
        this.getUserDetails();
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

  getUserDetails(){
    this.appService.getAllUser().subscribe(data=>{
      //this.users = data;
       this.userDetails = data;
      }, err => this.errorMessage = <any> err
    );
  }

  onSelect(user: User): void{
    this.selectedUser = user;
  }

  delete(user: User){
    console.log("inside delete");
    this.appService.deleteUser(user).then((result:boolean) =>{
      console.log("Result : "+ result.valueOf());
      this.getUserDetails();
    });
  }

edit(user: User){
  console.log("Inside edit");
  this.appService.edit(user);
  this.router.navigate(['register']);
}


}
