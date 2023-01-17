import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";

@Injectable({providedIn: "root"})
export class CanvasService {
  private canvasData = new Subject<Array<any>>;

  constructor(private http: HttpClient) {
  }

  canvasDataListener() {
    return this.canvasData.asObservable();
  }

  getCanvas() {
    this.http.get<{ message: string, data: Array<any> }>("http://localhost:3000/api/canvas/get").subscribe(
      response => {
        this.canvasData.next(response.data);
      }
    );
  }
}
