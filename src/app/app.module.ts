import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NotificationComponent } from './notification/notification.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MapComponent } from './dashboard/map/map.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { LoginComponent } from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {FormsModule} from '@angular/forms';
import {AuthService} from './auth/auth.service';
import {environment} from '../environments/environment.prod';
import { AgmCoreModule } from '@agm/core';
import {GeneralService} from "./general.service";
import { ResgisterUserComponent } from './dashboard/resgister-user/resgister-user.component';
import {GoogleMapsNg2Module} from "google-maps-ng2";
import { EmergencyListComponent } from './dashboard/emergency-list/emergency-list.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import {AuthGuard} from "./auth.guard";
import { MessageComponent } from './dashboard/message/message.component';
import { TipsComponent } from './dashboard/tips/tips.component';

const routes: Routes = [
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent},
  {
    path: 'Dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: MapComponent
      },
      {
        path: 'emergencies',
        component: EmergencyListComponent
      },
      {
        path: 'messages',
        component: MessageComponent
      },
      {
        path: 'postTip',
        component: TipsComponent
      }
    ]
  },
  {
    path: '**',
    component: PagenotfoundComponent
  }
  // { path: 'Signup', component: SignupComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent,
    NavigationComponent,
    MapComponent,
    ProfileDetailComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ResgisterUserComponent,
    EmergencyListComponent,
    PagenotfoundComponent,
    MessageComponent,
    TipsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    GoogleMapsNg2Module.forRoot({
      apiKey: environment.googleMapsKey,
      libraries: environment.libraries
    }),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthGuard,
    AuthService,
    GeneralService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
