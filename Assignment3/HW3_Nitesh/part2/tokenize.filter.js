// Get tokenapp module and attach tokenize filter
angular.module("tokenApp").filter("tokenize", function() {
  // returns a function which takes 2 input
  // string and delimiter
  return function(input, delimiter) {
    delimiter = delimiter || ","; // set default delimiter to ','
    // split and join input using delimiter
    return input.split("").join(delimiter);
  };
});
