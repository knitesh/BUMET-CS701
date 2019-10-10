import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private afAuth: AngularFireAuth) {}
  getCurrentUser() {
    return this.afAuth.auth.currentUser;
  }

  loginGoogle() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  loginGithub() {
    return this.afAuth.auth.signInWithPopup(new auth.GithubAuthProvider());
  }
  loginUsingPassWord(email, password) {
    if (!email) {
      alert(`Email can't be empty`);
      return;
    }
    if (!password) {
      alert(`Password can'tbe empty`);
      return;
    }
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    return this.afAuth.auth.signOut();
  }
  doRegister(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }
}
