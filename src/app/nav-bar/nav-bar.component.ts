import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  
  isLoggedIn$: Observable<boolean>; 
  
  constructor(private apiService: AppService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.apiService.isLoggedIn;
    
    if(this.isLoggedIn$){
      localStorage.getItem("user");
    }

  }

}
