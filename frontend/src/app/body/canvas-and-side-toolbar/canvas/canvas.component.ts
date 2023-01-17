import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {CanvasService} from "./canvas.service";
import {SideToolbarService} from "../side-toolbar/side-toolbar.service";

// import {fromEvent, debounceTime} from "rxjs";

@Component({
  selector: "app-canvas",
  templateUrl: "./canvas.component.html",
  styleUrls: ["./canvas.component.css"]
})
export class CanvasComponent implements OnInit, OnDestroy {
  private canvas: any = {
    id: null,
    pen: null,
    pixelSize: 10,
    pixelHoverColor: "00ffffff",
    width: 10 * 400,
    height: 10 * 240,
    divWidth: 400,
    divHeight: 300,
    data: []
  };

  constructor(private sideToolbarService: SideToolbarService,
              private canvasService: CanvasService) {
  }

  private subscription: Subscription;

  ngOnInit() {
    this.subscription = this.sideToolbarService.zoomListener().subscribe(
      response => this.onZoom(response)
    );
    this.subscription.add(this.sideToolbarService.colorChangeListener().subscribe(
      response => this.onColorChange(response)
    ));

    this.subscription.add(this.canvasService.canvasDataListener().subscribe(
      response => {
        this.canvas.data = response;
        console.log(response);
        this.drawCanvas(-1, -1);
      }
    ));

    this.canvas.id = document.getElementById("canvas");
    this.canvas.pen = this.canvas.id.getContext("2d");
    this.canvas.height = this.canvas.pixelSize * 240;
    this.canvas.width = this.canvas.pixelSize * 400;
    this.canvasService.getCanvas();

    // 追踪用户鼠标，hover变色
    this.canvas.id.onmousemove = (e: any) => {
      // 获取绘板相对于视口的位置
      let rect = this.canvas.id.getBoundingClientRect();

      // 获取用户鼠标位置，计算相对于绘板的位置
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;

      // 画
      this.drawCanvas(x, y);
    };
  }

  onZoom(change: number) {
    console.log(change);
  }

  onColorChange(color: string) {
    console.log(color);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getDivWidth() {
    return this.canvas.divWidth;
  }

  getDivHeight() {
    return this.canvas.divHeight;
  }
  getWidth() {
    return this.canvas.width;
  }

  getHeight() {
    return this.canvas.height;
  }

  private drawCanvas(clientX: number, clientY: number) {
    // 清除绘板
    this.canvas.pen.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.canvas.data.length; i++) {
      // 开始绘画
      this.canvas.pen.beginPath();

      // 获取当前像素位置、颜色
      let x = this.canvas.data[i].x;
      let y = this.canvas.data[i].y;
      let color = this.canvas.data[i].color;

      // 指定当前像素绘画位置和大小
      this.canvas.pen.rect(
        x * this.canvas.pixelSize,
        y * this.canvas.pixelSize,
        this.canvas.pixelSize,
        this.canvas.pixelSize
      );

      // 指定当前像素颜色
      this.canvas.pen.fillStyle = this.canvas.pen.isPointInPath(clientX, clientY) ? this.canvas.pixelHoverColor : color;
      // 结束绘画
      this.canvas.pen.fill();
    }
  }

  // // 定义订阅对象
  // private subscription: Subscription | null = null;
  //
  // // 绘制绘板，检测鼠标是否 hover
  // drawCanvas(clientX: number, clientY: number) {
  //
  //
  //   // 遍历绘板数据
  //   for (let i = 0; i < this.canvas.data.length; i++) {
  //     for (let j = 0; j < this.canvas.data[i].length; j++) {
  //
  //
  //
  //
  //
  //     }
  //   }
  // }
  //
  // ngAfterViewInit() {
  //   // fromEvent(window, "resize")
  //   //   .pipe(
  //   //     debounceTime(50) // 以免频繁处理
  //   //   )
  //   //   .subscribe((event) => {
  //   //     this.canvas.canvasHeight = (document.getElementById("content") as HTMLDivElement).scrollHeight;
  //   //     console.log(this.canvas.canvasHeight);
  //   //     this.drawCanvas();
  //   //   });
  //
  //   // 监听用户选中的颜色
  //   this.subscription = this.panelService.clientColorListener().subscribe(
  //     clientColor => {
  //       this.canvas.pixelHoverColor = clientColor;
  //     },
  //     () => {
  //       console.log("获取用户选中颜色失败");
  //     }
  //   );
  //
  //   // 初始化绘制绘板
  //   this.drawCanvas(-1, -1);
  //
  //
  // }
}
