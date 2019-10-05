import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FireBasePostService } from "../servcies/posts.service";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-posts-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.scss"]
})
export class PostCreateComponent implements OnInit {
  postsForm: FormGroup;
  title: string = "";
  description: string = "";
  author: string = "";
  constructor(
    private router: Router,
    private fs: FireBasePostService,
    private formBuilder: FormBuilder,
    public afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.postsForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      link: [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    // get form data
    const creationTime = Date.now();
    const user = this.afAuth.auth.currentUser;

    console.log("....user", user);
    const updateData = {
      ...form,
      creationTime: creationTime,
      auther_id: user.uid,
      author: user.displayName || "anonymous"
    };
    this.fs.createPost(updateData).subscribe(
      res => {
        let id = res["key"];
        this.router.navigate(["/post-details", id]);
      },
      err => {
        console.log(err);
      }
    );
  }
}
