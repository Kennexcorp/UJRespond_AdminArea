import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {GeneralService} from "../general.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  // noOfRequest: any;
  constructor(public authService: AuthService) {
  }

  ngOnInit() {
  }
  logout() {
    this.authService.signOut();
  }

}
