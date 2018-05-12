import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {GeneralService} from "../../general.service";

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css']
})
export class TipsComponent implements OnInit {
  tip = {
    title: '',
    description: ''
  };
  constructor(private router: Router, private generalService: GeneralService) { }

  ngOnInit() {
  }
  mapView(): any {
    this.router.navigateByUrl('/Dashboard');
  }
  sendTip(tip: any): any {
    const msg = this.generalService.postTip(tip);
    console.log(tip)
    alert(msg);
  }
}
