(function() {
  const localstorage_key = "knitesh-senators-list";

  var src, target, msg;
  var sourceId;
  // XMLHttpRequest - asynchronous loading of XML data
  let xhr;

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
    let senators = [];
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        // get all the senator elements
        var allSenators = xhr.responseXML.getElementsByTagName("senator");
        for (var i = 0; i < allSenators.length; i++) {
          let name = allSenators[i].getElementsByTagName("name")[0].textContent;
          let party = allSenators[i].getElementsByTagName("party")[0]
            .textContent;

          // create a new JSON object for each song
          let newSenator = {
            name,
            party,
            voted: false
          };
          // add the object to the array
          senators.push(newSenator);
        }

        document.getElementById("status").innerHTML =
          "Loaded " + senators.length + " senators";

        // insert data into
        insertSenatorsListIntoLocalStorage(senators);
      } else {
        document.getElementById("status").innerHTML =
          "There was a problem with the request " + xhr.status;
      }
    }
  };

  const isSenatoresListInLocalStorage = () => {
    const data = localStorage.getItem(localstorage_key);
    console.log(data && data.length > 0);
    return data && data.length > 0 ? true : false;
  };

  const insertSenatorsListIntoLocalStorage = senators => {
    localStorage.setItem(localstorage_key, JSON.stringify(senators));
    displaySenatorsList();
  };
  const getSenatorsListFromStorage = () => {
    const list = localStorage.getItem(localstorage_key);
    return JSON.parse(list);
  };

  const displaySenatorsList = () => {
    const members = document.getElementById("members");
    const senators = getSenatorsListFromStorage();
    const list = senators.map(senator => {
      const key = senator.name.split(" ").join("-");
      const el = `<li id=${key} class="collection-item" draggable="true">${senator.name}</li>`;

      return el;
    });

    members.innerHTML = list.join("");
  };
  // read data from XML
  isSenatoresListInLocalStorage()
    ? displaySenatorsList()
    : makeXMLRequest("./partyList.xml");
})();
