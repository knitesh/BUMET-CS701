import { Component } from "@angular/core";

import { Subject } from "rxjs";
import { MapquestService } from "./mapquest.service";

import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

interface Direction {
  from: string;
  to: string;
}
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  dataItems: any;
  totalDistance: string;
  totalTime: string;
  directions: any;

  // a subject to publish search terms
  private searchFromTerms: Subject<Direction>;

  constructor(private mapquestService: MapquestService) {}

  // Push a search term into the observable stream.
  searchFromLocation(term: Direction): void {
    this.searchFromTerms.next(term);
  }
  searchToLocation(term: Direction): void {
    this.searchFromTerms.next(term);
  }

  ngOnInit() {
    console.log("...ngOniti");
    this.searchFromTerms = new Subject<Direction>();

    this.searchFromTerms
      .pipe(
        // wait 1000ms after each keystroke before considering the term
        debounceTime(1000),
        // ignore new term if same as previous term
        distinctUntilChanged(),
        switchMap((term: Direction) => {
          return this.mapquestService.getDirections(term.from, term.to);
        })
      )
      .subscribe((result: any) => {
        if (result.route) {
          this.totalDistance = `Distance: ${result.route.distance || 0}m`;
          this.totalTime = `Time: ${result.route.formattedTime || 0}`;
          if (result.route.legs) {
            this.directions = result.route.legs[0].maneuvers;
          } else {
            this.directions = [];
          }
        }

        // this.dataItems = result.items;
      });
  }
  ngAfterViewInit() {
    this.searchFromLocation({ from: "Boston, MA", to: "Cambridge, MA" });
  }
}
