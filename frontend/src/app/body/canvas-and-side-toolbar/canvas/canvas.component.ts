import {Component} from "@angular/core";

// import {fromEvent, debounceTime} from "rxjs";

@Component({
  selector: "app-canvas",
  templateUrl: "./canvas.component.html",
  styleUrls: ["./canvas.component.css"]
})
export class CanvasComponent {
  canvas: any = {
    id: null,
    pen: null,
    divHeight: 500,
    divWidth: 1000,
    canvasHeight: 2800,
    canvasWidth: 4000,
    pixelSize: 50,
    data: [
      ["000000", "000000", "000000"],
      ["111111", "111111", "111111"],
      ["222222", "222222", "222222"],
      ["333333", "333333", "333333"],
      ["444444", "444444", "444444"],
      ["555555", "555555", "555555"]
    ]
  };

  getDivStyle() {
    return {"height": this.canvas.divHeight + "px", "width": this.canvas.divWidth + "px"};
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
    this.drawCanvas();
    this.canvas.id.onmousemove = (e: any) => {
      let rect = this.canvas.id.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;
      // console.log(x, y);
      this.canvas.pen.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (let i = 0; i < this.canvas.data.length; i++) {
        for (let j = 0; j < this.canvas.data[i].length; j++) {
          this.canvas.pen.beginPath();
          this.canvas.pen.rect(
            j * this.canvas.pixelSize,
            i * this.canvas.pixelSize,
            this.canvas.pixelSize,
            this.canvas.pixelSize
          );
          this.canvas.pen.fillStyle = this.canvas.pen.isPointInPath(x, y) ? "yellow" : "#" + this.canvas.data[i][j];
          this.canvas.pen.fill();
        }
      }
    };
  }

  drawCanvas() {
    this.canvas.id = document.getElementById("canvas");
    this.canvas.pen = this.canvas.id.getContext("2d");
    for (let i = 0; i < this.canvas.data.length; i++) {
      for (let j = 0; j < this.canvas.data[i].length; j++) {
        this.canvas.pen.fillStyle = "#" + this.canvas.data[i][j];
        this.canvas.pen.fillRect(
          j * this.canvas.pixelSize,
          i * this.canvas.pixelSize,
          this.canvas.pixelSize,
          this.canvas.pixelSize
        );
      }
    }
  }
}
