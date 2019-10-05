import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
// import * as firestore from "firebase/firestore";

import { ThemeService } from "./core/services/theme.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "CollectorJS - MET 701";
  password: string;
  email: string;
  authError: string;
  isDarkTheme: Observable<boolean>;
  constructor(
    private themeService: ThemeService,
    public afAuth: AngularFireAuth
  ) {}
  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }
  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }
  login() {
    this.afAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())

      .catch(err => {
        console.log(err);
        this.authError = err.message;
      });
  }
  loginGithub() {
    this.afAuth.auth
      .signInWithPopup(new auth.GithubAuthProvider())
      .catch(err => {
        console.log(err);
        this.authError = err.message;
      });
  }
  loginUsingPassWord() {
    this.afAuth.auth
      .signInWithEmailAndPassword(this.email, this.password)
      .catch(err => {
        console.log(err);
        alert(err.message);
      });
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  doRegister() {
    this.afAuth.auth
      .createUserWithEmailAndPassword(this.email, this.password)
      .catch(err => {
        console.log(err);
        alert(err.message);
      });
  }
}
