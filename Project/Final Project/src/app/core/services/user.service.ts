import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private afAuth: AngularFireAuth) {}
  getCurrentUser() {
    return this.afAuth.auth.currentUser;
  }
}
