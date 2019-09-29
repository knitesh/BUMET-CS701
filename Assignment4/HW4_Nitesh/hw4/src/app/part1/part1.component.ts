import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-part1",
  templateUrl: "./part1.component.html"
})
export class Part1Component implements OnInit {
  keyLocalStorage = "Nitesh_cart";
  books = [];
  // default list of Books
  defaultBooks = [
    { title: "Absolute Java", qty: 1, price: 114.95 },
    { title: "Pro HTML5", qty: 2, price: 27.95 },
    { title: "Head First HTML5", qty: 1, price: 27.89 }
  ];
  constructor() {}

  ngOnInit() {
    // define key for localstorage

    //get the books list from localstorage
    const storedBooks = localStorage.getItem(this.keyLocalStorage);
    // if storage has data load books from storage
    // otherwise from default books lists
    if (storedBooks) {
      this.books = JSON.parse(storedBooks);
    } else {
      this.books = this.defaultBooks;
    }
  }

  // function to remove book from list
  removeBook = function(index) {
    this.books.splice(index, 1);
  };
  // funtion to add book into the list with default value
  addBook = function() {
    this.books.push({
      title: "New Book",
      qty: 1,
      price: 10.99
    });
  };

  // function to save books into localstorage
  saveBooks = function() {
    // stringify defaultbooks and store in localstorage
    const books = JSON.stringify(this.books);
    localStorage.setItem(this.keyLocalStorage, books);
    // display status fore 1 sec
    this.status = "Books saved in localstorage";
    // use timeout to clear the status
    const self = this;
    setTimeout(() => {
      self.status = "";
    }, 1000);
  };

  // function to update toal amount
  updateTotal = function() {
    let total = 0;
    this.books.forEach(books => {
      total += books.qty * books.price;
    });
    return total;
  };
}
