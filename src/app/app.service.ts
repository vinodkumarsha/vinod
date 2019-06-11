import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient} from '@angular/common/http';
import { Response } from '@angular/http'
import 'rxjs/Rx';
import {User} from './user/user.model'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map' ;
import 'rxjs/add/operator/catch';
import { error } from 'protractor';
import { AccountBean } from './withintransfer/withintransfer.model';
import { FormControl, FormGroup } from '@angular/forms';
import {TreeModule} from 'primeng/tree';
import { TreeNode } from 'primeng/api';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AppService {
  private apiData = new BehaviorSubject<User>(null);
  public apiData$ = this.apiData.asObservable();

  private selectedUserData = new BehaviorSubject<User>(null);
  public selectedUserData$ = this.selectedUserData.asObservable();

  user=[];
  users: User = new User();
  TOKEN_KEY = 'token';
  status: boolean;
  private loggedIn = new BehaviorSubject<boolean>(false);
  city = [];
  gender = [];
  fromAccount = [];
  toAccount = [];
  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(private http: HttpClient) { 
    /*var currentUser = JSON.parse(localStorage.getItem('CURRENTUSER'));
    this.token = currentUser && currentUser.token; */
  }
  
  //private userUrl = 'http://localhost:8080/DemoSpring/';
  private userUrl = 'http://localhost:8080/UserDetails/';

  get token() {
    console.log("Token : "+localStorage.getItem(this.TOKEN_KEY));
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

    public login(email, password) : Observable<User[]>{
      console.log("Entered Email : " + email);
      const data = {
        email:email, password: password
      }
      const headers = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' })
      };
      localStorage.setItem(this.TOKEN_KEY,"TOKEN123") ;
      //return this.http.get<User[]>(this.userUrl +"api/"+email ).map(res => this.user = res);
      return this.http.post<User[]>(this.userUrl +"user", data, headers
        ).map(res => 
        this.user = res,
        this.loggedIn.next(true)
        //localStorage.setItem(this.TOKEN_KEY,res.token) ;
      ).catch(this.handleError);
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        errMsg = "Unable to process your request.";
        console.error("Login failed: "+errMsg);
        this.loggedIn.next(false);
        localStorage.removeItem(this.TOKEN_KEY) ;
      return Observable.throw(errMsg);
    }

    public getAllUser() : Observable<any>{
      console.log("Inside getAllUser method:");
      return this.http.get<any>(this.userUrl+"alluser").map(res => this.users = res);
    }

    public createUser(email, password, firstName, lastName, gender, city): Observable<User[]>{
      console.log("Entered Email : " + email + " Pass:" + password 
        + " firstName :"+firstName + " LastName: "+lastName + " Gender: " + gender +" City: " + city);

        const body = {
          email:email, password:password,
          firstName:firstName, lastName:lastName,
          gender:gender, city:city
        }
        return this.http.post<User[]>(this.userUrl + "create", body)
          .map(res => this.user = res);
    }
     
    setLogin(data){
      this.apiData.next(data);
    }

    logout(){
      this.loggedIn.next(false);
      this.selectedUserData.next(null);
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem('CURRENTUSER');
    }


    deleteUser(user){
      console.log("Inside delete method : "+user.email);
      const body = {
        email: user.email
      }
      return this.http.post(this.userUrl + "delete", body)
        .toPromise()
          .then((res:boolean) => res
          ).catch(this.handleErrors);

    }

    edit(data){
       this.selectedUserData.next(data);
    }

    modify(email, password, firstName, lastName, gender, city){
      const body = {
        email:email , password:password, firstName: firstName, lastName: lastName,
        gender:gender, city:city
      }
      return this.http.post(this.userUrl+"edit", body)
        .toPromise()
          .then((data:boolean) => data
        ).catch(this.handleErrors);
    }


    private handleErrors(error: any): Promise<any> {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
    }


    public getGender(): Observable<any>{
      console.log("Inside getGender");
      return this.http.get<any>(this.userUrl+"gend").map(data=>
        this.gender = data);
    }

    getCity(){
      console.log("Inside getCity");
      return this.http.get<any>(this.userUrl+"cty").map(data=>
        this.city = data);
    }

    getFromAccount(users): Observable<any>{
      const headers = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' })
      };
      console.log("Inside getFromAccount");
      return this.http.post<AccountBean[]>(this.userUrl+"frmAcc", headers)
        .map(data =>
          this.fromAccount = data);
    }

    getToAccount(users): Observable<any>{
      console.log("Inside getToAccount service");
      const headers = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' })
      };
      return this.http.post<AccountBean[]>(this.userUrl + "toAcc", headers)
        .map(data=>
          this.toAccount = data)
    }

    withAccTransferOnSubmit(myform): Observable<any>{
      console.log("Inside withAccTransferOnSubmit");
      const body = {
        "fromAccount": myform.fromAccount, "toAccount": myform.toAccount, "amount": myform.amount
      }
      const headers = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' })
      };
      return this.http.post<AccountBean[]>(this.userUrl+ "withinInit", body, headers)
      .map(data=>
        myform = data
      )
    }

    myform: string;
    setWithAccData(data){
      this.myform = data;
    }

    getWithAccData(){
      return this.myform;
    }

    withinTranstatus = [];
    wStatus : string;

    withinConfirm(data): Observable<any>{
      console.log("Inside WithinConfirm : "+ data.amount);

      const headers = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' })
      };

      const body = {
        "fromAccount": data.fromAccount, "toAccount": data.toAccount, "amount": data.amount
      }

      return this.http.post<AccountBean[]>(this.userUrl+"withincfrm", body, headers )
        .map(datas=>
          //this.withinTranstatus = data,
          data = datas,
          console.log("App service status : "+ this.withinTranstatus)
      )
    }

    testOption(){
      let testOptions = ['1','2','3','4'];
      return Promise.all(testOptions);
    }
    loadPatDisease(){
      let patDiease = [
        {label:'Select Disease', value:null},
        {label:'Fever', value:{id:1, name: 'Fever', code: 'FVR'}},
        {label:'Cough', value:{id:2, name: 'Cough', code: 'COU'}},
        {label:'Diohrea', value:{id:3, name: 'Diohrea', code: 'DIO'}},
        {label:'Aasmaa', value:{id:4, name: 'Aasmaa', code: 'ASM'}},
        {label:'Liver', value:{id:5, name: 'Liver', code: 'LVR'}}
    ];
    return Promise.all(patDiease);
    }

    loadPatientDetails(){
      let patDet = [
        {patID:"1", patDet: '', patSum: "test1", patAmt: "150.00", patTotAmt: "150.05"},
        {patID:"2", patDet: '', patSum: "test2", patAmt: "120.00", patTotAmt: "120.05"},
        {patID:"3", patDet: '', patSum: "test3", patAmt: "190.00", patTotAmt: "190.05"},
        {patID:"4", patDet: '', patSum: "test4", patAmt: "133.00", patTotAmt: "133.05"},
        {patID:"5", patDet: '', patSum: "test5", patAmt: "139.00", patTotAmt: "139.05"},
        {patID:"6", patDet: '', patSum: "test6", patAmt: "140.00", patTotAmt: "140.05"},
        {patID:"7", patDet: '', patSum: "test7", patAmt: "125.00", patTotAmt: "125.05"}
       ]
      return Promise.all(patDet);
    }


    getCarsSmall(){
      let patDet = [
        {vin:"1", year: "test1", brand: "150.00", color: "150.05"},
        {vin:"2", year: "test2", brand: "120.00", color: "120.05"},
        {vin:"3", year: "test3", brand: "190.00", color: "190.05"},
        {vin:"3", year: "test4", brand: "133.00", color: "133.05"},
        {vin:"5", year: "test5", brand: "139.00", color: "139.05"},
        {vin:"6", year: "test6", brand: "140.00", color: "140.05"},
        {vin:"7", year: "test7", brand: "125.00", color: "125.05"}
       ]
      return Promise.all(patDet);
    }


    loadMenuitem(){
      console.log("Inside loadMenuItem");
      let menuData = [
        { label : 'Home', items: [{label: 'Portfolio' }], routerLink: "/login" },
        { label : 'Accounts', items: [{label: 'Account Summary' },{label: 'Loan Account' } ] },
        { label : 'Transfer', items: [{label: 'Within My Account', routerLink: "/withintrans" },{label: 'Transfer', routerLink: "/dashboard" } ], routerLink: "/withintrans" }
      ]
      return Promise.all(menuData);
    }


    loadTree(){
      let tree = [
            {
                "label": "Documents",
                "data": "Documents Folder",
                "expandedIcon": "fa fa-folder-open",
                "collapsedIcon": "fa fa-folder",
                "children": [{
                        "label": "Work",
                        "data": "Work Folder",
                        "expandedIcon": "fa fa-folder-open",
                        "collapsedIcon": "fa fa-folder",
                        "children": [{"label": "Expenses.doc", "icon": "fa fa-file-word-o", "data": "Expenses Document"}, {"label": "Resume.doc", "icon": "fa fa-file-word-o", "data": "Resume Document"}]
                    },
                    {
                        "label": "Home",
                        "data": "Home Folder",
                        "expandedIcon": "fa fa-folder-open",
                        "collapsedIcon": "fa fa-folder",
                        "children": [{"label": "Invoices.txt", "icon": "fa fa-file-word-o", "data": "Invoices for this month"}]
                    }]
            },
            {
                "label": "Pictures",
                "data": "Pictures Folder",
                "expandedIcon": "fa fa-folder-open",
                "collapsedIcon": "fa fa-folder",
                "children": [
                    {"label": "barcelona.jpg", "icon": "fa fa-file-image-o", "data": "Barcelona Photo"},
                    {"label": "logo.jpg", "icon": "fa fa-file-image-o", "data": "PrimeFaces Logo"},
                    {"label": "primeui.png", "icon": "fa fa-file-image-o", "data": "PrimeUI Logo"}]
            },
            {
                "label": "Movies",
                "data": "Movies Folder",
                "expandedIcon": "fa fa-folder-open",
                "collapsedIcon": "fa fa-folder",
                "children": [{
                        "label": "Al Pacino",
                        "data": "Pacino Movies",
                        "children": [{"label": "Scarface", "icon": "fa fa-file-video-o", "data": "Scarface Movie"}, {"label": "Serpico", "icon": "fa fa-file-video-o", "data": "Serpico Movie"}]
                    },
                    {
                        "label": "Robert De Niro",
                        "data": "De Niro Movies",
                        "children": [{"label": "Goodfellas", "icon": "fa fa-file-video-o", "data": "Goodfellas Movie"}, {"label": "Untouchables", "icon": "fa fa-file-video-o", "data": "Untouchables Movie"}]
                    }]
            }
        ]
    return Promise.all(<TreeNode[]> tree) ;
    }

    /*public getUsers() {
      let fakeUsers = [{id: 1, firstName: 'Vinod', lastName: 'Sha', email: 'dhiraj@gmail.com'},
     {id: 1, firstName: 'Tom', lastName: 'Jac', email: 'Tom@gmail.com'},
     {id: 1, firstName: 'Hary', lastName: 'Pan', email: 'hary@gmail.com'},
     {id: 1, firstName: 'praks', lastName: 'pb', email: 'praks@gmail.com'},
     ];
     return Observable.of(fakeUsers);
     }*/
}
