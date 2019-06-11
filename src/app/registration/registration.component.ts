import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { User } from '../user/user.model';
import { Router } from '@angular/router';
import { FormsModule, FormGroup , FormControl } from '@angular/forms';
import { UserComponent } from '../user/user.component';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  
  user: User = new User();
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  message: string;
  userDetails:User;
  users = [];
  selectedGender: string;
  selectedCity : string;
  gender: string;
  city: string;

  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
    console.log("Inside reg Init");
    this.getGenders();
    this.getCity();
    
    if(this.appService.selectedUserData$){
      console.log("Inside reg true");
      this.appService.selectedUserData$.subscribe(res => {
        this.userDetails = res;
        if(typeof this.userDetails!='undefined' && this.userDetails){
          this.email = this.userDetails.email;
          this.password = this.userDetails.password;
          this.firstName = this.userDetails.firstName;
          this.lastName = this.userDetails.lastName;
          this.selectedGender = this.userDetails.gender;
          this.selectedCity = this.userDetails.city;
          console.log('Reg data : ' + this.userDetails.email + " gender: "+
            this.selectedGender + "\n City"+ this.selectedCity); 
        }
      });
    }

   
  }

  createuser(){
    console.log("Email in Firt login method: " + this.email);
    const body = [this.email, this.password, this.firstName, this.lastName, this.selectedCity, this.selectedGender];
    console.log("body : " + body);
    
    this.appService.createUser(this.email, this.password, this.firstName, 
      this.lastName, this.selectedGender, this.selectedCity).subscribe(data =>{
      this.users = data;
      this.message = "You have successfully registerd";
      this.reset();
      //this.appService.setLogin(this.users);
      //this.router.navigate(['login']);
    },
    err => {
     this.message = "User already exist, please try with different user details";
    });
  }

  modify(){
    this.appService.modify(this.email, this.password, this.firstName, this.lastName, this.selectedGender, this.selectedCity )
      .then((result:boolean) => {
        if(result){
          this.message = "User details updated successfully"
          this.reset();
        }else{
          this.message = "Unable to process your request.";    
        }
    },err =>{
      this.message = "Unable to process your request.";
    });
  }

  reset(){
    this.email = "";
    this.password = "";
    this.firstName = "";
    this.lastName = "";
  }

  getGenders(){
    this.appService.getGender().subscribe(data=> 
      this.gender = data
    ); 
  }

  getCity(){
    this.appService.getCity().subscribe(data =>{
      this.city = data;
    });
  }

}
