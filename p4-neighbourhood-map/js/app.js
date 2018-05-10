let map,infoWindow;
const markers = [];

/**
 * 初始化地图
 */
function initMap() {
  map = new AMap.Map('map',{
      zoom:12,
      center: [121.429524, 31.18 ],
      mapStyle: 'amap://styles/4fedd0223d789007bf2897c058b9fefc'//样式URL
  });
}

//等地点数据全部获取完整后，再给地图添加 marker
Promise.all(initData()).then(addMarkers);

/**
 * 根据获取的地点信息数组 places，在地图上逐一绘制标记 marker
 */
function addMarkers() {
  //console.log(places)
  places.forEach(function (data) {
    console.log(data);
    let lngLat = new AMap.LngLat(Number(data.longitude),Number(data.latitude));

    let marker = new AMap.Marker({
      position: lngLat,
      title: data.name,
      clickable: true,
      icon: 'img/marker.png',
      animation: 'AMAP_ANIMATION_DROP',
      topWhenClick: true,
      topWhenClick: true,
      map: map
    });

    markers.push(marker);

    infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
    marker.content = data.name;

  })
}

initMap();
