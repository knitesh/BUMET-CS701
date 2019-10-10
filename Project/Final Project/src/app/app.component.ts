import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Observable } from "rxjs";
// import * as firestore from "firebase/firestore";

import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { MatSlideToggle } from "@angular/material";

import { ThemeService } from "./core/services/theme.service";
import { UserService } from "./core/services/user.service";

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
    private userService: UserService,
    public afAuth: AngularFireAuth
  ) {}
  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;

    // this.themeService.setDarkTheme(true);
    const that = this;
    const darktheme = localStorage.getItem("cjs-darktheme");
    // else that.darkThemeSlider.checked = false;
    setTimeout(() => {
      darktheme === "1"
        ? that.toggleDarkTheme(true)
        : that.toggleDarkTheme(false);
    });
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
    localStorage.setItem("cjs-darktheme", checked ? "1" : "0");
  }
  loginGoogle() {
    this.userService.loginGoogle().catch(err => {
      console.log(err);
      this.authError = err.message;
    });
  }
  loginGithub() {
    this.userService.loginGithub().catch(err => {
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
    this.userService
      .loginUsingPassWord(this.email, this.password)
      .catch(err => {
        // console.log("...err", err);
        alert(err.message);
      });
  }
  logout() {
    this.userService.logout();
  }
  doRegister() {
    this.userService.doRegister(this.email, this.password).catch(err => {
      console.log(err);
      alert(err.message);
    });
  }
}
