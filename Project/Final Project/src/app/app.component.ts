import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";
// import * as firestore from "firebase/firestore";
import { AngularFirestore } from "@angular/fire/firestore";

const settings = { timestampsInSnapshots: true };
const config = {
  apiKey: "AIzaSyA5oxl7cibZ_FomInDs8RlsuD8UmpVeNr8",
  authDomain: "ng-collectorjs.firebaseapp.com",
  databaseURL: "https://ng-collectorjs.firebaseio.com",
  projectId: "ng-collectorjs",
  storageBucket: "",
  messagingSenderId: "888721129443",
  appId: "1:888721129443:web:2dfa5538cf12d1ade32ad6",
  measurementId: "G-XZ9E6RGQFT"
};

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "angular6-firestore";
  constructor(db: AngularFirestore) {}
  ngOnInit() {
    // firebase.initializeApp(config);
    // firebase.firestore().settings(settings);
  }
}
