import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Contact } from "../../model/contact";
import { AddressProviderService } from "../../model/address-provider.service";

@Component({
  selector: "app-address-book-delete",
  templateUrl: "./address-book-delete.component.html",
  styleUrls: ["./address-book-delete.component.css"]
})
export class AddressBookDeleteComponent implements OnInit {
  // instance variables
  friend: Contact;
  title: string;
  isEditing: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private addressService: AddressProviderService
  ) {}

  ngOnInit() {}
  // function to delete user
  deleteUser() {
    // address ervice to delete user from mock data
    this.addressService.deleteAddress(this.route.snapshot.params["id"]);
    // navigate to main page
    this.router.navigate(["/"]);
  }
}
