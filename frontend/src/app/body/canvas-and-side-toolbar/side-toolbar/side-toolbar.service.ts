import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({providedIn: "root"})
export class SideToolbarService {
  private zoomSubject = new Subject<number>;
  private colorChangeSubject = new Subject<string>;

  zoomListener() {
    return this.zoomSubject.asObservable();
  }

  colorChangeListener() {
    return this.colorChangeSubject.asObservable();
  }


  onZoom(change: number) {
    this.zoomSubject.next(change);
  }

  onColorChange(color: string) {
    this.colorChangeSubject.next(color);
  }
}
