let shops = [];
const markers = [];

function init() {
  const map = new AMap.Map('map',{
    zoom: 11,
    center: [121.473658,31.230378]
  });
  getShops();
  console.log(shops)//这里返回 空数组？是因为先执行了这个语句，再执行的 getShops 吗
  shops.forEach(function(data){
    console.log(data);//未执行？
  })
}

function getShops() {
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
    .catch(err => console.log(err));
  }
}

function createMarkers(shop) {
    let lnglatx = new AMap.LngLat(shop.lng, shop.lat);
    const marker = new AMap.Marker({
        icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        position: lnglatx,
        map: map
      });
    markers.push(marker);
}

init();
//ko.appplyBindings(new AppViewModel());
