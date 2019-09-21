const app = angular.module("tokenApp", []);

// attach contoller to tokenApp injecting scop and tokenizeFilter
app.controller("TokenController", function($scope, tokenizeFilter) {
  // assign default value
  $scope.strInput = "Angular is awesome";
  $scope.strDelimiter = ",";
});
