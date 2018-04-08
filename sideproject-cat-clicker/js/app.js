

class Cats {
  constructor(id,name,imgurl) {
    this.id = id;
    this.name = name;
    this.imgurl = imgurl;
    this.clicks = 0;
    $('.cat-container').append(
      `<div class = 'cat-card' id = '${this.id}'>
        <p class="cat-name">${this.name}</p>
        <img src="${this.imgurl}" alt='${this.name}'>
        <p class="click-status"><span id = 'click-num'> ${this.clicks} </span> Clicks!</p>
      </div>`);
  }

  addClicks() {
    this.clicks++;
    $(`#${this.id} #click-num`).text(` ${this.clicks} `);
  }
}

const cat1 = new Cats(0,'duby','img/duby.png');
const cat2 = new Cats(1,'jojjo','img/jojjo.jpg');
const cat3 = new Cats(2,'cattoy','img/cattoy.jpg');
const cat4 = new Cats(3,'flycat','img/fycat.jpg');
const cat5 = new Cats(4,'Cats','img/cats.png');

let catArray = [];
catArray.push(cat1,cat2,cat3,cat4,cat5);

//给猫图片添加监听事件，点击猫图片，对应的点击数增加
$('img').click(function() {
  let currentname = $(this).attr('alt');
  //console.log(currentname);
  catArray.forEach(function(cat) {
    if(cat.name === currentname) {
      cat.addClicks();
    }
  });
});

//添加猫列表侧边栏
$('.cat-nav').append("<ul id = 'cat-list'></ul>");
catArray.forEach(function(cat) {
  $("#cat-list").append(`
    <li>${cat.name}</li>`);
});

//给猫名字列表添加监听事件，点击名字，切换对应的猫卡片
$('#0').css('display','block');//默认第一只猫显示



$('li').click(function() {
  let selectcat = $(this).text();
  console.log(selectcat);
  catArray.forEach(function(cat) {
    $(`#${cat.id}`).css('display','none');
    if (cat.name === selectcat) {
      console.log(selectcat);
      $(`#${cat.id}`).css('display','block');
    }

  });
});
