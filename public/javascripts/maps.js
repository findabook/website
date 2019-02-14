let map;

function startMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: {
      lat: 40.4207619,
      lng: -3.7089807
    }
  });
}

function showMarkers() {
  fetch(`/map/${id}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (book) {
      book.actualOwners.forEach(user => {
        new google.maps.Marker({
          map: map,
          position: {
            lat: user.location.coords.lat,
            lng: user.location.coords.lng
          },
          title: user.username
        });
      });
    })
}

startMap();
showMarkers();
