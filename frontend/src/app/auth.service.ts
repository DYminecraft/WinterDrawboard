import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import * as http from "http";
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({providedIn: "root"})
export class AuthService {
  constructor(private http: HttpClient,
              private router: Router) {
  }

  // 用户 token
  private token: string;

  // 计时器
  private timer: NodeJS.Timeout;

  // 登录状态
  private isLoggedIn: boolean = false;
  private isLoggedInSubject = new Subject<boolean>();

  // 给 auth guard 用，获取 token
  getTokenForInterceptor() {
    return this.token;
  }

  // 给?用，获取登录状态
  getIsLoggedIn() {
    return this.isLoggedIn;
  }

  // 给其余组件用，获取登录状态
  isLoggedInListener() {
    return this.isLoggedInSubject.asObservable();
  }

  // 刷新浏览器后，尝试自动登录
  userAutoLogin() {
    // 尝试获取浏览器存储的 clientData
    const clientData = this.getClientData();

    // 如果没有，直接返回
    if (!clientData) return;

    // 如果有，先看看过没过期。获取一下服务器时间
    this.http.get<{ message: string, now: number }>("http://localhost:3000/api/now").subscribe(
      response => {
        // 比较一下
        const isInFuture: boolean = clientData.expireDate.getTime() > response.now;

        // 如果过期了，直接返回
        if (!isInFuture)
          return;

        // 如果没过期，①设置剩余时间后自动登出，保存计时器到 timer
        let expiresIn = clientData.expireDate.getTime() - response.now;
        this.timer = setTimeout(() => {
          this.userLogout();
        }, expiresIn);

        // ②登录咯
        this.login(clientData.token);
      }
    );
  }

  // 用户登录
  userLogin(clientNameOrNickname: string, clientPassword: string) {
    // 打包用户信息
    const body = {
      nameOrNickname: clientNameOrNickname,
      password: clientPassword
    };

    // 后端找有无用户
    this.http.post<{ message: string, token: string, expiresIn: number, now: number }>("http://localhost:3000/api/user/login", body)
      .subscribe(
        response => {
          // 如果没有用户，直接返回
          if (!response.token)
            return;

          // 如果有用户，①设置1h后自动登出，保存计时器到 timer
          this.timer = setTimeout(() => {
            this.userLogout();
          }, response.expiresIn * 1000);

          // ②计算 token 的到期日期，保存 ClientData 到浏览器
          let expireDate = new Date(response.now + response.expiresIn * 1000);
          this.saveClientData(this.token, expireDate);

          // ③登录咯
          this.login(response.token);
        });
  };

  // 用户登出
  userLogout() {
    // 更新 auth service 登录状态和 token 数据
    this.isLoggedIn = false;
    this.isLoggedInSubject.next(this.isLoggedIn);
    this.token = "";

    // 取消 timer
    clearTimeout(this.timer);

    // 删除浏览器保存的 token
    this.deleteClientData();

    // 重定向到 main
    this.router.navigate(["/main"]);
  }

  // 如果用户信息合法，登录要做的那些事儿
  private login(clientToken: string) {
    // 更新 auth service 登录状态和 token 数据
    this.isLoggedIn = true;
    this.isLoggedInSubject.next(this.isLoggedIn);
    this.token = clientToken;

    // 重定向到 canvas
    this.router.navigate(["/canvas"]);
  }

  // 获取浏览器存储的 clientData
  private getClientData() {
    const token = localStorage.getItem("token");
    const expireDate = localStorage.getItem("expireDate");

    // 如果没有，直接返回
    if (!token || !expireDate) return;

    // 如果有，返回数据
    return {token: token, expireDate: new Date(expireDate)};
  }

  // 保存/覆盖 clientData 到浏览器
  private saveClientData(token: string, expireDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expireDate", expireDate.toISOString());
  }

  // 删除浏览器存储的 clientData
  private deleteClientData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expireDate");
  }
}
