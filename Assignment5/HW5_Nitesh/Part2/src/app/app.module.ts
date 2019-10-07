import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";

import { RootComponent } from "./app.component";

import { ButtonsModule } from "ngx-bootstrap/buttons";

import { MapQuestComponent } from "./part1/mapQuest.component";
import { AddressBookComponent } from "./part2/components/address-book/address-book.component";
import { AddressBookEntryComponent } from "./part2/components/address-book-entry/address-book-entry.component";
import { AddressBookAddEditComponent } from "./part2/components/address-book-add-edit/address-book-add-edit.component";

import { AppRoutingModule } from "./app-routing.module";

import { AddressBookDeleteComponent } from "./part2/components/address-book-delete/address-book-delete.component";
import { AddressComponent } from "./part2/address.component";

@NgModule({
  declarations: [
    RootComponent,
    MapQuestComponent,
    AddressComponent,
    AddressBookComponent,
    AddressBookEntryComponent,
    AddressBookAddEditComponent,
    AddressBookDeleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule,
    ButtonsModule.forRoot()
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule {}
