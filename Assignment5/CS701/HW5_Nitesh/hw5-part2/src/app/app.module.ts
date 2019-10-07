import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";

import { ButtonsModule } from "ngx-bootstrap/buttons";

import { AddressBookComponent } from "./components/address-book/address-book.component";
import { AddressBookEntryComponent } from "./components/address-book-entry/address-book-entry.component";
import { AddressBookAddEditComponent } from "./components/address-book-add-edit/address-book-add-edit.component";

import { AppRoutingModule } from "./app-routing.module";

import { AddressBookDeleteComponent } from "./components/address-book-delete/address-book-delete.component";

@NgModule({
  declarations: [
    AppComponent,
    AddressBookComponent,
    AddressBookEntryComponent,
    AddressBookAddEditComponent,

    AddressBookDeleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
