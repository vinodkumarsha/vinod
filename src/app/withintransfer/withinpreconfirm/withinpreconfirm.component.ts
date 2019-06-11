import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../../app.service';
import {FormGroup, FormControl} from '@angular/forms'
import { Router } from '@angular/router';
import { error } from 'protractor';

@Component({
  selector: 'app-withinpreconfirm',
  templateUrl: './withinpreconfirm.component.html',
  styleUrls: ['./withinpreconfirm.component.css']
})
export class WithinpreconfirmComponent implements OnInit {
  //@Input('result') myform; 
  myform : string;
  withinTransStatus = [];

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
    //console.log('Inside preconfirm : '+this.myform);
    console.log("Preconfirm Data : "+this.appService.getWithAccData());
    this.myform = this.appService.getWithAccData();
  }


  withinCancel(myform){
    console.log("Inside withinCancel");
    localStorage.setItem("page","fromPreconfirm");
    this.appService.setWithAccData(myform);
    this.router.navigate(['withintrans']);
  }
  
  wStatus: string;

  withinConfirm(myform){
    console.log("Inside withinConfirm");
    this.appService.withinConfirm(myform).subscribe(data=>{
      //this.withinTransStatus = data;
      //myform.status = this.withinTransStatus;

      myform.status = data.status;
      myform.txnRefNo = data.txnRefNo;

      console.log(" withinTransStatus status: "+data + "   myform.status : "+  myform.status
        + " myform.txnRefNo :  "+ myform.txnRefNo);
      //var status = JSON.stringify(myform.status.status);
      //var strSuccess = JSON.stringify("success");
      var strSuccess = "success";

      console.log("Array "+ status + "  "+ strSuccess+ "  Compare: "+ myform.status.localeCompare(strSuccess));

      if(typeof data!='undefined' && data && (myform.status.localeCompare(strSuccess) == 0) ){
        console.log("Inside withinConfirm success");
        this.appService.setWithAccData(myform);
        this.router.navigate(['withintransconfirm']);
     }else{
        console.log("Inside withinConfirm failure");
        this.wStatus = "Unable to process your request. Please try again later";
      }
    })
  }
}
