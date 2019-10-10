import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PostsComponent } from "./posts/posts.component";
import { PostDetailComponent } from "./post-detail/post-detail.component";
import { PostCreateComponent } from "./post-create/post-create.component";
import { postEditComponent } from "./post-edit/post-edit.component";
import { AccountComponent } from "./account/account.component";

const appRoutes: Routes = [
  {
    path: "posts",
    component: PostsComponent,
    data: { title: "Posts List" }
  },
  {
    path: "account",
    component: AccountComponent,
    data: { title: "My Account" }
  },
  {
    path: "post-details/:id",
    component: PostDetailComponent,
    data: { title: "Post Details" }
  },
  {
    path: "post-create",
    component: PostCreateComponent,
    data: { title: "Create Post" }
  },
  {
    path: "post-edit/:id",
    component: postEditComponent,
    data: { title: "Edit post" }
  },
  { path: "", redirectTo: "/posts", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
