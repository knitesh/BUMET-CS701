import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Observable } from "rxjs";

import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
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

  isDarkTheme: Observable<boolean>;
  constructor(
    private themeService: ThemeService,
    private userService: UserService,
    public afAuth: AngularFireAuth,
    private router: Router
  ) {
    if (this.userService.getCurrentUser() === null) {
      this.router.navigate(["/login"]);
    }
  }
  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
    console.log(this.userService.getCurrentUser());

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
  l;
  logout() {
    this.userService.logout();
    this.router.navigate(["/login"]);
  }
}
