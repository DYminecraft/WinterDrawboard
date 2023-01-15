import {Injectable} from "@angular/core";
import {UserModel} from "./user.model";

@Injectable({providedIn: "root"})
export class AuthService {
  login(clientNameOrNickname: string, clientPassword:string) {
    const clientUser: UserModel = {
      id: "",
      name: clientNameOrNickname,
      nickname: clientNameOrNickname,
      password: clientPassword
    };
  }
}
