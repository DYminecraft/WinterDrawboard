import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {LoginComponent} from "./body/login/login.component";
import {MainComponent} from "./body/main/main.component";
import {UserComponent} from "./body/user/user.component";
import {FeedbackComponent} from "./body/feedback/feedback.component";
import {CanvasAndSideToolbarComponent} from "./body/canvas-and-side-toolbar/canvas-and-side-toolbar.component";
import {AuthGuard} from "./auth.guard";


const routes: Routes = [
  {path: "login", component: LoginComponent},
  {
    path: "canvas", component: CanvasAndSideToolbarComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "user", component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "feedback", component: FeedbackComponent,
    canActivate: [AuthGuard]
  },
  {path: "**", component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {

}
