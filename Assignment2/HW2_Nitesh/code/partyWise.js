(function() {
  const keyLocalStorage = "knitesh-senators-list";

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

        document.getElementById("status").innerHTML =
          "From AJAX Loaded " + senators.length + " senators";
        // insert data into localstorage
        insertSenatorsListIntoLocalStorage(senators);
        // display the list of senatores
        displaySenatorsList(senators);
      } else {
        document.getElementById("status").innerHTML =
          "There was a problem with the request " + xhr.status;
      }
    }
  };

  const isSenatoresListInLocalStorage = () => {
    const data = localStorage.getItem(keyLocalStorage);
    console.log(data && data.length > 0);
    return data && data.length > 0 ? true : false;
  };

  const isSenatoreAlreadyVoted = senatorId => {
    // get the info about senator from localstoreage
    const data = JSON.parse(localStorage.getItem(keyLocalStorage));
    let voted = false;
    data.forEach(senator => {
      const key = senator.name.split(" ").join("_");
      if (key === senatorId && senator.voted) {
        voted = true;
      }
    });

    return voted;
  };

  const insertSenatorsListIntoLocalStorage = senators => {
    localStorage.setItem(keyLocalStorage, JSON.stringify(senators));
  };
  const getSenatorsListFromStorage = () => {
    const list = JSON.parse(localStorage.getItem(keyLocalStorage));
    document.getElementById("status").innerHTML =
      "From LocalStorage Loaded " + list.length + " senators";
    displaySenatorsList(list);
  };
  const moveSenatorToDropLocation = (senator, element) => {
    //if democrates move to democrates drop
    if (senator.party === DEMOCRATE_PARTY) {
      democratesTarget.innerHTML += element;
    } else if (senator.party === REPUBLICAN_PARTY) {
      //else if republican move to republican
      republicanTarget.innerHTML += element;
    }
  };

  const displaySenatorsList = senators => {
    const members = document.getElementById("members");

    const list = senators.map(senator => {
      const key = senator.name.split(" ").join("_");
      // check if senator is already voted
      const isVoted = senator.voted;
      // if yes move them to their drop location
      const el = `<li id=${key} data-party=${senator.party} class="collection-item" draggable="true">${senator.name}</li>`;
      if (isVoted) {
        moveSenatorToDropLocation(senator, el);
      }
      return el;
    });

    members.innerHTML = list.join("");
  };
  // read data from XML
  isSenatoresListInLocalStorage()
    ? getSenatorsListFromStorage()
    : makeXMLRequest("./partyList.xml");

  const dragStartHandler = e => {
    e.dataTransfer.setData("Text", e.target.id);
    e.dataTransfer.setData("PartyName", e.target.getAttribute("data-party"));
    sourceId = e.target.id; // explicitly for some browsers
    partyName = e.target.getAttribute("data-party");
    e.target.classList.add("dragged");
  };

  // drag functions for member list
  const dragEndHandler = e => {
    msg.innerHTML = "Drag ended";
    var elems = document.querySelectorAll(".dragged");
    for (var i = 0; i < elems.length; i++) {
      elems[i].classList.remove("dragged");
    }
  };

  const dragHandler = e => {
    msg.innerHTML =
      "Dragging " +
      e.target.id +
      " party:" +
      e.target.getAttribute("data-party");
  };
  // Democarte drop location handlers
  const dDragEnterHandler = e => {
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
  };
  const dDragOverHandler = e => {
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
  };
  const updateVotingStatus = id => {
    console.log(id);
    // get the senators list from localstorage
    // and update their voting status
    const senators = JSON.parse(localStorage.getItem(keyLocalStorage));
    const updatedList = senators.map(senator => {
      // source Id is firstName_LastName
      const key = senator.name.split(" ").join("_");
      if (key === id) {
        senator.voted = true;
      }
      return senator;
    });
    //update localstorage with updated list
    insertSenatorsListIntoLocalStorage(updatedList);
  };
  const dDropHandler = e => {
    e.preventDefault();
    const senatorId = e.dataTransfer.getData("Text") || sourceId;
    console.log("Drop on " + e.target.id + " source is " + senatorId);
    if (!isSenatoreAlreadyVoted(senatorId)) {
      const sourceElement = document.getElementById(senatorId);
      const newElement = sourceElement.cloneNode(true);

      democratesTarget.appendChild(newElement);
      updateVotingStatus(senatorId);
    }
  };

  // Republican drop handlers
  const rDragEnterHandler = e => {
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
  };
  const rDragOverHandler = e => {
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
  };

  const rDropHandler = e => {
    e.preventDefault();
    const senatorId = e.dataTransfer.getData("Text") || sourceId;

    console.log("Drop on " + e.target.id + "source is " + senatorId);

    // check if the senator is already voted, if yes skip
    if (!isSenatoreAlreadyVoted(senatorId)) {
      var sourceElement = document.getElementById(senatorId);
      var newElement = sourceElement.cloneNode(true);

      republicanTarget.appendChild(newElement);
      updateVotingStatus(senatorId);
    }
  };

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
