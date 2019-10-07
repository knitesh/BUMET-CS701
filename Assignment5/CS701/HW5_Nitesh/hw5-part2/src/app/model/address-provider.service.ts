import { Injectable } from "@angular/core";

import { Contact } from "./contact";
import { CONTACTS } from "./mock-data";

@Injectable({
  providedIn: "root"
})
export class AddressProviderService {
  constructor() {}

  getFriends(): Contact[] {
    return CONTACTS;
  }

  getFriend(id: number): Contact {
    let friends: Contact[] = this.getFriends();
    let friend: Contact = friends.find(f => {
      return f.id == id;
    });
    return friend;
  }

  addFriend(address: Contact): Contact {
    let friends: Contact[] = this.getFriends();
    let maxId: number;

    if (friends && friends.length > 0) {
      maxId = friends[friends.length - 1].id;
    } else {
      maxId = 0;
    }

    let friend: Contact = new Contact();
    friend.id = maxId + 1;
    friend.name = address.name;
    friend.address = address.address;
    friend.phone = address.phone;
    friends.push(friend);
    return friend;
  }

  editAddress(address: Contact): Contact {
    let friends: Contact[] = this.getFriends();
    let friend: Contact = friends.find(f => {
      return f.id == address.id;
    });
    friend.name = address.name;
    friend.address = address.address;
    friend.phone = address.phone;
    return friend;
  }

  deleteAddress(id: number) {
    let friends: Contact[] = this.getFriends();

    friends.splice(friends.findIndex(f => f.id != id), 1);
  }
}
