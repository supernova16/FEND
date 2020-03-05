let places = [];
let weatherData;

function initData() {
  let promiseArray =[];
  const oneStar = ['菁禧荟 （长宁）','宝丽轩','成隆行蟹王府 （黄浦）','大董 （徐汇）','大董海参店 （静安）',
  'Da Vittorio','福和慧','Il Ristorante - Niko Romito','苏浙总会','Jean Georges','金轩','老正兴 （黄浦）',
  'Le Comptoir de Pierre Gagnaire','南麓‧浙里 （黄浦）','利苑 （浦东新区）','LEI GARDEN(环贸iapm)','莱美露滋',
  '明阁','鹿园 （长宁）','鹿园MOOSE(浦东店)','斐霓丝','家全七福 （静安）','迷上海','艾利爵士','唐阁','大蔬无界 （黄浦）',
  '新荣记 （南京西路）','逸龙阁','甬府','雍颐庭','玉芝兰'];
  const twoStar = ['喜粤8号 （汝南街）','御宝轩 （黄浦）','乔尔‧卢布松美食坊','8 ½ Otto e Mezzo Bombana','泰安门','新荣记 （南阳路）','雍福会'];
  const threeStar = ['Ultraviolet by Paul Pairet'];
  let michelinSHH = [];
  //const results = {'michelin_shanghai': michelinSHH};
  
  let name = '';
  let stars = 0;
  let starUrl = '';

  for(let i = 0; i < threeStar.length; i++){
    name = threeStar[i];
    stars = 3;
    starUrl ='img/3-star.svg';
    michelinSHH.push(Object.assign({name,stars,starUrl}));
  }

  for(let i = 0; i < twoStar.length; i++){
    name = twoStar[i];
    stars = 2;
    starUrl ='img/2-star.svg';
    michelinSHH.push(Object.assign({name,stars,starUrl}));
  }
  
  for(let i = 0; i < oneStar.length; i++){
    name = oneStar[i];
    stars = 1;
    starUrl ='img/1-star.svg';
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
      place.img = placeDetails.pois[0].photos[0];
      place.rating = placeDetails.pois[0].biz_ext.rating;
      place.cost = parseInt(placeDetails.pois[0].biz_ext.cost);
      place.type = placeDetails.pois[0].type.split(';');
      place.adname = placeDetails.pois[0].adname;

      let lnglat = place.location.split(',');
      place.longitude = lnglat[0];
      place.latitude = lnglat[1];

      if (place.name === '泰安门') {
        place.type[2] = '西餐';
      }
      if (place.img == undefined){
        //console.log(place);
        place.img = {url:'img/default_img.jpg'};
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
