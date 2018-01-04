import {EventEmitter, Injectable} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {AuthService} from "./auth/auth.service";

@Injectable()
export class GeneralService {

  notifications: any;
  profiles: any;
  emergencyData = new EventEmitter<any>();
  profileData = new EventEmitter<any>();
  constructor(private af: AngularFireDatabase) {
  }
  getNotifications(): any {
    this.notifications = this.af.list('/Notification').valueChanges();
    return this.notifications;
  }
  getPatientProfile(): any {
    this.profiles = this.af.list('/Users').valueChanges();
    return this.profiles;
  }

}
