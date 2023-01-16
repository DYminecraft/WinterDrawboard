import {AfterViewInit, Component, OnDestroy} from "@angular/core";
import {PanelService} from "../panel.service";
import {Subscription} from "rxjs";
import {CanvasService} from "./canvas.service";

// import {fromEvent, debounceTime} from "rxjs";

@Component({
  selector: "app-canvas",
  templateUrl: "./canvas.component.html",
  styleUrls: ["./canvas.component.css"]
})
export class CanvasComponent implements AfterViewInit, OnDestroy {
  // 导入 canvas service
  constructor(private canvasService: CanvasService, private panelService: PanelService) {
  }
  private initalColor: string = "#00ffff80";
  // 定义绘板对象
  canvas: any = {
    // canvas 对象
    id: null,

    // canvas 上下文
    pen: null,

    // 外框高度
    divHeight: 400,

    // 外框宽度
    divWidth: 500,

    // 绘板高度
    canvasHeight: 2800,

    // 绘板宽度
    canvasWidth: 4000,

    // 像素大小
    pixelSize: 50,

    // 鼠标置于像素上的颜色
    pixelHoverColor: this.initalColor,

    // 绘板数据
    data: [
      ["#000000", "#000000", "#000000"],
      ["#111111", "#111111", "#111111"],
      ["#222222", "#222222", "#222222"],
      ["#333333", "#333333", "#333333"],
      ["#444444", "#444444", "#444444"],
      ["#555555", "#555555", "#555555"]
    ]
  };

  // 定义订阅对象
  private subscription: Subscription | null = null;

  // 导入 panel service

  // 绘制绘板，检测鼠标是否 hover
  drawCanvas(clientX: number, clientY: number) {
    // 清除绘板
    this.canvas.pen.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 遍历绘板数据
    for (let i = 0; i < this.canvas.data.length; i++) {
      for (let j = 0; j < this.canvas.data[i].length; j++) {
        // 开始绘画
        this.canvas.pen.beginPath();

        // 指定当前像素绘画位置和大小
        this.canvas.pen.rect(
          j * this.canvas.pixelSize,
          i * this.canvas.pixelSize,
          this.canvas.pixelSize,
          this.canvas.pixelSize
        );
        // 指定当前像素颜色
        this.canvas.pen.fillStyle = this.canvas.pen.isPointInPath(clientX, clientY) ? this.canvas.pixelHoverColor : this.canvas.data[i][j];

        // 画
        this.canvas.pen.fill();
      }
    }
  }

  ngOnDestroy() {
    // 取消订阅，防止内存泄漏
    (this.subscription as Subscription).unsubscribe();
  }

  ngAfterViewInit() {
    // fromEvent(window, "resize")
    //   .pipe(
    //     debounceTime(50) // 以免频繁处理
    //   )
    //   .subscribe((event) => {
    //     this.canvas.canvasHeight = (document.getElementById("content") as HTMLDivElement).scrollHeight;
    //     console.log(this.canvas.canvasHeight);
    //     this.drawCanvas();
    //   });


    // 初始化绘板对象和上下文
    this.canvas.id = document.getElementById("canvas");
    this.canvas.pen = this.canvas.id.getContext("2d");

    // 监听用户选中的颜色
    this.subscription = this.panelService.clientColorListener().subscribe(
      clientColor => {
        this.canvas.pixelHoverColor = clientColor;
      },
      () => {
        console.log("获取用户选中颜色失败");
      }
    );

    // 初始化绘制绘板
    this.drawCanvas(-1, -1);

    // 追踪用户鼠标，hover变色
    this.canvas.id.onmousemove = (e: any) => {
      // 获取绘板相对于视口的位置
      let rect = this.canvas.id.getBoundingClientRect();

      // 获取用户鼠标位置，计算相对于绘板的位置
      let x = e.clientX - rect.left, y = e.clientY - rect.top;

      // 画
      this.drawCanvas(x, y);
    };
  }


}
