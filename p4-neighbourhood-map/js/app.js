let shops = [];

fetch('data/michelin_shanghai.json')
.then(res => res.json())
.then(results => {
  shops = results.michelin_shanghai;
  for (shop of shops) {
    getPlaceDetails(shop);
    }
})
.catch(err => console.log(err));

function getPlaceDetails(shop) {
  fetch(`http://restapi.amap.com/v3/place/text?keywords=${shop.name}&key=c835e23dde6f8ec7b42c02127bbed0e4&city=shanghai&output=json&offset=20&page=1&extensions=all`
  ).then(res => res.json())
  .then(placeDetails => {
    shop.addr = placeDetails.pois[0].address;
    shop.location = placeDetails.pois[0].location;
    shop.tel = placeDetails.pois[0].tel;
    shop.id = placeDetails.pois[0].id;
    shop.img = placeDetails.pois[0].photos[0].url;
    shop.rating = placeDetails.pois[0].biz_ext.rating;
    shop.cost = placeDetails.pois[0].biz_ext.cost;

    let lnglat = shop.location.split(',');
    shop.lng = parseFloat(lnglat[0]);
    shop.lat = parseFloat(lnglat[1]);
  })
  .then(createMarkers(shop))
  .catch(err => console.log(err));
}

function initMap() {
  const map = new AMap.Map('map',{
    zoom: 11,
    center: [121.473658,31.230378]
  });

}

const markers = [];

function createMarkers(shop) {
  console.log(shop)
    let lng = shop.lng;
    let lat = shop.lat;
    const marker = new AMap.Marker({
        icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        position: [lng, lat]
      });
    markers.push(marker);
}

initMap();
//ko.appplyBindings(new AppViewModel());
