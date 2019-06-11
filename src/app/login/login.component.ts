import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { User } from '../user/user.model';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  user: User = new User();
  message:string;
  users: User[];
  loggedIn: Observable<boolean>;
  constructor(private router: Router, private apiService: AppService) { }
  

  ngOnInit() {
  }

  login() {
    console.log("Email in Firt login method: " + this.email);
    this.apiService.login(this.email, this.password).subscribe(data => {
      this.users = data;
      console.log("Test: " + this.users);
     
      this.apiService.setLogin(this.users);
      localStorage.setItem("user", this.email);
      this.router.navigate(['dashboard']);      
    }, err => {
      console.log("Inside login failed>>");
      this.message = "Unable to process your request";
      this.apiService.logout();     
     });
  }
}
