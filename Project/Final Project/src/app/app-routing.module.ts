import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PostsComponent } from "./posts/posts.component";
import { PostDetailComponent } from "./post-detail/post-detail.component";
import { PostCreateComponent } from "./post-create/post-create.component";
import { postEditComponent } from "./post-edit/post-edit.component";
import { AccountComponent } from "./account/account.component";
import { AccountLoginComponent } from "./account-login/account-login.component";

import { AuthGuardService as AuthGuard } from "./core/services/auth.guard.service";

const appRoutes: Routes = [
  {
    path: "account",
    component: AccountComponent,
    data: { title: "My Account" },
    canActivate: [AuthGuard]
  },

  {
    path: "login",
    component: AccountLoginComponent,
    data: { title: "My Account" }
  },
  {
    path: "posts",
    component: PostsComponent,
    data: { title: "Posts List" },
    canActivate: [AuthGuard]
  },
  {
    path: "post-details/:id",
    component: PostDetailComponent,
    data: { title: "Post Details" },
    canActivate: [AuthGuard]
  },
  {
    path: "post-create",
    component: PostCreateComponent,
    data: { title: "Create Post" },
    canActivate: [AuthGuard]
  },
  {
    path: "post-edit/:id",
    component: postEditComponent,
    data: { title: "Edit post" },
    canActivate: [AuthGuard]
  },
  { path: "", redirectTo: "/login", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
