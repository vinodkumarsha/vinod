import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { User } from '../user/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  users: User;
  isLoggedIn$: Observable<boolean>; 

  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.appService.isLoggedIn;

    this.appService.apiData$.subscribe(data=> {
      this.users = data;
      if(!(typeof this.users!='undefined' && this.users)){
        console.log("Inside header :" + this.users)
      }else{
        console.log("Inside header name fail");
      }
    });


    if(this.isLoggedIn$){
      localStorage.getItem("user");
    }
  }

  logout(){
    this.appService.logout();
    this.router.navigate(['']);
  }

}
