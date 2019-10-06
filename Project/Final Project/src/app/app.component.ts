import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Observable } from "rxjs";
// import * as firestore from "firebase/firestore";

import { ThemeService } from "./core/services/theme.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { MatSlideToggle } from "@angular/material";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  @ViewChild("slide", { static: false })
  matSlideToggle: MatSlideToggle;
  darkThemeSlider: MatSlideToggle;
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
    const darktheme = localStorage.getItem("cjs-darktheme");
    this.isDarkTheme = this.themeService.isDarkTheme;
    const that = this;

    // else that.darkThemeSlider.checked = false;
    setTimeout(() => {
      darktheme === "1"
        ? that.toggleDarkTheme(true)
        : that.toggleDarkTheme(false);
    });
  }
  ngAfterViewInit() {
    // this.matSlideToggle.toggle();
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
    localStorage.setItem("cjs-darktheme", checked ? "1" : "0");
  }
  loginGoogle() {
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
    if (!this.email) {
      alert(`Email can't be empty`);
      return;
    }
    if (!this.password) {
      alert(`Password can'tbe empty`);
      return;
    }
    this.afAuth.auth
      .signInWithEmailAndPassword(this.email, this.password)
      .catch(err => {
        // console.log("...err", err);
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
