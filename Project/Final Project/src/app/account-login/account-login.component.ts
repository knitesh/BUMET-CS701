import { Component, OnInit } from "@angular/core";
import { UserService } from "../core/services/user.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Component({
  selector: "app-account-login",
  templateUrl: "./account-login.component.html",
  styleUrls: ["./account-login.component.scss"]
})
export class AccountLoginComponent implements OnInit {
  password: string;
  email: string;
  authError: string;

  constructor(
    private userService: UserService,
    public afAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {}

  naigateToPost() {
    this.router.navigate(["/posts"]);
  }
  loginGoogle() {
    this.userService
      .loginGoogle()
      .catch(err => {
        console.log(err);
        this.authError = err.message;
      })
      .then(() => this.naigateToPost());
  }
  loginGithub() {
    this.userService
      .loginGithub()
      .catch(err => {
        console.log(err);
        this.authError = err.message;
      })
      .then(() => this.naigateToPost());
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
      })
      .then(() => this.naigateToPost());
  }

  doRegister() {
    this.userService
      .doRegister(this.email, this.password)
      .catch(err => {
        console.log(err);
        alert(err.message);
      })
      .then(() => this.naigateToPost());
  }
}
