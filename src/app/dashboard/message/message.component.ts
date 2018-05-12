import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {GeneralService} from "../../general.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messages: Observable<any[]>;
  date: any;
  visible = false;
  messageVisible = true;
  sender: any;
  details: any;
  email: any;
  constructor(private generalService: GeneralService, private router: Router) {
    // this.date = new Date;
  }

  ngOnInit() {
    this.messages = this.generalService.getRequestComplaints();
  }
  mapView() {
    this.router.navigateByUrl('/Dashboard');
  }
  read(msg: any) {
    this.visible = true;
    this.messageVisible = false;
    this.sender = msg.name;
    this.details = msg.message;
    this.email = msg.email;
    // this.date = this.convertTime(msg.timeStamp);
  }
  deleteMessage(id: any) {
    this.generalService.deleteMessage(id);
  }

  convertTime(timestamp: any): any {
    return new Date(timestamp * 1000).toUTCString();
  }
}
