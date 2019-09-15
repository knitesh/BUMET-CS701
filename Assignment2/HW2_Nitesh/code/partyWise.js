(function() {
  const localstorage_key = "knitesh-senators-list";

  const DEMOCRATE_PARTY = "Democrat";
  const REPUBLICAN_PARTY = "Republican";

  const msg = document.getElementById("msg");
  const senatorSource = document.getElementById("members");
  const democratesTarget = document.getElementById("democratsList");
  const republicanTarget = document.getElementById("republicansList");

  let sourceId, partyName;
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
          "From AJAX Loaded " + senators.length + " senators";

        // insert data into
        insertSenatorsListIntoLocalStorage(senators);
        document.getElementById("status").innerHTML =
          "From AJAX Loaded " + senators.length + " senators";
        displaySenatorsList(senators);
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
  };
  const getSenatorsListFromStorage = () => {
    const list = JSON.parse(localStorage.getItem(localstorage_key));
    document.getElementById("status").innerHTML =
      "From LocalStorage Loaded " + list.length + " senators";
    displaySenatorsList(list);
  };

  const displaySenatorsList = senators => {
    const members = document.getElementById("members");

    const list = senators.map(senator => {
      const key = senator.name.split(" ").join("");
      const el = `<li id=${key} data-party=${senator.party} class="collection-item" draggable="true">${senator.name}</li>`;

      return el;
    });

    members.innerHTML = list.join("");
  };
  // read data from XML
  isSenatoresListInLocalStorage()
    ? getSenatorsListFromStorage()
    : makeXMLRequest("./partyList.xml");

  function dragStartHandler(e) {
    e.dataTransfer.setData("Text", e.target.id);
    e.dataTransfer.setData("PartyName", e.target.getAttribute("data-party"));
    sourceId = e.target.id; // explicitly for some browsers
    partyName = e.target.getAttribute("data-party");
    e.target.classList.add("dragged");
  }

  function dragEndHandler(e) {
    msg.innerHTML = "Drag ended";
    var elems = document.querySelectorAll(".dragged");
    for (var i = 0; i < elems.length; i++) {
      elems[i].classList.remove("dragged");
    }
  }

  function dragHandler(e) {
    msg.innerHTML =
      "Dragging " +
      e.target.id +
      " party:" +
      e.target.getAttribute("data-party");
  }
  // Democarte drop location handlers
  function dDragEnterHandler(e) {
    console.log(
      "Drag Entering " +
        e.target.id +
        " source is " +
        e.dataTransfer.getData("Text")
    );

    const partyAffiliation = e.dataTransfer.getData("PartyName") || partyName;
    if (partyAffiliation == DEMOCRATE_PARTY) {
      e.preventDefault();
    }
  }
  function dDragOverHandler(e) {
    console.log(
      "Drag Over " +
        e.target.id +
        " source is " +
        e.dataTransfer.getData("Text")
    );

    const partyAffiliation = e.dataTransfer.getData("PartyName") || partyName;
    if (partyAffiliation == DEMOCRATE_PARTY) {
      e.preventDefault();
    }
  }
  function dDropHandler(e) {
    e.preventDefault();
    const sourceElementId = e.dataTransfer.getData("Text") || sourceId;
    console.log("Drop on " + e.target.id + " source is " + sourceElementId);

    var sourceElement = document.getElementById(sourceElementId);
    var newElement = sourceElement.cloneNode(TextTrackCue);

    democratesTarget.appendChild(newElement);
    // republicanTarget.appendChild(newElement);
  }

  // Republican drop handlers
  function rDragEnterHandler(e) {
    console.log(
      "Drag Entering " +
        e.target.id +
        " source is " +
        e.dataTransfer.getData("Text")
    );

    const partyAffiliation = e.dataTransfer.getData("PartyName") || partyName;
    if (partyAffiliation == REPUBLICAN_PARTY) {
      e.preventDefault();
    }
  }
  function rDragOverHandler(e) {
    console.log(
      "Drag Over " +
        e.target.id +
        " source is " +
        e.dataTransfer.getData("Text")
    );

    const partyAffiliation = e.dataTransfer.getData("PartyName") || partyName;
    if (partyAffiliation == REPUBLICAN_PARTY) {
      e.preventDefault();
    }
  }

  function rDropHandler(e) {
    e.preventDefault();
    const sourceElementId = e.dataTransfer.getData("Text") || sourceId;
    console.log("Drop on " + e.target.id + " source is " + sourceElementId);

    var sourceElement = document.getElementById(sourceElementId);
    var newElement = sourceElement.cloneNode(TextTrackCue);

    republicanTarget.appendChild(newElement);
    // republicanTarget.appendChild(newElement);
  }

  // Add event handlers for the source
  senatorSource.ondragstart = dragStartHandler;
  senatorSource.ondragend = dragEndHandler;
  senatorSource.ondrag = dragHandler;

  // Add event handlers for the Democrates target
  democratesTarget.ondragenter = dDragEnterHandler;
  democratesTarget.ondragover = dDragOverHandler;
  democratesTarget.ondrop = dDropHandler;

  // Add event handlers for the Republican target
  republicanTarget.ondragenter = rDragEnterHandler;
  republicanTarget.ondragover = rDragOverHandler;
  republicanTarget.ondrop = rDropHandler;
})();
