/*
 * 创建一个包含所有卡片的数组
 */

// 从 index.html 文本中获取 card list,并将卡片全部翻面，即 class 全改为为 card
var cardlist = $('.deck').children().attr('class','card');

var cards = [];

//将 card list 添加到 cards 数组中
for(var i = 0; i < cardlist.length; i++) {
  cards.push(cardlist[i]);
}


/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */

//洗牌
shuffle(cards);

//将 cards 中的项逐一添加到 index.html 的 .deck 中,
cards.forEach(function(card) {
  $('.deck').append($(card));
});



// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */

 // 卡片事件监听，调用函数
 $('.deck').on('click','li',function() {
   show.call(this);//注意 this 作用域
   open.push(this);
   check();
   stepadd();

 });

 // 卡片变为显示状态
 function show() {
   this.className = 'card open show';
 }

 // 卡片变为匹配状态
 function match(card) {
   card.className = 'card match';
 }

 // 卡片重新变为隐藏状态
 function hide(card) {
   card.className = 'card';
 }

//当前状态为 打开 的卡片数组
var open = [];

//检查卡片匹配情况
function check() {
  //每两张卡片检查一次匹配
  if (open.length == 2) {
    if (open[0].firstElementChild.className == open[1].firstElementChild.className) {
      match(open[0]);
      match(open[1]);
      open.length = 0;//清空 open 数组
    } else {
      setTimeout(function() {
        hide(open[0]);
        hide(open[1]);
        open.length = 0;
      },300);

    }
  }
  //当全部卡片都匹配成功
  if ($('.card.match').length == 2) {
    win();
  }

}

//步数和对应星星数
var steps = 0;
var stars = 3;
$('.moves').text('0');

function stepadd() {
  steps ++;
  moves = steps / 2;
  if (moves%1 === 0) {
    $('.moves').text(moves);
  }
  //根据步数修改星星数
  switch(moves) {
    case 12:
            $('.stars').find('li:eq(2)').children().attr('class','fa fa-star-o');
            stars = 2;
            break;
    case 16:
            $('.stars').find('li:eq(1)').children().attr('class','fa fa-star-o');
            stars = 1;
            break;
    case 20:
            $('.stars').find('li:eq(0)').children().attr('class','fa fa-star-o');
            stars = 0;
            break;
  }
}




//计时器
var second = 0;
var starttimer = setInterval(function() {
    second++;
    $('.second').text(second);
},1000);


//完成游戏
function win() {
  clearInterval(starttimer);
  $('.container').empty();
  $('.container').html("<div class='dialog'>\
  <h1>You got it!</h1>\
  <p id = score-move></p><p id = score-time></p>\
  <ul id = score-star>\
  <li><i></i></li>\
  <li><i></i></li>\
  <li><i></i></li></ul>\
  <button>Play again!</button></div>");
  $('#score-move').text(`Moves: ${moves + 0.5} ` );
  $('#score-time').text(`Times: ${second} s`);
  switch(stars) {
    case 3:
           $('#score-star').find('li').children().attr('class','fa fa-star');
           break;
    case 2:
           $('#score-star').find('li:eq(2)').children().attr('class','fa fa-star-o');
           break;
    case 1:
           $('#score-star').find('li:eq(2)').children().attr('class','fa fa-star-o');
           $('#score-star').find('li:eq(1)').children().attr('class','fa fa-star-o');

           break;
    case 0:
           $('#score-star').find('li').children().attr('class','fa fa-star-o');
           break;


  }
  $('button').click(function(){location.reload();});
}



//restart
$('.restart').click(function(){
  location.reload();
});
