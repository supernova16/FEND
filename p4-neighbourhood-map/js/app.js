
Promise.all(initData()).then(function() {
  let map,infoWindow;
  const markers = [];

  function initMap() {
    map = new AMap.Map('map',{
        zoom:12,
        center: [121.473702, 31.23039 ]
    });

    places.forEach(function (data) {
      //console.log(data);
      let lngLat = new AMap.LngLat(Number(data.longitude),Number(data.latitude));

      let marker = new AMap.Marker({
        position: lngLat,
        title: data.name,
        clickable: true,
        map: map
      });

      markers.push(marker);
      console.log(markers);
    })
  }

  initMap();
})
