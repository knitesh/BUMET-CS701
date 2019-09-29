import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

// Local Imports
import { AppComponent } from "./app.component";
import { Part1Component } from "./part1/part1.component";
import { Part2Component } from "./part2/part2.component";
import { TokenizerPipe } from "./part2/tokenizer.pipe";
// Main Angular module to bootstrap AppComponent
@NgModule({
  declarations: [AppComponent, Part1Component, Part2Component, TokenizerPipe],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
