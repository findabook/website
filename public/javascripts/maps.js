let map;

function startMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: {
      lat: 40.222,
      lng: 3.22
    }
  });
}

function showMarkers() {
  axios.get(`/map`).then(book => {
    book.data.actualOwners.forEach(user => {
      new google.maps.Marker({
        map: map,
        position: {
          lat: user.location.coords.lat,
          lng: user.location.coords.lng
        },
        title: user.username
      });
    });
  });
}

startMap();
showMarkers();
