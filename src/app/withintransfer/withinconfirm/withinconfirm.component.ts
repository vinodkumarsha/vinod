import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/observable';

@Component({
  selector: 'app-withinconfirm',
  templateUrl: './withinconfirm.component.html',
  styleUrls: ['./withinconfirm.component.css']
})
export class WithinconfirmComponent implements OnInit {
  myform :string;

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
    console.log("Confirm Data : " + this.appService.getWithAccData());
    this.myform = this.appService.getWithAccData();
  }

  returnHome(){
    this.appService.setWithAccData("");
    this.router.navigate(['withintrans']);
  }
}
