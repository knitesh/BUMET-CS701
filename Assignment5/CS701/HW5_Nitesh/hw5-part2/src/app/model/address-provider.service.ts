import { Injectable } from "@angular/core";
import { Contact } from "./contact";
import { CONTACTS } from "./mock-data";

@Injectable({
  providedIn: "root"
})
export class AddressProviderService {
  constructor() {}
  // function to get all friends
  getFriends(): Contact[] {
    return CONTACTS;
  }
  // function to get a specific contact
  getFriend(id: number): Contact {
    let friends: Contact[] = this.getFriends();
    // find friend based on the id
    let friend: Contact = friends.find(f => {
      return f.id == id;
    });
    // return the result
    return friend;
  }

  // funtion to add a new friend
  addFriend(address: Contact): Contact {
    // get friend list
    let friends: Contact[] = this.getFriends();
    let maxId: number;
    // get the available maxid
    if (friends && friends.length > 0) {
      maxId = friends[friends.length - 1].id;
    } else {
      maxId = 0;
    }

    // create new contact and increase the maxID
    let friend: Contact = new Contact();
    friend.id = maxId + 1;
    friend.name = address.name;
    friend.address = address.address;
    friend.phone = address.phone;
    // insert new contact to contact array
    friends.push(friend);
    return friend;
  }

  // edit Address function
  editAddress(address: Contact): Contact {
    // get the list of contacts
    let friends: Contact[] = this.getFriends();
    // find the friend which id matches the eidt id
    let friend: Contact = friends.find(f => {
      return f.id == address.id;
    });
    // update with latest infor
    friend.name = address.name;
    friend.address = address.address;
    friend.phone = address.phone;
    // return edited contact
    return friend;
  }

  //function to delete contacts
  deleteAddress(id: number) {
    // get the list of all contacts
    let friends: Contact[] = this.getFriends();
    // get the index of contacts that needs to be delted
    const index = friends.findIndex(f => f.id == id);
    // use splice to inplace change the array
    friends.splice(index, 1);
  }
}
