import {Component} from "@angular/core";
import {Router, NavigationEnd, Event} from "@angular/router";
import {filter, Subscription} from "rxjs";


@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent {

  private subscription!: Subscription;
  private currentUrl: string = "";
  userNameOrNickname: string = "Annst";

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(
        (event: Event) => {
          this.currentUrl = (event as NavigationEnd).urlAfterRedirects;
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private urlForLoggedInUser: string[] = ["/canvas", "/user", "/feedback"];

  isLogIn() {
    return this.urlForLoggedInUser.indexOf(this.currentUrl) > -1;
  }
}
