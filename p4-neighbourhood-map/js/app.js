
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
        title: self.title,
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

  this.visible = ko.computed(function() {
    if (inputValue().length > 0){
      infoWindow.close();
      map.panTo([121.429524, 31.18 ]);
      map.setZoom(12);
      return (self.title().toLowerCase().indexOf(inputValue().toLowerCase()) > -1);
    } else {
      return true;
    }
  });
 
  this.setMarker = ko.computed(function() {
    if (self.visible()) {
      self.marker.setMap(map);
    } else {
      self.marker.setMap(null);
    }
  });
}

let appViewModel = function() {
  let self = this;

  this.isDrawed = ko.observable(false);
  this.placeList = ko.observableArray([]);

  //console.log('places', places)
  places.forEach(function(place) {
    let placeToAdd = new Place(place, map);
    self.placeList.push(placeToAdd);
  });

  console.log('muqianweizhi');

  this.filterList = ko.computed(function() {
    let filteredList = [];
    self.placeList().forEach(function(place) {
      if (place.visible()) {
        filteredList.push(place);
      }
    })
    return filteredList;
  });


  this.resultClick = function(place, event) {
    self.isDrawed(false);
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

  //天气 api
  this.weather = ko.observable();

  let UID = "U9CCFD2375"; 
  let KEY = "bv0untlpj9upazkm"; 
  let API = "http://api.seniverse.com/v3/weather/now.json"; 
  let LOCATION = "shanghai"; 
  // 获取当前时间戳
  let ts = Math.floor((new Date()).getTime() / 1000);
  // 构造验证参数字符串
  let str = "ts=" + ts + "&uid=" + UID;
  // 使用 HMAC-SHA1 方式，以 API 密钥（key）对上一步生成的参数字符串（raw）进行加密
  // 并将加密结果用 base64 编码，并做一个 urlencode，得到签名 sig
  let sig = CryptoJS.HmacSHA1(str, KEY).toString(CryptoJS.enc.Base64);
  sig = encodeURIComponent(sig);
  str = str + "&sig=" + sig;
  // 构造最终请求的 url
  let url = API + "?location=" + LOCATION + "&" + str + "&callback=foo";

  fetch(url)
  .then(res => {
    console.log(res);
    self.weather = `${res.results.now.temperature} °C | ${res.results.now.text} `
  })
  .catch(e => console.log(e));
     

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

function start() {
  initMap();
  ko.applyBindings(new appViewModel());
}

//等地点数据全部获取完整后，再开始运行
Promise.all(initData()).then(start);
