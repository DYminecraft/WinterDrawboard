import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PanelService {
  // service 必有
  constructor() {
  }

  // 定义默认选中颜色
  private initalColor: string = "#00ffff80";

  // 获取默认选中颜色
  getInitalColor() {
    return this.initalColor;
  }

  // 用户当前选中颜色
  private clientColor = new Subject<string>();

  // 获取用户当前选中颜色 到订阅中
  exportClientColor(color: string) {
    this.clientColor.next(color);
  }

  // 外部订阅接口
  clientColorListener() {
    return this.clientColor.asObservable();
  }
}
