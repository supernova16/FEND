let places = [];

function initData() {
  let promiseArray =[];
  const names = ['唐阁','Ultraviolet','8 ½ Otto e Mezzo Bombana','喜粤8号','御宝轩',
  '乔尔‧卢布松美食坊','逸龙阁','雍福会','Bo Shanghai','大董餐饮（环贸iapm）','大董海参店 (越洋广场)',
  '大蔬无界 (外滩)','福和慧','苏浙总会','Jean Georges','金轩','老干杯','老正兴',
  '南麓‧浙里 (四川中路)','利苑 (环贸广场)','利苑 (国金中心)','鹅夫人 (莘庄)','斐霓丝',
  '家全七福 (嘉里中心)' ,'迷上海','艾利爵士','泰安门','新荣记 (上海广场)','甬府' ,'雍颐'];

  let name = '';
  let stars = 0;

  const michelinSHH = [];
  const results = {'michelin_shanghai': michelinSHH};


  for(let i =0;i < names.length; i++){
    name = names[i];
    if (i < 2) {
      stars = 3;
    } else if (i < 8) {
      stars = 2;
    } else {
      stars = 1;
    }

    michelinSHH.push(Object.assign({name,stars}));

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
    fetch(`http://restapi.amap.com/v3/place/text?keywords=${place.name}&key=2466d94d165232a59816a964bcd21c41&city=shanghai&output=json&offset=20&page=1&extensions=all`
    )
    .then(res => res.json())
    .then(placeDetails => {
      place.addr = placeDetails.pois[0].address;
      place.location = placeDetails.pois[0].location;
      place.tel = placeDetails.pois[0].tel;
      place.id = placeDetails.pois[0].id;
      place.img = placeDetails.pois[0].photos[0].url;
      place.rating = placeDetails.pois[0].biz_ext.rating;
      place.cost = placeDetails.pois[0].biz_ext.cost;

      let lnglat = place.location.split(',');
      place.longitude = lnglat[0];
      place.latitude = lnglat[1];
      resolve();
    })
    .catch(err => {
      reject();
      console.log(err)
    });
  }

  return promiseArray;

}
