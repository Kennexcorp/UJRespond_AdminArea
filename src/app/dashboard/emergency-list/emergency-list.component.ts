import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../general.service';
import {Router} from "@angular/router";
import {MDCDialog, MDCDialogFoundation, util} from '@material/dialog';

@Component({
  selector: 'app-emergency-list',
  templateUrl: './emergency-list.component.html',
  styleUrls: ['./emergency-list.component.css']
})
export class EmergencyListComponent implements OnInit {

  emergency_list: any;
  edate: any;
  etype: any;
  eLongitude: any;
  eLatitude: any;
  eVictim: any;
  visible = false;
  listVisible = true;

  constructor(private generalService: GeneralService, private router: Router) {
    // this.demoReady();
  }

  private getEmergencies() {
    this.emergency_list = this.generalService.getEmergencies();
  }

  ngOnInit() {
    this.getEmergencies();
  }
  mapView() {
    this.router.navigateByUrl('/Dashboard');
  }
  viewDetail(emergency: any) {
  // const dialog = new MDCDialog(document.querySelector('#mdc-dialog-default'));
    this.listVisible = false;

  this.eVictim = this.generalService.getProfile2(emergency.userId);
  if (emergency.id === '111') {
    this.etype = 'Ambulance Request';
  }
  if (emergency.id === '222') {
    this.etype = 'Fire Outbreak';
  }
  if (emergency.id === '333') {
    this.etype = 'Crime Report';
  }
  this.eLongitude = emergency.longitude;
  this.eLatitude = emergency.latitude;
  this.edate = this.convertTime(emergency.timeStamp);
  this.visible = true;
  console.log(this.etype);
/*
  const el = document.querySelector('#default-dialog-activation');
  if (el) {
    el.addEventListener('click', function (evt) {
      dialog.lastFocusedTarget = evt.target;
      dialog.show();
    });
  }*/

}
  deleteEmergency(id: any) {
    this.generalService.deleteEmergency(id);
  }

  convertTime(timestamp: any): any {
    return new Date(timestamp * 1000).toUTCString();
  }
}
