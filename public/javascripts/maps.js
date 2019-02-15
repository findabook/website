let map;

function startMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: {
      lat: 40.4207619,
      lng: -3.7089807
    }
  });
}



function generateMarker(user) {
  var markerData = {
    map: map,
    position: {
      lat: user.location.coords.lat,
      lng: user.location.coords.lng
    },
    title: user.username
  }

  var marker = new google.maps.Marker(markerData);

  marker.addListener('click', function () {
    new google.maps.InfoWindow({
      content: `<button class="chat">Start a Chat</button>`
    }).open(map, marker);
  });
}

function showMarkers() {
  fetch(`/map/${id}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (book) {
      book.actualOwners.forEach((user) => generateMarker(user));
    })
}

startMap();
showMarkers();

document.querySelector("#map").onclick = (e) => {
  let superMarker = e.target
  if (e.target.className == "chat") {
    console.log(superMarker.title)
    fetch("/chat/",
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: superMarker.title })
      })
      .then(res => res.json())
      .then(json => location.href = `/chat/${json._id}`)
  }
}