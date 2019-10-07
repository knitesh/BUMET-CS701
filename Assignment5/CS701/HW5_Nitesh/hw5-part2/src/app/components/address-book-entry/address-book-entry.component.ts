import { Component, OnInit, OnDestroy } from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";

import { Contact } from "../../model/contact";
import { AddressProviderService } from "../../model/address-provider.service";

@Component({
  selector: "app-address-book-entry",
  templateUrl: "./address-book-entry.component.html",
  styleUrls: ["./address-book-entry.component.css"]
})
export class AddressBookEntryComponent implements OnInit, OnDestroy {
  // instance variables
  friend: Contact;
  sub: any;
  totalContacts: number;
  addresses: any;
  firstElement: number;
  lastElement: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private provider: AddressProviderService
  ) {}

  ngOnInit() {
    // assign to service
    this.addresses = this.provider.getFriends();
    // total length of the address array
    this.totalContacts = this.addresses.length;
    // get the first element
    this.firstElement = this.addresses[0].id;
    // get the second element
    this.lastElement = this.addresses[this.totalContacts - 1].id;

    // onbserval for route changes
    this.sub = this.route.params.subscribe(params => {
      let id: string = params["id"];
      this.friend = this.provider.getFriend(+id);
    });
  }
  // function to navigate to Prev element
  navigateToPrev() {
    // get te currentIndex
    const currentIndex = this.addresses.findIndex(
      address => address.id === this.friend.id
    );
    // navigate to previous element
    this.router.navigate(["/details", this.addresses[currentIndex - 1].id]);
  }
  // function to navigate to next element
  navigateToNext() {
    // get current friend index
    const currentIndex = this.addresses.findIndex(
      address => address.id === this.friend.id
    );
    //navigate to next address
    this.router.navigate(["/details", this.addresses[currentIndex + 1].id]);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
