const markers = [];
let map;

/**
 * 初始化地图
 */
function initMap() {
  map = new AMap.Map('map',{
      zoom:12,
      center: [121.429524, 31.18 ],
      mapStyle: 'amap://styles/4fedd0223d789007bf2897c058b9fefc'//样式URL
  });

  //添加地图缩放控件
  AMapUI.loadUI(['control/BasicControl'], function(BasicControl) {
    map.addControl(new BasicControl.Zoom({
      position: 'rb', //right bottom
      showZoomNum: true //显示zoom值
    }));
  });

  //等地点数据全部获取完整后，再给地图添加 marker
  Promise.all(initData()).then(createMarkers);


  /**
   * 根据获取的地点信息数组 places，在地图上逐一绘制标记 marker
   */
  function createMarkers() {
    //console.log(places)
    places.forEach(function (place) {
      //console.log(place);
      let lngLat = new AMap.LngLat(Number(place.longitude),Number(place.latitude));

      let marker = new AMap.Marker({
        position: lngLat,
        title: place.name,
        clickable: true,
        icon: 'img/marker.png',
        animation: 'AMAP_ANIMATION_DROP',
        topWhenClick: true,
        topWhenClick: true,
        map: map
      });

      switch( place.stars)
      {
      case 1:
        marker.starUrl = 'img/1-star.svg';
        break;
      case 2:
        marker.starUrl = 'img/2-star.svg';
        break;
      case 3:
        marker.starUrl = 'img/3-star.svg';
        break;
      }

      marker.name = place.name;

      marker.content =`<img class='place-img' src='${place.img}' width='320' />
                        <h3>${place.name} <span><img src=${marker.starUrl} height='15'/></span></h3>
                        <p>${place.type[2]} · ${place.adname} · 人均 ${place.cost} · 评分 ${place.rating}</p>
                        <p>地址：${place.addr}</p>
                        <p>Tel：${place.tel}</p>`;
      //把 marker 添加到 markers 数组中
      markers.push(marker);

      //给每个 marker 添加点击事件
      marker.on('click', showInfoWindow);
    });
  }

  //添加 infoWindow 实例，这里使用了高德地图的 AdvancedInfoWindow 插件
  let infoWindow = new AMap.AdvancedInfoWindow({
      offset: new AMap.Pixel(0, -30),
      isCustom:true,
      autoMove: true,
      showShadow: true
  });

  /**
   * 根据当前点击的 marker 设置／显示 infoWindow
   */
  function showInfoWindow() {
    infoWindow.setContent(this.content);//设置 infoWindow 的内容
    infoWindow.open(map, this.getPosition());//infoWindow 打开位置
    map.panTo(this.getPosition().offset(-500, 1000));//将当前地图中心设为 marker 位置,并偏移
    map.setZoom(15);//设置地图缩放级别
  }

  //使用 knockout 进行数据绑定
  let appViewModel = function() {
    let self = this;
    self.placeList = ko.observableArray([]);

    places.forEach(function(place) {
      self.placeList.push(new Marker(item));
    });

    self.listFilter = ko.computed(function() {
      return ko.utils.arrayFilter(self.filter(), function(item) {
        if ((item.name().toLowerCase()).indexOf(self.inputValue().toLowerCase()) >= 0) {
          markers.forEach(function(marker) {
            if(marker.name === item.name()) {
              marker.show();
            }
          });
          return true;
        } else {
          markers.forEach(function(marker) {
            if(marker.name === item.name()) {
              marker.hide();
            }
          });
          return false;
        }
      });
    });


  }

  ko.applyBindings(new appViewModel());
}





initMap();
