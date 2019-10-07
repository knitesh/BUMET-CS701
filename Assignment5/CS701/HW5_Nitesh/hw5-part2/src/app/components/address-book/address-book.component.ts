import { Component, OnInit } from "@angular/core";

import { Contact } from "../../model/contact";
import { AddressProviderService } from "../../model/address-provider.service";

@Component({
  selector: "app-address-book",
  templateUrl: "./address-book.component.html",
  styleUrls: ["./address-book.component.css"]
})
export class AddressBookComponent implements OnInit {
  friends: Contact[];

  // inject addressprovider service
  constructor(private provider: AddressProviderService) {}

  // initialize friends array
  ngOnInit() {
    this.friends = this.provider.getFriends();
  }
}
