import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
// import * as firestore from "firebase/firestore";
import { AngularFirestore } from "@angular/fire/firestore";
import { ThemeService } from "./core/services/theme.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "CollectorJS - MET 701";
  isDarkTheme: Observable<boolean>;
  constructor(private themeService: ThemeService) {}
  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
    // firebase.initializeApp(config);
    // firebase.firestore().settings(settings);
  }
  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }
}
