import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../general.service";
import {window} from "rxjs/operator/window";

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

  name: any;
  bestfriend_number: any;
  nextOfKin: any;
  department: any;
  other_details: any;
  faculty: any;
  profile_picture: any;
  matNum: any;
  address: any;
  userId: any;
  emergency: any;
  eUpdate = {
    id: '',
    latitude: '',
    longitude: '',
    // reportStatus: '',
    userId: ''
  };
  constructor(private generalService: GeneralService) {
    this.profile_picture = '../../assets/img/no-avatar.png';
    this.matNum = 'Matriculation Number';
    this.generalService.profileData.subscribe(
      (data: any) => {
        this.userId = data.id;
        this.name = data.profileName;
        this.department = data.department;
        this.nextOfKin = data.firstSOSNumber;
        this.bestfriend_number = data.secondSOSNumber;
        this.other_details = data.otherDetail;
        this.faculty = data.faculty;
        if (data.profileAvatar == null) {
          this.profile_picture = '../../assets/img/no-avatar.png';
        } else {
          this.profile_picture = data.profileAvatar;
        }
        this.matNum = data.matriculationNumber;
        this.address = data.address;
      }
    );
    this.generalService.emergencyData.subscribe(
      (data: any) => {
        this.eUpdate.id = data.id;
        this.eUpdate.userId = data.userId;
        this.eUpdate.longitude = data.longitude;
        this.eUpdate.latitude = data.latitude;
        // this.eUpdate.reportStatus = 'true';
      }
    );
  }

  ngOnInit() {
  }
}
