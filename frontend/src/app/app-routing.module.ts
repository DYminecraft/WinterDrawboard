import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {LoginComponent} from "./body/login/login.component";
import {MainComponent} from "./body/main/main.component";
import {UserComponent} from "./body/user/user.component";
import {FeedbackComponent} from "./body/feedback/feedback.component";
import {CanvasAndSideToolbarComponent} from "./body/canvas-and-side-toolbar/canvas-and-side-toolbar.component";


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
