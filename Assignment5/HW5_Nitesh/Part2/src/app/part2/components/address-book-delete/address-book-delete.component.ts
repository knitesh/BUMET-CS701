import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Contact } from "../../model/contact";
import { AddressProviderService } from "../../model/address-provider.service";

@Component({
  selector: "app-address-book-delete",
  templateUrl: "./address-book-delete.component.html"
})
export class AddressBookDeleteComponent implements OnInit {
  friend: Contact;
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
      this.friend = this.addressService.getFriend(id);
    } else {
      this.title = "Add Contact";
      this.isEditing = false;
      // this.friend = this.addressService.addFriend();
    }
    console.log(this.friend);
  }
  deleteUser() {
    this.addressService.deleteAddress(this.route.snapshot.params["id"]);
    this.router.navigate(["address"]);
  }
}
