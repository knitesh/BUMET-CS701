import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FireBasePostService } from "../servcies/posts.service";

@Component({
  selector: "app-posts-detail",
  templateUrl: "./post-detail.component.html",
  styleUrls: ["./post-detail.component.scss"]
})
export class PostDetailComponent implements OnInit {
  post = {};
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fs: FireBasePostService
  ) {}

  ngOnInit() {
    // console.log(this.route.snapshot.params);
    this.getPostDetails(this.route.snapshot.params["id"]);
  }
  getPostDetails(id) {
    this.fs.getPost(id).subscribe(data => {
      console.log(data);
      this.post = data;
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
}
