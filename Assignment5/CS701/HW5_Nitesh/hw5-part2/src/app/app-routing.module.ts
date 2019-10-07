import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AddressBookComponent } from "./components/address-book/address-book.component";
import { AddressBookEntryComponent } from "./components/address-book-entry/address-book-entry.component";
import { AddressBookAddEditComponent } from "./components/address-book-add-edit/address-book-add-edit.component";
import { AddressBookDeleteComponent } from "./components/address-book-delete/address-book-delete.component";

const routes: Routes = [
  { path: "", component: AddressBookComponent },
  { path: "details/:id", component: AddressBookEntryComponent },
  { path: "add", component: AddressBookAddEditComponent },
  { path: "edit/:id", component: AddressBookAddEditComponent },
  { path: "delete/:id", component: AddressBookDeleteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
