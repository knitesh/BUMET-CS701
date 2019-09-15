(function() {
  // XMLHttpRequest - asynchronous loading of XML data
  let xhr;
  let senators = [];

  const makeXMLRequest = url => {
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (xhr) {
      xhr.onreadystatechange = loadXMLData;
      xhr.open("GET", url, true);
      xhr.send(null);
    } else {
      document.getElementById("status").innerHTML =
        "Sorry, couldn't create an XMLHttpRequest";
    }
  };

  // callback function when data is loaded
  const loadXMLData = () => {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        // get all the senator elements
        var allSongs = xhr.responseXML.getElementsByTagName("senator");
        for (var i = 0; i < allSongs.length; i++) {
          var name = allSongs[i].getElementsByTagName("name")[0].textContent;
          var party = allSongs[i].getElementsByTagName("party")[0].textContent;

          // create a new JSON object for each song
          var newSenator = {
            name,
            party
          };
          // add the object to the array
          senators.push(newSenator);
        }

        document.getElementById("status").innerHTML =
          "Loaded " + senators.length + " senators";
      } else {
        document.getElementById("status").innerHTML =
          "There was a problem with the request " + xhr.status;
      }
    }
  };

  // read data from XML
  makeXMLRequest("./partyList.xml");
})();
