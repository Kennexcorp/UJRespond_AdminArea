import {EventEmitter, Injectable} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {AuthService} from "./auth/auth.service";

@Injectable()
export class GeneralService {

  notifications: any;
  profiles: any;
  emergencies: any;
  requestOrComplaints: any;
  report: any;
  emergencyData = new EventEmitter<any>();
  profileData = new EventEmitter<any>();
  emergencyList = new EventEmitter<any>();

  constructor(private af: AngularFireDatabase) {
  }

  getNotifications(): any {
    this.notifications = this.af.list('/Reports').valueChanges();
    return this.notifications;
  }

  getPatientProfile(): any {
    this.profiles = this.af.list('/User_Profile').valueChanges();
    return this.profiles;
  }

  getEmergencies(): any {
    this.emergencies = this.af.list('/Reports').valueChanges();
    return this.emergencies;
  }

  updateEmergency(updateValues: any): any {
    const updates = {};
    updates['/Reports/' + updateValues.reportId] = updateValues;
    this.report = this.af.database.ref().update(updates);
    console.log('success');
  }

  getRequestComplaints(): any {
    this.requestOrComplaints = this.af.list('/RequestComplaints').valueChanges();
    return this.requestOrComplaints;
  }

  postTip(tip: any): any {
    const id = this.af.createPushId();
    console.log('id ' + id + 'tips' + tip);
    this.af.list('/EmergencyTips').push(tip);
  }

  getProfile2(id: any): any {
    let name = '';
    const prof = this.af.database.ref('/User_Profile/' + id);
    prof.on('value', function (profile) {
      name =  profile.val().profileName;
    });
    console.log('profile ' + name);
    return name;
  }
  deleteEmergency(id: any) {
    this.af.database.ref('Reports/' + id).remove();
  }
  deleteMessage(id: any) {
    this.af.database.ref('RequestComplaints/' + id).remove();
  }
}
