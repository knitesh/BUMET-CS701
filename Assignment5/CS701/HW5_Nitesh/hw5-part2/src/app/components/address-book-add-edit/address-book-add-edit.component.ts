import { Component, OnInit } from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";

import { Contact } from "../../model/contact";
import { AddressProviderService } from "../../model/address-provider.service";

@Component({
  selector: "app-address-book-add-edit",
  templateUrl: "./address-book-add-edit.component.html",
  styleUrls: ["./address-book-add-edit.component.css"]
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
      // User editing screen
      this.title = "Edit Contact";
      this.isEditing = true;
      this.friend = { ...this.addressService.getFriend(id) };
    } else {
      // Add screen set up default variable
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
  //function to update or insert user
  upsertAddress() {
    if (this.isEditing) {
      // user editing contact
      this.addressService.editAddress(this.friend);
      this.router.navigate(["/"]);
    } else {
      // user adding new contacts
      this.addressService.addFriend(this.friend);
      this.router.navigate(["/"]);
    }
  }
  // function to handle cancel
  cancel() {
    // navigate to main router
    this.router.navigate(["/"]);
  }
}
