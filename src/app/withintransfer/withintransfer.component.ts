import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ReactiveFormsModule, FormControl, FormGroup, FormsModule, Validators, FormBuilder} from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/observable';
import {User} from '../user/user.model';
import {AccountBean} from '../withintransfer/withintransfer.model';
import {BrowserModule} from '@angular/platform-browser';

@Component({
  selector: 'app-withintransfer',
  templateUrl: './withintransfer.component.html',
  styleUrls: ['./withintransfer.component.css'],
})
export class WithintransferComponent implements OnInit {

  users : User;
  fromAccount: string;
  toAccount: string;
  amount: string;
  isLoggedIn$: Observable<boolean>; 
  myform: FormGroup;
  data: string;

  fAccount: string;
  amt: string;
  tAccount: string;

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.getAccountValidationMessages();
    this.myform = new FormGroup({
      fromAccount: new FormControl('', Validators.required),
      toAccount: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required)
    });
    
    console.log(" local Storage : "+localStorage.getItem("page"));
    
    console.log("><><><: "+this.fromAccount);

    //this.appService.setWithAccData("");

    this.isLoggedIn$ = this.appService.isLoggedIn;
    if(this.isLoggedIn$){
      this.getUserDetails();
      this.getFromAccount();
      this.getToAccount();

      this.data = this.appService.getWithAccData();

      if(this.data){
        let dataFromPreconfirm = [];
        dataFromPreconfirm.push(this.data);
        this.fAccount = dataFromPreconfirm[0].fromAccount;
        this.amt = dataFromPreconfirm[0].amount;
        this.tAccount = dataFromPreconfirm[0].toAccount;

        console.log();
  
        console.log('fACount >>>>>>>:' + this.fAccount + " Amount: " + this.amt 
          + " To tAccount : "+ this.tAccount);
  
        this.myform = new FormGroup({
          fromAccount: new FormControl(this.fAccount, Validators.required),
          toAccount: new FormControl(this.tAccount, Validators.required),
          amount: new FormControl(this.amt, Validators.required)
        });

        console.log("Sample ><><><: "+this.fromAccount);

      }

    }else{
      this.router.navigate(['']);
    }
  }

  getFromAccount(){
    console.log("Inside getFromAccount: "+ this.users.email);
    return this.appService.getFromAccount(this.users).subscribe(data=>
      this.fromAccount = data);
  }

  getToAccount(){
    console.log("Inside getToAccount");
    return this.appService.getToAccount(this.users).subscribe(data=>
    this.toAccount = data);
  }

  getUserDetails(){
    this.appService.apiData$.subscribe(data=> {
      this.users = data;
      console.log(" Tesst : "+ this.users.firstName);

      if(!(typeof this.users!='undefined' && this.users)){
        console.log("Inside header :" + this.users)
      }else{
        console.log("Inside header name fail");
      }
    });
  }

  onFromAccSelect($event:any){
    console.log($event.target.value);
  }

  //@Output() submitClicked = new EventEmitter<any>();
  onSubmitTransfer(myform){
    console.log("Entered Amount : "+ myform.amount + " Selected From Account "+myform.fromAccount
      +" toAccount: "+myform.toAccount.toAccount + " >>>>>> : "+myform.frmDis
      + " >>>>>>> : ");
    //console.log(">>>>>>>>> : " + this.myform.controls["fromAccount"].value);

    this.appService.withAccTransferOnSubmit(myform).subscribe(data =>{
      myform.sellRate = data.sellRate,
      myform.buyRate = data.buyRate,
      myform.transDate = data.transDate
    })

    this.appService.setWithAccData(myform);
    this.router.navigate(['withintranspre'])
  }

  getAccountValidationMessages(){
    const accountValidationMessages = {
      'fromAccount': [
        { type: 'required', message: 'From Account Number is required' }
      ],
      'toAccount': [
        { type: 'required', message: 'To Account Number is required' }
      ],
      'amount': [
        { type: 'required', message: 'Amount is required' },
        { type: 'minlength', message: 'Amount must be at least 1 digits long' },
        { type: 'maxlength', message: 'Amount cannot be more than 25 characters long' }
      ]
    }

  }
}
