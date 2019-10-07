import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RootComponent } from "./app.component";
import { MapQuestComponent } from "./part1/mapQuest.component";
import { AddressComponent } from "./part2/address.component";
import { AddressBookComponent } from "./part2/components/address-book/address-book.component";
import { AddressBookEntryComponent } from "./part2/components/address-book-entry/address-book-entry.component";
import { AddressBookAddEditComponent } from "./part2/components/address-book-add-edit/address-book-add-edit.component";
import { AddressBookDeleteComponent } from "./part2/components/address-book-delete/address-book-delete.component";

const routes: Routes = [
  { path: "", component: MapQuestComponent },
  { path: "mapquest", component: MapQuestComponent },
  // { path: "address", component: AddressComponent },
  // { path: "address/details/:id", component: AddressBookEntryComponent },
  // { path: "address/add", component: AddressBookAddEditComponent },
  // { path: "address/edit/:id", component: AddressBookAddEditComponent },
  // { path: "address/delete/:id", component: AddressBookDeleteComponent },
  {
    path: "address",
    component: AddressComponent,
    children: [
      { path: "", component: AddressBookComponent },
      { path: "details/:id", component: AddressBookEntryComponent },
      { path: "add", component: AddressBookAddEditComponent },
      { path: "edit/:id", component: AddressBookAddEditComponent },
      { path: "delete/:id", component: AddressBookDeleteComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
