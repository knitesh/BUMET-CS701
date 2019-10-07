import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MapquestService {
  constructor(private http: HttpClient) {}
  getDirections(from: string, to: string): Observable<any> {
    const KEY = "7r4mAyMHeVfWhPJe9BAYMbwPlDFeCVAL";

    let url: string = `http://open.mapquestapi.com/directions/v2/route?key=${KEY}&from=${from}&to=${to}`;

    return this.http.jsonp(url, "callback");
  }
}

//http://open.mapquestapi.com/directions/v2/route?key=KEY&from=Clarendon Blvd,Arlington,VA&to=2400+S+Glebe+Rd,+Arlington,+VA
