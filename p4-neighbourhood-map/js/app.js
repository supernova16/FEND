
let inputValue = ko.observable('');
let infoWindow;
let map;

let Place = function(place, map) {
  let self = this;
  let lngLat = new AMap.LngLat(Number(place.longitude),Number(place.latitude));
  this.title = ko.observable(place.name);
  this.starUrl = ko.observable(place.starUrl);
  this.info = ko.observable(`<h3>${place.name} <span><img src=${place.starUrl} height='15'/></span></h3>
                        <p>${place.type[2]} · ${place.adname} · 人均 ${place.cost} </p>`);
  this.content = `<img class='place-img' src='${place.img}' width='320' />
                        <h3>${place.name} <span><img src=${place.starUrl} height='15'/></span></h3>
                        <p>${place.type[2]} · ${place.adname} · 人均 ${place.cost} · 评分 ${place.rating}</p>
                        <p>地址：${place.addr}</p>
                        <p>Tel：${place.tel}</p>`;
  this.marker = new AMap.Marker({
        position: lngLat,
        title: self.title(),
        clickable: true,
        icon: 'img/marker.png',
        animation: 'AMAP_ANIMATION_DROP',
        topWhenClick: true,
        topWhenClick: true,
        map: map
      });

  self.marker.on('click',function() {
    self.showInfoWindow();
  });

  this.showInfoWindow = function() {
    infoWindow.setContent(self.content);//设置 infoWindow 的内容
    infoWindow.open(map, lngLat);//infoWindow 打开位置
    map.panTo(lngLat.offset(-500, 1000));//将当前地图中心设为 marker 位置,并偏移
    map.setZoom(15);//设置地图缩放级别
  }

}

let appViewModel = function() {
  let self = this;

  this.placeList = ko.observableArray([]);

  //console.log('places', places)
  //创建 place 实例
  places.forEach(function(place) {
    let placeToAdd = new Place(place, map);
    self.placeList.push(placeToAdd);
  });


  //根据搜索结果进行筛选
  this.filterList = ko.computed(function() {
    let filteredList = [];
    if (inputValue().length > 0) {
      infoWindow.close();
      map.panTo([121.429524, 31.18 ]);
      map.setZoom(12);

      filteredList = ko.utils.arrayFilter(self.placeList(), function(place) {
        place.marker.hide();
        return place.title().toLowerCase().indexOf(inputValue().toLowerCase()) >= 0;
      });

    } else {
      filteredList = self.placeList();//未输入搜索关键词状态

    }

    filteredList.forEach(function(place) {
      place.marker.show();
    })

    return filteredList;
  });


  this.resultClick = function(place, event) {
    place.showInfoWindow();
  }

  this.navClick = function() {
    let $ = document.getElementById('sidebar');
    if ($.style.display === 'none') {
      $.style.display = 'block';
    } else {
     $.style.display = 'none';
    }
  }

  //天气数据
  //console.log(weatherData);
  this.weather = ko.observable(`${weatherData.data.qw} ℃ | ${weatherData.data.tq}`);

}


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

  //添加 infoWindow 实例，这里使用了高德地图的 AdvancedInfoWindow 插件
  infoWindow = new AMap.AdvancedInfoWindow({
      offset: new AMap.Pixel(0, -30),
      isCustom:true,
      autoMove: true,
      showShadow: true
  });
}

function startKo() {
  ko.applyBindings(new appViewModel());
}

initMap();

//等和天气地点数据全部获取完整后，再开始运行绑定
Promise.all(initData()).then(startKo);
