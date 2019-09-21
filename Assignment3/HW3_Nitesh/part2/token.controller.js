angular
  .module("tokenApp", [])
  .controller("TokenController", function($scope, tokenizeFilter) {
    $scope.strInput = "Angular is awesome";
    $scope.strDelimiter = ",";
  });
