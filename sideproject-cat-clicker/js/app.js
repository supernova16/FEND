

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
const cat3 = new Cats(3,'cattoy','img/cattoy.jpg');

let catArray = [];
catArray.push(cat1,cat2,cat3);

$('img').click(function() {
  let currentname = $(this).attr('alt');
  //console.log(currentname);
  catArray.forEach(function(cat) {
    if(cat.name === currentname) {
      cat.addClicks();
    }
  });
});
