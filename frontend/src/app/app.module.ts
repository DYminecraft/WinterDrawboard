import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing.module";
import {HeaderComponent} from "./header/header.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {NgOptimizedImage} from "@angular/common";
import {FooterComponent} from "./footer/footer.component";
import {MatButtonModule} from "@angular/material/button";
import {MainComponent} from "./main/main.component";
import {LoginComponent} from "./login/login.component";
import {CanvasComponent} from "./canvas/canvas.component";
import {UserComponent} from "./user/user.component";
import {FeedbackComponent} from "./feedback/feedback.component";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {SideToolbarComponent} from "./side-toolbar/side-toolbar.component";
import {CanvasAndSideToolbarComponent} from "./canvas-and-side-toolbar/canvas-and-side-toolbar.component";
import {BodyComponent} from "./body/body.component";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MtxColorpickerModule} from "@ng-matero/extensions/colorpicker";
import {MatMenuModule} from "@angular/material/menu";
import {NgScrollbarModule} from "ngx-scrollbar";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    LoginComponent,
    CanvasComponent,
    UserComponent,
    FeedbackComponent,
    SideToolbarComponent,
    CanvasAndSideToolbarComponent,
    BodyComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        NgOptimizedImage,
        MatButtonModule,
        AppRoutingModule,
        MatCardModule,
        MatIconModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MtxColorpickerModule,
        MatMenuModule,
        NgScrollbarModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
