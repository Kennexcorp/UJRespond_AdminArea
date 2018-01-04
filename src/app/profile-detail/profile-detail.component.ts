import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../general.service";

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

  name: any;
  bestfriend_number: any;
  parent_number: any;
  department: any;
  other_details: any;
  blood_group: any;
  constructor(private generalService: GeneralService) {
    this.generalService.profileData.subscribe(
      (data: any) => {
        this.name = data.name;
        this.department = data.department;
        this.parent_number = data.parent_number;
        this.bestfriend_number = data.bestfriend_number;
        this.other_details = data.other_details;
        this.blood_group = data.blood_group;
      }
    );
  }

  ngOnInit() {
  }

}
