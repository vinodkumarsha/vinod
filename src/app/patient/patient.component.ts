import { Component, OnInit,NgModule } from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';
import { AppService } from '../app.service';
import {DropdownModule} from 'primeng/dropdown';
import { SelectItem, MenuItem, Message, TreeNode } from 'primeng/api';
import { Disease } from './patient.disease';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ButtonModule} from 'primeng/button';
import {Form, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Car } from './patient.model';
import {DragDropModule} from 'primeng/dragdrop';
import {MultiSelectModule} from 'primeng/multiselect';
import {CalendarModule} from 'primeng/calendar';
import {ListboxModule} from 'primeng/listbox';
import {DialogModule} from 'primeng/dialog';
import {MenubarModule} from 'primeng/menubar';
import {MessageModule} from 'primeng/message'
import {MessagesModule} from 'primeng/messages';
import {GrowlModule} from 'primeng/growl';
import {TreeModule} from 'primeng/tree';
import {ContextMenuModule} from 'primeng/contextmenu';
import {PickListModule} from 'primeng/picklist';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FileUploadModule} from 'primeng/fileupload';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  testOption: string;
  selectedNo: string[] = [];
  patDetails: any[];
  remCols : any[];
  spanCols : any[];
  cols : any[];
  testcols : any[];
  patCols : any[];
  patDiease : SelectItem[];
  selectedDisease : Disease;
  multiSelectedDisease : Disease;
  seletedGender : string;
  cars: Car[];
  sales: any[];
  valArr = [];
  pName: string;
  patDt : Date;
  selectedCar : Disease;
  display : boolean = false;
  constructor(private appservice : AppService) { }
  menuitem : MenuItem[];
  msgs : Message[] = [];
  files : TreeNode[];
  selectedFile : TreeNode[];
  targetCars  : any[] = [];
  carsList = [];
  disDate : Date;
  uploadedFiles: any[] = [];
  matchedData : boolean = false;
  testOptions : SelectItem[];

  ngOnInit() {
    this.loadPatientDetails(); //Loading Table
    this.loadPatDisease(); //Loading Dropdown
    this.reorderTable();
    this.salesTable();
    this.loadMenuItems();
    this.loadTree();
    this.loadCars();
    this.targetCars = [];
    this.loadTest();

  for(let i = 0; i < this.cars.length; i++){
      for(let j = i+1; j < this.cars.length; j++){
        if(this.cars[i].vin === this.cars[j].vin){
          console.log("Index : "+ this.cars.indexOf(this.cars[i].vin));
          this.matchedData = true;
          break;
        }
        if(this.matchedData){
          break;
        }
      }
    }
  }

  loadTest() {
    this.appservice.testOption().then(data => {
      debugger;
      this.testOptions = [];
      for(let i = 0; i<data.length; i++){
        this.testOptions.push({label:data[i], value:data[i]});
      this.testOption = data[2];
      }
    })
  }
  
  loadMenuItems(){
    this.appservice.loadMenuitem().then(data => this.menuitem = data);
  }

  loadTree(){
    this.appservice.loadTree().then(files => this.files = files);
  }
  reorderTable(){
    this.appservice.getCarsSmall().then(cars => {
      this.cars = cars,
        console.log("Logs : " + JSON.stringify(this.cars));
      }
    );
    
   
   


    this.cols = [
      { field: 'vin', header: 'Vin' , rowspan: '2' },
      { field: 'year', header: 'Year' ,colspan: '2'},
      { field: 'brand', header: 'Brand' , rowspan: '2'},
      { field: 'color', header: 'Color', rowspan: '2' }
    ];

    this.spanCols = [
      { field: 'year', header: 'Summary', data: 'yes'},
      { field: 'brand', header: 'Brand' , data: 'yes'}
  ];
   
    let cnt = 0;
    for(let val of this.cols){
      if((val.colspan == 2) || cnt == 1 ){
        console.log("colspan : "+val.colspan);
        this.valArr.push(val.field);
        cnt++;
      }
      console.log("Ordered Colspan : "+ cnt+ " : "+ JSON.stringify(this.valArr));
    }


    this.testcols = [
      { field: 'vin', header: 'Vin' , rowspan: '2' },
      { field: 'year', header: 'Year' ,colspan: '2'},
      { field: 'brand', header: 'Brand' , rowspan: '2'},
      { field: 'color', header: 'Color', rowspan: '2' }
    ];

  }
  
  loadCars(){
    this.carsList = [
      {label: 'Audi', value: 'Audi'},
      {label: 'BMW', value: 'BMW'},
      {label: 'Fiat', value: 'Fiat'},
      {label: 'Ford', value: 'Ford'},
      {label: 'Honda', value: 'Honda'},
      {label: 'Jaguar', value: 'Jaguar'},
      {label: 'Mercedes', value: 'Mercedes'},
      {label: 'Renault', value: 'Renault'},
      {label: 'VW', value: 'VW'},
      {label: 'Volvo', value: 'Volvo'},
  ];
  }

  loadPatientDetails(){
    this.appservice.loadPatientDetails().then(data=>
    this.patDetails = data),
    
    this.patCols = [
      { field: 'patID', header: 'Patient ID', rowspan: '2' },
      { field: 'patDet', header: 'Details', colspan: '2', display: 'none'},
      { field: 'patSum', header: 'Summary' },
      { field: 'patAmt', header: 'Amount' },
      { field: 'patTotAmt', header: 'Total Amount', rowspan: '2' }
  ];
  this.remCols = [
    { field: 'patSum', header: 'Summary' , data: 'yes'},
    { field: 'patAmt', header: 'Amount' , data: 'yes'}
];
  }
      
  loadPatDisease() {
    this.appservice.loadPatDisease().then (data =>
    this.patDiease = data)
  }


  onDialog(){
    this.display = true;
  }

  onSubmit(){
    console.log("Name : " + this.pName + "\n Member: "+ this.selectedNo 
      + "\n Gender : "+ this.seletedGender + "\n Disease : "+ this.selectedDisease.code 
      + "\n MultiSelect : "+ this.multiSelectedDisease + "\n Date : "+ this.patDt 
      + "\n Selected Car : " + this.selectedCar.name
      + "\n Tree :"   + this.selectedFile
      + "\n PicK List : "+ this.targetCars);

  }

  onUpload(event){
    for(let file of event.files){
      this.uploadedFiles.push(file);
    }

  }

  search(){
    this.msgs = [];
    this.msgs.push({severity:'success', summary: 'Search', detail : 'Search Completed' })
  }
  

  salesTable(){
    this.sales = [
      { brand: 'Apple', lastYearSale: '51%', thisYearSale: '40%', lastYearProfit: '$54,406.00', thisYearProfit: '$43,342' },
      { brand: 'Samsung', lastYearSale: '83%', thisYearSale: '96%', lastYearProfit: '$423,132', thisYearProfit: '$312,122' },
      { brand: 'Microsoft', lastYearSale: '38%', thisYearSale: '5%', lastYearProfit: '$12,321', thisYearProfit: '$8,500' },
      { brand: 'Philips', lastYearSale: '49%', thisYearSale: '22%', lastYearProfit: '$745,232', thisYearProfit: '$650,323,' },
      { brand: 'Song', lastYearSale: '17%', thisYearSale: '79%', lastYearProfit: '$643,242', thisYearProfit: '500,332' },
      { brand: 'LG', lastYearSale: '52%', thisYearSale: ' 65%', lastYearProfit: '$421,132', thisYearProfit: '$150,005' },
      { brand: 'Sharp', lastYearSale: '82%', thisYearSale: '12%', lastYearProfit: '$131,211', thisYearProfit: '$100,214' },
      { brand: 'Panasonic', lastYearSale: '44%', thisYearSale: '45%', lastYearProfit: '$66,442', thisYearProfit: '$53,322' },
      { brand: 'HTC', lastYearSale: '90%', thisYearSale: '56%', lastYearProfit: '$765,442', thisYearProfit: '$296,232' },
      { brand: 'Toshiba', lastYearSale: '75%', thisYearSale: '54%', lastYearProfit: '$21,212', thisYearProfit: '$12,533' }
  ];
  }

  colReordered(event) {
    console.info(JSON.stringify(event));
    let i = 0;
    let newOrderedColumns = [];
    let newCars = [];
    let arr = {};
    for (let col of this.cols) {
        if (event.newValue == i) {
          console.log("1");
          newOrderedColumns.push(event.column);
          newOrderedColumns.push(col);
        } else if (event.prevValue == i) {
          console.log("2");
        } else {
          console.log("3");
          console.log("Drag Index : "+ event.dragIndex + "  Drop Index : "+ event.dropIndex 
            + "  Columns :"+event.colums + " Col: "+ col.field + "  Field: " + this.cars[i][col.field]);
          newOrderedColumns.push(col);
         
        }
        //++i;

          ++i;
    }
        this.cols = newOrderedColumns;

        /*for(let newcol of this.cols){
          let j = 0;
          for(let car of this.cars){
           // newCars.push(col.field);
            //newCars.push(car[col.field]);
            arr[newcol.field] = (car[newcol.field]) ;
            console.log("Field : "+newcol.field +" Field"+ car[newcol.field] + "  : "+JSON.stringify(arr));
            j++;
            break;
          }
          arr[newcol.field] = (newcol.field, arr[newcol.field]) 
        }
        newCars.push(arr);*/

        let a = 0;
        let temp = {};
        for(let car of this.cars){
          let j = 0;
          arr = {};
          for(let newcol of this.cols){
            arr[newcol.field] = (car[newcol.field]) ;
            console.log("Field : "+newcol.field +" Field"+ car[newcol.field] + "  : " + JSON.stringify(arr));
            j++;
          }
          temp = arr;
          console.log("Final :"+ JSON.stringify(temp));
          a++;
          newCars.push(temp);
        }
        

       /*let dragColPos  : number = -1;
       let dropColPos  : number = -1;
       this.columns = this.cols;
       for(var k=0;i<this.cols.length;k++){
         if(this.columns[i] == event.dragIndex ){
           dragColPos = i;
         }
         if(this.columns[i] == event.dropIndex ){
           dropColPos = i;
         }
       }
       this.columns[dragColPos] = this.dropCol;
       this.columns[dropColPos] = this.dragCol;
*/

        //this.cols = newOrderedColumns;
        this.cars = newCars;
        console.log("Reorder : "+ JSON.stringify(this.cols));
        console.log("Reorder Cars : "+ JSON.stringify(this.cars));
         //console.log("Reorder columns : "+ JSON.stringify(this.columns));
        
        //this.saveColumnOrder(); //save in Local Storige
  }
  dragCol : string;
  dropCol : string;
  private columns : string[] = []; 


  draggedCar: Car;
  availableCars: Car[];

  dragStart(event, car: Car) {
    this.draggedCar = car;
    console.log("Inside dragStart" + this.draggedCar);
  }

drop(event) {
  console.log("Inside dragDrop" );
    if(this.draggedCar) {
        let draggedCarIndex = this.findIndex(this.draggedCar);
        //this.selectedCars = [...this.selectedCars, this.draggedCar];
        //this.availableCars = this.availableCars.filter((val,i) => i!=draggedCarIndex);
        this.draggedCar = null;
    }
}

dragEnd(event) {
    this.draggedCar = null;
}

findIndex(car: Car) {
  console.log("Inside findIndex");
  let index = -1;
  for(let i = 0; i < this.availableCars.length; i++) {
      if(car.vin === this.availableCars[i].vin) {
          index = i;
          break;
      }
  }
  console.log("Index : "+index);
  return index;
}

}
