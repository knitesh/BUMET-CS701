import { Component } from "@angular/core";

import { Subject } from "rxjs";
import { MapquestService } from "./mapquest.service";

import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

// Interface for direction object
interface Direction {
  from: string;
  to: string;
}
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  //instance variables
  dataItems: any;
  totalDistance: string;
  totalTime: string;
  directions: any;

  // a subject to publish search terms
  private searchFromTerms: Subject<Direction>;

  // Injecting mapquestService
  constructor(private mapquestService: MapquestService) {}

  // Push a search term into the observable stream.
  searchFromLocation(term: Direction): void {
    this.searchFromTerms.next(term);
  }
  // handle changes for search to location
  searchToLocation(term: Direction): void {
    this.searchFromTerms.next(term);
  }

  ngOnInit() {
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
          // get total distance string
          this.totalDistance = `Distance: ${result.route.distance || 0}m`;
          // get totaltime string
          this.totalTime = `Time: ${result.route.formattedTime || 0}`;
          // get route legs
          if (result.route.legs) {
            this.directions = result.route.legs[0].maneuvers;
          } else {
            this.directions = [];
          }
        }

        // this.dataItems = result.items;
      });
  }
  // set default value durin initial load
  ngAfterViewInit() {
    this.searchFromLocation({ from: "Boston, MA", to: "Cambridge, MA" });
  }
}
