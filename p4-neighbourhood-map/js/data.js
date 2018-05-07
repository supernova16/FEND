const fs = require('fs');

function initData() {
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

    getPlaceDetails(name);
    michelinSHH.push(Object.assign({name,stars,addr,location,tel,id,img,rating,cost}));


  }

  function getPlaceDetails(name) {
    fetch(`http://restapi.amap.com/v3/place/text?keywords=${name}&key=c835e23dde6f8ec7b42c02127bbed0e4&city=shanghai&output=json&offset=20&page=1&extensions=all`
    ).then(res => res.json())
    .then(placeDetails => {
      let addr = placeDetails.pois[0].address;
      let location = placeDetails.pois[0].location;
      let tel = placeDetails.pois[0].tel;
      let id = placeDetails.pois[0].id;
      let img = placeDetails.pois[0].photos[0].url;
      let rating = placeDetails.pois[0].biz_ext.rating;
      let cost = placeDetails.pois[0].biz_ext.cost;

    }).then(writeData)
    .catch(err => console.log(err));
  }

  //console.log(michelinSHH);
  function writeData() {
    fs.writeFileSync('data/michelin_shanghai.json',JSON.stringify(results));
  }

}

initData();
