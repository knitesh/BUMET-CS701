import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Contact } from '../../model/contact';
import { AddressProviderService } from 
    '../../model/address-provider.service';


@Component({
  selector: 'app-address-book-entry',
  templateUrl: './address-book-entry.component.html',
  styleUrls: ['./address-book-entry.component.css']
})
export class AddressBookEntryComponent implements 
                  OnInit, OnDestroy  {

	friend: Contact;
	sub: any;
  totalContacts: number;

  constructor(private route: ActivatedRoute,
  		private provider: AddressProviderService) { }

  ngOnInit() {
    
    this.totalContacts = this.provider.getFriends().length;

  	this.sub = 
      this.route.params.subscribe(params => {
        console.log(params);
        let id: string = params['id'];
        this.friend = this.provider.getFriend(+id);
      });
      
  }

  ngOnDestroy() {
    console.log("ngOnDestroy");
    this.sub.unsubscribe();
  }
}

























