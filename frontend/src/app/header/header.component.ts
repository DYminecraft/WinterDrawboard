import {Component, OnDestroy, OnInit} from "@angular/core";
import {AuthService} from "../auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) {
  }

  userNameOrNickname: string = "Annst";

  isClientLoggedIn: boolean = false;
  private subscription: Subscription;
  ngOnInit() {
    this.subscription = this.authService.isLoggedInListener().subscribe(
      isLoggedIn => {
        this.isClientLoggedIn = isLoggedIn;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onLogout() {
    this.authService.userLogout();
  }
}
