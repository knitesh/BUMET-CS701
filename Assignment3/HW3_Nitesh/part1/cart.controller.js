angular
  .module("myApp", [])
  .controller("CartControler", function($scope, $timeout) {
    const keyLocalStorage = "Nitesh_cart";
    let defaultBooks = [
      { title: "Absolute Java", qty: 1, price: 114.95 },
      { title: "Pro HTML5", qty: 2, price: 27.95 },
      { title: "Head First HTML5", qty: 1, price: 27.89 }
    ];

    //get the books list from localstorage
    let storedBooks = localStorage.getItem(keyLocalStorage);
    storedBooks
      ? ($scope.books = JSON.parse(storedBooks))
      : ($scope.books = defaultBooks);

    $scope.removeBook = function(index) {
      $scope.books.splice(index, 1);
    };

    $scope.addBook = function() {
      $scope.books.push({
        title: "New Book",
        qty: 1,
        price: 10.99
      });
    };

    $scope.saveBooks = function() {
      // stringify defaultbooks and store in localstorage
      const books = JSON.stringify($scope.books);
      localStorage.setItem(keyLocalStorage, books);
      $scope.status = "Books saved in localstorage";
      $timeout(() => {
        $scope.status = "";
      }, 1000);
    };

    $scope.updateTotal = function() {
      let total = 0;
      $scope.books.forEach(books => {
        total += books.qty * books.price;
      });
      return total;
    };
  });
