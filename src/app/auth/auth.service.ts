import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import * as firebase from 'firebase/app';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {Router} from "@angular/router";
export class EmailPasswordCredentials {
  email: string;
  password: string;
}
@Injectable()
export class AuthService {
  authState: any = null;
  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
      console.log('Authstate: ' + this.authState);
    });
  }
  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false;
  }
  get currentUserName(): string {
    return this.authState['email'];
  }
  get currentUserId(): string {
    return this.authState['email'];
  }
  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }
  get isUserEmailLoggedIn(): boolean {
    if ((this.authState != null) && (!this.isUserAnonymousLoggedIn)) {
      return true;
    } else {
      return false;
    }
  }
  signUpWithEmail(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
      this.authState = user;
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }
  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.authState = user;
      }
      console.log('Authstate: ' + this.authState);
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }
  signOut(): void {
    localStorage.removeItem('currentUser');
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('Login');
}
}

