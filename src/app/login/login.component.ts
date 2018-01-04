import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import * as firebase from 'firebase/app';
import {Observable} from "rxjs/Observable";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isNewUser = false;
  email = '';
  password = '';
  errorMessage = '';
  error: { name: string, message: string } = {name: '', message: ''};

  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }
  clearErrorMessage() {
    this.errorMessage = '';
    this.error = {name: '', message: ''};
  }
  changeForm() {
    this.isNewUser = !this.isNewUser;
  }

  onSignUp(): void {
    this.clearErrorMessage();
    if (this.validateForm(this.email, this.password)) {
      this.authService.signUpWithEmail(this.email, this.password)
        .then(() => {
          this.router.navigateByUrl('Dashboard');
        }).catch(_error => {
        this.error = _error;
        this.router.navigate(['/']);
      });
    }
  }

  onLoginEmail(): void {
    this.clearErrorMessage();
    if (this.validateForm(this.email, this.password)) {
      this.authService.loginWithEmail(this.email, this.password)
        .then(() => this.router.navigate(['/Dashboard']))
        .catch(_error => {
          this.error = _error;
          this.router.navigate(['/']);
        });
    }
  }
  validateForm(email: string, password: string): boolean {
    if (email.length === 0) {
      this.errorMessage = 'Please enter Email!';
      return false;
    }

    if (password.length === 0) {
      this.errorMessage = 'Please enter Password!';
      return false;
    }

    if (password.length < 6) {
      this.errorMessage = 'Password should be at least 6 characters!';
      return false;
    }

    this.errorMessage = '';

    return true;
  }
}
