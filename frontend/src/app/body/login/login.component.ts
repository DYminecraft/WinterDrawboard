import {Component} from "@angular/core";
import {NgForm, NgModel} from "@angular/forms";
import {UserModel} from "../user.model";
import {AuthService} from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  clientNameOrNicknameErrorMessage: string = "";
  clientPasswordErrorMessage: string = "";

  constructor(private authService:AuthService) {
  }

  isClientNameOrNicknameInvalid(input: NgModel) {
    if (input.invalid) {
      this.clientNameOrNicknameErrorMessage = "姓名/昵称不能为空";
      return true;
    } else {
      return false;
    }
  }

  isUserPasswordInvalid(input: NgModel) {
    if (input.invalid) {
      this.userPasswordErrorMessage = "密码不能为空";
      return true;
    }
    return false;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.login()
    console.log(enteredUserInformation);
    this.http.post("http://localhost:3000/api/user/login", {data: enteredUserInformation})
      .subscribe((data) => {
        console.log(data);
      });
    form.resetForm();
  }
}
