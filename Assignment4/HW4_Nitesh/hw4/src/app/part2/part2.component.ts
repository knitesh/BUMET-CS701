import { Component, OnInit } from "@angular/core";

// Component decorators
@Component({
  selector: "app-part2",
  templateUrl: "./part2.component.html"
})
// Part 2 Component
export class Part2Component implements OnInit {
  // declare instance variables
  strInput = "Angular is awesome";
  strDelimiter = ",";

  // and empty constructor
  constructor() {}

  // lifecycle hook that is called after Angular has initialized all data-bound properties of a directive
  ngOnInit() {}
}
