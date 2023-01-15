import {Component} from "@angular/core";
import {ColorFormat} from "@ng-matero/extensions/colorpicker";

@Component({
  selector: "app-side-toolbar",
  templateUrl: "./side-toolbar.component.html",
  styleUrls: ["./side-toolbar.component.css"]
})
export class SideToolbarComponent {
  color = '#00ffff99';
  format: ColorFormat = 'hex';
}
