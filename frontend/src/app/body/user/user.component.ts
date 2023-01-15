import {Component} from "@angular/core";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent {
  userName: string = "董一玮";
  userNickname: string = "Annst";
  userPassword: string = "AnnstPassword";
}
