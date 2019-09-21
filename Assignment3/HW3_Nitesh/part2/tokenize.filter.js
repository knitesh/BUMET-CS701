angular.module("tokenApp").filter("tokenize", function() {
  return function(input, delimiter) {
    delimiter = delimiter || ",";
    return input.split("").join(delimiter);
  };
});
