import {Component, OnInit} from "@angular/core";
import {NgForm, NgModel} from "@angular/forms";
import {AuthService} from "../../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  clientNameOrNicknameErrorMessage: string = "";
  clientPasswordErrorMessage: string = "";

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.userAutoLogin();
  }

  isClientNameOrNicknameInvalid(input: NgModel) {
    if (input.invalid) {
      this.clientNameOrNicknameErrorMessage = "姓名/昵称不能为空";
      return true;
    } else {
      return false;
    }
  }

  isClientPasswordInvalid(input: NgModel) {
    if (input.invalid) {
      this.clientPasswordErrorMessage = "密码不能为空";
      return true;
    }
    return false;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.userLogin(
      form.value.clientNameOrNickname,
      form.value.clientPassword);

    form.resetForm();
  }
}
