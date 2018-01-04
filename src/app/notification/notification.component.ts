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
  emergencyID: any;
  notifications: Observable<any[]>;
  constructor(private generalService: GeneralService) {
    this.emergencyType = '';
    this.emergencyTime = new Date();
    this.emergencyDetail = '';
    this.getNotifications();
  }
  getNotifications() {
    this.notifications = this.generalService.getNotifications();
  }
  onClick(emergencyData: any) {
    this.generalService.emergencyData.emit(emergencyData);
    this.getProfile(emergencyData.userID);
    console.log(emergencyData);
  }

  getProfile(id: any) {
    this.generalService.getPatientProfile()
      .subscribe(profile_data => {
        profile_data.forEach(profile => {
          if (profile.userID === id) {
            this.generalService.profileData.emit(profile);
          }
        });
      }, error => console.log('Profile Not Found' + error));
  }

  ngOnInit() {
  }

}
