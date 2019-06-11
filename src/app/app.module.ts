import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { AppService } from './app.service';
import { AppRoutingModule } from './/app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthService } from './auth.service'; 
import { AuthGuard } from './auth.guard';
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { Authinterceptor } from './authinterceptor';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WithintransferComponent } from './withintransfer/withintransfer.component';
import { WithinpreconfirmComponent } from './withintransfer/withinpreconfirm/withinpreconfirm.component';
import { WithinconfirmComponent } from './withintransfer/withinconfirm/withinconfirm.component';
import { PatientComponent } from './patient/patient.component';

import {CheckboxModule} from 'primeng/checkbox';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ButtonModule} from 'primeng/button';
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
import {FileUploadModule} from 'primeng/fileupload';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    FooterComponent,
    NavBarComponent,
    DashboardComponent,
    WithintransferComponent,
    WithinpreconfirmComponent,
    WithinconfirmComponent,
    PatientComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CheckboxModule,
    TableModule,
    DropdownModule,
    RadioButtonModule,
    ButtonModule,
    CommonModule,
    DragDropModule,
    MultiSelectModule,
    CalendarModule,
    ListboxModule,
    DialogModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    GrowlModule,
    TreeModule,
    ContextMenuModule,
    PickListModule,
    FileUploadModule
  ],
  providers: [
    AppService,
    AuthService,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS,
    useClass: Authinterceptor,
    multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
