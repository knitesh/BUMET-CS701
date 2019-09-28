/**
 * Angular Module for Book Cart assignment
 */
// create a new angular module
const app = angular.module("myApp", []);

//define controller for angular module
// inject scrop and timeout
app.controller("CartController", function($scope, $timeout) {
  // define key for localstorage
  const keyLocalStorage = "Nitesh_cart";
  // default list of Books
  let defaultBooks = [
    { title: "Absolute Java", qty: 1, price: 114.95 },
    { title: "Pro HTML5", qty: 2, price: 27.95 },
    { title: "Head First HTML5", qty: 1, price: 27.89 }
  ];

  //get the books list from localstorage
  let storedBooks = localStorage.getItem(keyLocalStorage);
  // if storage has data load books from storage
  // otherwise from default books lists
  if (storedBooks) {
    $scope.books = JSON.parse(storedBooks);
  } else {
    $scope.books = defaultBooks;
  }

  // function to remove book from list
  $scope.removeBook = function(index) {
    $scope.books.splice(index, 1);
  };
  // funtion to add book into the list with default value
  $scope.addBook = function() {
    $scope.books.push({
      title: "New Book",
      qty: 1,
      price: 10.99
    });
  };

  // function to save books into localstorage
  $scope.saveBooks = function() {
    // stringify defaultbooks and store in localstorage
    const books = JSON.stringify($scope.books);
    localStorage.setItem(keyLocalStorage, books);
    // display status fore 1 sec
    $scope.status = "Books saved in localstorage";
    // use timeout to clear the status
    $timeout(() => {
      $scope.status = "";
    }, 1000);
  };

  // function to update toal amount
  $scope.updateTotal = function() {
    let total = 0;
    $scope.books.forEach(books => {
      total += books.qty * books.price;
    });
    return total;
  };
});
