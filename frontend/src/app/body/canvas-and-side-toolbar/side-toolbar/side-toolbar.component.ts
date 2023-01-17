import {Component} from "@angular/core";
import {ColorFormat} from "@ng-matero/extensions/colorpicker";
import {SideToolbarService} from "./side-toolbar.service";

@Component({
  selector: "app-side-toolbar",
  templateUrl: "./side-toolbar.component.html",
  styleUrls: ["./side-toolbar.component.css"]
})
export class SideToolbarComponent {
  color = "#00ffffff";
  format: ColorFormat = "hex";

  constructor(private sideToolbarService:SideToolbarService) {
  }
  onZoom(change: number) {
    this.sideToolbarService.onZoom(change);
  }

  onColorChange() {
    this.sideToolbarService.onColorChange(this.color);
  }
}
