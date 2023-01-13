import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {LoginComponent} from "./login/login.component";
import {MainComponent} from "./main/main.component";
import {UserComponent} from "./user/user.component";
import {FeedbackComponent} from "./feedback/feedback.component";
import {CanvasAndSideToolbarComponent} from "./canvas-and-side-toolbar/canvas-and-side-toolbar.component";


const routes: Routes = [
  {path: "", component: MainComponent},
  {path: "main", component: MainComponent},
  {path: "login", component: LoginComponent},
  {path: "canvas", component: CanvasAndSideToolbarComponent},
  {path: "user", component: UserComponent},
  {path: "feedback", component: FeedbackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
