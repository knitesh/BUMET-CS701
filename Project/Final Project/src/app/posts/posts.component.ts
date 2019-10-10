import { Component, OnInit } from "@angular/core";

import { FireBasePostService } from "../core/services/posts.service";
import { UserService } from "../core/services/user.service";

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
  constructor(
    private readonly db: AngularFirestore,
    private postService: FireBasePostService,
    private userService: UserService
  ) {
    this.postCollection = db.collection("posts");
    this.posts = postService.getPosts();
  }
  upVote(postId) {
    const currentUserId = this.userService.getCurrentUser().uid;
    // console.log(currentUserId);
    // alert(postId);
    // get the current post
    this.postService.getPost(postId).subscribe(data => {
      const post = data;
      console.log("...post", post);
      //get upvote and downvote object
      let upVote = post.upVote;
      const downVote = post.downVote;
      // check if user has upVoted, if yes ignore else add upvote
      const upVoteIndex = upVote.indexOf(currentUserId);
      if (upVoteIndex === -1) {
        upVote.push(currentUserId);
        // console.log("...Upvoting", { ...post, upVote, downVote });
        this.postService
          .updatePost(postId, {
            ...post,
            upVote,
            downVote: downVote.filter(id => id !== currentUserId)
          })
          .subscribe(
            res => {
              // this.router.navigate(["/posts"]);
            },
            err => {
              // console.log(err);
            }
          );
      }
    });
  }
  downVote(postId) {
    // alert(postId);
    const currentUserId = this.userService.getCurrentUser().uid;
    // console.log(currentUserId);
    // alert(postId);
    // get the current post
    this.postService.getPost(postId).subscribe(data => {
      const post = data;
      // console.log("...post", post);

      //get upvote and downvote object
      const upVote = post.upVote;
      let downVote = post.downVote;
      //check if user has downvoted this link
      const downVoteIndex = downVote.indexOf(currentUserId);
      // if user has downvoted, remove the downVote
      if (downVoteIndex === -1) {
        downVote.push(currentUserId);
      }
      // console.log("...Upvoting", { ...post, upVote, downVote });
      this.postService
        .updatePost(postId, {
          ...post,
          upVote: upVote.filter(id => id !== currentUserId),
          downVote
        })
        .subscribe(
          res => {
            // this.router.navigate(["/posts"]);
          },
          err => {
            // console.log(err);
          }
        );
    });
  }
}
