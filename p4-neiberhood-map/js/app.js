function initMap() {
  const myLatlng = new google.maps.LatLng(22.352734,114.1277);
  const mapOptions = {
    zoom: 11,
    center: myLatlng,
  };
  const map = new google.maps.Map(document.getElementById('map'),mapOptions);

  const marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
  });
}
