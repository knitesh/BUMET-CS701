(function(win) {
  // Google map
  let map = null;
  // Path

  let lastMarker = null;

  const textMessage = document.getElementById("status").innerHTML;

  // function to call geolocation api
  const getLocation = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 50000,
      maximumAge: 0
    };

    // Adding loading message to Status when button is clicked first time
    document.getElementById("status").innerHTML = textMessage + " ...Loading";

    win.navigator.geolocation.getCurrentPosition(
      displayLocation, // function to call in case of success
      handleError, // function to call in case of error
      options // options
    );
  };

  // assign the getLocation to global window object
  // so that it can be used in callback from google

  win.noop = () => {
    console.log("Callback function");
  };

  // function to display current location
  const displayLocation = position => {
    // retireive the postion information
    const { latitude, longitude, accuracy } = position.coords;

    document.getElementById("latitude").innerHTML = "Latitude: " + latitude;
    document.getElementById("longitude").innerHTML = "Longitude: " + longitude;
    document.getElementById("accuracy").innerHTML =
      "Accuracy: " + accuracy + " meters";
    document.getElementById("timestamp").innerHTML =
      "Timestamp: " + position.timestamp;

    // Show the google map with the position
    showOnMap(position.coords);
  };

  // function to handle error message
  const handleError = error => {
    switch (error.code) {
      case 1:
        updateStatus("The user denied permission");
        break;
      case 2:
        updateStatus("Position is unavailable");
        break;
      case 3:
        updateStatus("Timed out");
        break;
    }
  };

  // initialize the map and show the position
  const showOnMap = coords => {
    // retreive lat/lng from coords
    const { latitude, longitude } = coords;

    // create new google position
    const googlePosition = new google.maps.LatLng(latitude, longitude);

    const mapOptions = {
      zoom: 15,
      center: googlePosition,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Remove loading from the status message
    document.getElementById("status").innerHTML = textMessage;
    // create new map element and attached it to dom
    const mapElement = document.getElementById("map");
    map = new google.maps.Map(mapElement, mapOptions);

    // add the marker to the map
    const title = "Location Details";
    const content = "Lat: " + latitude + ", Long: " + longitude;

    addMarker(map, googlePosition, title, content);

    // Update My location
    updateMyLocation(coords);
  };
  // add position marker to the map
  const addMarker = (map, latlongPosition, title, content) => {
    const options = {
      position: latlongPosition,
      map: map,
      title: title,
      clickable: true
    };
    // create new marker
    const marker = new google.maps.Marker(options);

    const popupWindowOptions = {
      content: content,
      position: latlongPosition
    };

    // create new popup window
    const popupWindow = new google.maps.InfoWindow(popupWindowOptions);

    // add event listner to the marker
    google.maps.event.addListener(marker, "click", function() {
      popupWindow.open(map);
    });

    return marker;
  };

  // function to show path on the map
  const updateMyLocation = coords => {
    let { latitude, longitude } = coords;
    let path = [];

    // first point
    let latlong = new google.maps.LatLng(latitude, longitude);
    path.push(latlong);

    // execute below set of code every 5sec to move the path nortward
    setInterval(() => {
      // calculate new lat/lng
      latitude += Math.random() / 100;
      longitude -= Math.random() / 100;

      // get next point
      latlong = new google.maps.LatLng(latitude, longitude);
      // add it ot path array
      path.push(latlong);

      let line = new google.maps.Polyline({
        path: path,
        strokeColor: "#0000ff",
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      // create line
      line.setMap(map);
      // pan to next point
      map.panTo(latlong);

      // remove marker from last poistion
      if (lastMarker) lastMarker.setMap(null);
      // add the new marker
      lastMarker = addMarker(
        map,
        latlong,
        "Your new location",
        "You moved to: " + latitude + ", " + longitude
      );
    }, 5000);
  };

  // function to display status
  const updateStatus = message => {
    document.getElementById("status").innerHTML = textMessage;
  };
  // Get button and add evenListener to handle click event
  const currentLocation = document.getElementById("btnCurrentLocation");
  currentLocation.addEventListener("click", () => {
    currentLocation.disabled = true;
    getLocation();
  });
})(window);
