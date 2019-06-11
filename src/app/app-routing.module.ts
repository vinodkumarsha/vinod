import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WithintransferComponent } from './withintransfer/withintransfer.component';
import { WithinpreconfirmComponent } from './withintransfer/withinpreconfirm/withinpreconfirm.component';
import { WithinconfirmComponent } from './withintransfer/withinconfirm/withinconfirm.component';
import { PatientComponent } from './patient/patient.component';

const route: Routes = [
  { path : 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path : 'login', component: LoginComponent },
  {path : 'register', component: RegistrationComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'withintrans', component: WithintransferComponent},
  {path: 'withintranspre', component: WithinpreconfirmComponent},
  {path: 'withintransconfirm', component: WithinconfirmComponent},
  {path: 'patient', component: PatientComponent},
  { path : '', component:LoginComponent},
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(route)
  ],

  exports:[
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
