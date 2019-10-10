import { Component, OnInit } from "@angular/core";

import { FireBasePostService } from "../core/services/posts.service";

import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IPost } from "../interfaces/post";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"]
})
export class PostsComponent {
  private postCollection: AngularFirestoreCollection<IPost>;
  posts: Observable<any[]>;
  constructor(private readonly db: AngularFirestore, fs: FireBasePostService) {
    this.postCollection = db.collection("posts");
    this.posts = fs.getPosts();
  }
}
