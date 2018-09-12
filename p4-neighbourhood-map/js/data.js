let places = [];
let weatherData;

function initData() {
  let promiseArray =[];
  const names = ['唐阁','Ultraviolet','8 ½ Otto e Mezzo Bombana','喜粤8号','御宝轩',
  '乔尔‧卢布松美食坊','逸龙阁','雍福会','Bo Shanghai','大董餐饮（环贸iapm）','大董海参店 (越洋广场)',
  '大蔬无界 (外滩)','福和慧','苏浙总会','Jean Georges','金轩','老干杯','老正兴',
  '南麓‧浙里 (四川中路)','利苑 (环贸广场)','利苑 (国金中心)','鹅夫人 (莘庄)','斐霓丝',
  '家全七福 (嘉里中心)' ,'迷上海','艾利爵士','泰安门','新荣记 (上海广场)','甬府' ,'雍颐'];

  let name = '';
  let stars = 0;
  let starUrl = '';

  const michelinSHH = [];
  const results = {'michelin_shanghai': michelinSHH};


  for(let i =0;i < names.length; i++){
    name = names[i];
    if (i < 2) {
      stars = 3;
      starUrl ='img/3-star.svg';
    } else if (i < 8) {
      stars = 2;
      starUrl ='img/2-star.svg';
    } else {
      stars = 1;
      starUrl ='img/1-star.svg';
    }

    michelinSHH.push(Object.assign({name,stars,starUrl}));

  }
  //console.log(michelinSHH);
  /*
    fs.writeFileSync('data/michelin_shanghai.json',JSON.stringify(results));
  }*/

  places = michelinSHH;

  for (place of places ) {
    promiseArray.push(new Promise(function(resolve, reject) {
      getPlaceDetails(place, resolve, reject);
    }))
  }

  function getPlaceDetails(place, resolve, reject) {
    fetch(`http://restapi.amap.com/v3/place/text?keywords=${place.name}&key=c4aecb3fe26e4e79ddb49a9043a283d2&city=shanghai&output=json&offset=20&page=1&extensions=all`
    )
    .then(res => res.json())
    .then(placeDetails => {
      place.addr = placeDetails.pois[0].address;
      place.location = placeDetails.pois[0].location;
      place.tel = placeDetails.pois[0].tel;
      place.id = placeDetails.pois[0].id;
      place.img = placeDetails.pois[0].photos[0].url;
      place.rating = placeDetails.pois[0].biz_ext.rating;
      place.cost = parseInt(placeDetails.pois[0].biz_ext.cost);
      place.type = placeDetails.pois[0].type.split(';');
      place.adname = placeDetails.pois[0].adname;

      let lnglat = place.location.split(',');
      place.longitude = lnglat[0];
      place.latitude = lnglat[1];

      if (place.name === '利苑 (国金中心)') {
        place.type[2] = '广东菜(粤菜)';
      }

      if (place.name === '泰安门') {
        place.type[2] = '西餐';
        place.rating = '4.5';
        place.cost = '1726';
      }

      resolve();
    })
    .catch(err => {
      reject();
      console.log(err)
    });
  }

  /**
   * 天气 API
   */
  function getWeather(resolve, reject) {
    fetch('http://api.yytianqi.com/observe?city=CH020100&key=1ce58uw5ekkgdeng')
    .then(res => res.json())
    .then(res => {
      weatherData = res;

      resolve();
    })
    .catch(err => {
      reject();
      console.log(err);
    });
  }

  promiseArray.push(new Promise(function(resolve, reject) {
      getWeather(resolve, reject);
    }))

  return promiseArray;

}
