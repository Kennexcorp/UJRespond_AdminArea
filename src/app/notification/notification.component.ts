import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../general.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  emergencyType: any;
  emergencyTime: Date;
  emergencyDetail: any;
  emergency: any;
  notifications: Observable<any[]>;
  constructor(private generalService: GeneralService) {
    this.emergencyType = '';
    // this.emergencyTime = new Date();
    this.emergencyDetail = '';
    this.getNotifications();
  }
  getNotifications() {
    this.notifications = this.generalService.getNotifications();
  }
  onClick(emergencyData: any) {
    this.emergency = emergencyData;
    this.generalService.emergencyData.emit(emergencyData);
    this.getProfile(emergencyData.userId);
    // console.log(emergencyData);
  }

  getProfile(id: any) {
    console.log(id);
    this.generalService.getPatientProfile()
      .subscribe(profile_data => {
        profile_data.forEach(profile => {
          // console.log(profile);
          if (profile.id === id) {
            this.generalService.profileData.emit(profile);
          }
        });
      }, error => console.log('Profile Not Found' + error));
  }

  ngOnInit() {
  }

  acknowledge (): any {
    if (this.emergency == null) {
      alert('you must view the emergency first');
    } else {
      alert('Request acknowledged');
      this.emergency.reportStatus = 'accepted';
      this.generalService.updateEmergency(this.emergency);
    }
    this.emergency = null;
    console.log(this.emergency);
  }
  decline(): any {
    if (this.emergency == null) {
      alert('you must view the emergency first');
    } else {
      alert('Request Declined');
      this.emergency.reportStatus = 'declined';
      this.generalService.updateEmergency(this.emergency);
      console.log(this.emergency);
    }
    this.emergency = null;
  }
  convertTime(timestamp: any): any {
    return new Date(timestamp * 1000).toDateString();
  }
}
