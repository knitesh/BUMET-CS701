import { Component, OnInit } from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";

import { Contact } from "../../model/contact";
import { AddressProviderService } from "../../model/address-provider.service";

@Component({
  selector: "app-address-book-add-edit",
  templateUrl: "./address-book-add-edit.component.html"
})
export class AddressBookAddEditComponent implements OnInit {
  friend: Contact;
  origAddress: Contact;
  title: string;
  isEditing: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private addressService: AddressProviderService
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.params["id"];
    if (id) {
      this.title = "Edit Contact";
      this.isEditing = true;
      this.friend = { ...this.addressService.getFriend(id) };
    } else {
      this.title = "Add Contact";
      this.isEditing = false;
      this.friend = {
        id: null,
        name: "",
        address: "",
        phone: ""
      };
    }
  }
  upsertAddress() {
    if (this.isEditing) {
      this.addressService.editAddress(this.friend);
    } else {
      this.addressService.addFriend(this.friend);
    }
    this.router.navigate(["address"]);
  }
  cancel() {
    this.router.navigate(["address"]);
  }
}
