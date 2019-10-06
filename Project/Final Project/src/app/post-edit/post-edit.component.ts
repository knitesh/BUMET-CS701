import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FireBasePostService } from "../servcies/posts.service";
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators
} from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-post-edit",
  templateUrl: "./post-edit.component.html",
  styleUrls: ["./post-edit.component.scss"]
})
export class postEditComponent implements OnInit {
  postForm: FormGroup;
  id: string = "";
  title: string = "";
  description: string = "";
  author: string = "";
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fs: FireBasePostService,
    private formBuilder: FormBuilder,
    public afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.getPost(this.route.snapshot.params["id"]);
    this.postForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      link: [null, Validators.required]
    });
  }
  getPost(id) {
    this.fs.getPost(id).subscribe(data => {
      this.id = data.key;
      this.postForm.setValue({
        title: data.title,
        description: data.description,
        link: data.link
      });
    });
  }
  onFormSubmit(form: NgForm) {
    const user = this.afAuth.auth.currentUser;
    const data = {
      ...form,
      auther_id: user.uid,
      author: user.displayName || "anonymous"
    };
    this.fs.updatePost(this.id, data).subscribe(
      res => {
        this.router.navigate(["/posts"]);
      },
      err => {
        console.log(err);
      }
    );
  }
  postDetails() {
    this.router.navigate(["/post-details", this.id]);
  }
}
