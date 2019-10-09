import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FireBasePostService } from "../servcies/posts.service";
import { UserService } from "./../core/services/user.service";
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-posts-detail",
  templateUrl: "./post-detail.component.html",
  styleUrls: ["./post-detail.component.scss"]
})
export class PostDetailComponent implements OnInit {
  post: any;
  canEdit: boolean;
  comments: any;

  commentForm: FormGroup;
  comment: string = "";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fs: FireBasePostService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // console.log(this.route.snapshot.params);
    this.getPostDetails(this.route.snapshot.params["id"]);
    this.commentForm = this.formBuilder.group({
      comment: [null, Validators.required]
    });
  }
  getPostDetails(id) {
    this.fs.getPost(id).subscribe(data => {
      console.log(data);
      this.post = data;
      this.comments = data.comments.sort(
        (a, b) => b.creationTime - a.creationTime
      );
      this.canEdit =
        this.post.authorId === this.userService.getCurrentUser().uid;
    });
  }
  deletePost(id) {
    this.fs.deletePost(id).subscribe(
      res => {
        this.router.navigate(["/posts"]);
      },
      err => {
        console.log(err);
      }
    );
  }
  onCommentFormSubmit(form: NgForm) {
    // get form data
    const creationTime = Date.now();
    const user = this.userService.getCurrentUser();

    const updateData = {
      ...this.post,
      comments: [
        ...this.post.comments,
        {
          ...form,
          displayName: user.displayName || "anonymous",
          creationTime: creationTime,
          autor: user.uid
        }
      ]
    };

    this.fs.createComment(updateData, this.post.key);
    this.commentForm.reset({ onlySelf: true, emitEvent: false });
    this.getPostDetails(this.post.key);
  }
}
