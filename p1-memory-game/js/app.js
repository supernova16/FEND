/*
 * 创建一个包含所有卡片的数组
 */

// 从 index.html 文本中获取 card list,并将卡片全部翻面，即 class 全改为为 card
const cardlist = $('.deck').children().attr('class','card');

let cards = [];

//将 card list 添加到 cards 数组中
for(let i = 0; i < cardlist.length; i++) {
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



/**
* @description 洗牌函数来自于 http://stackoverflow.com/a/2450976
* @param {Array} array - 需要被打乱的数组
*/
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

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
 function match() {
   this.className = 'card match animated pulse';
 }

 // 卡片重新变为隐藏状态
 function hide() {
   this.className = 'card';
 }

//当前状态为 打开 的卡片数组
let open = [];

//检查卡片匹配情况
function check() {
  //每两张卡片检查一次匹配
  if (open.length == 2) {
    if (open[0].firstElementChild.className == open[1].firstElementChild.className) {
      match.call(open[0]);
      match.call(open[(1)]);
    } else {
        let opened1 = open[0];//把数组元素存到变量中，就可以避免延时函数还没执行完，数组已经清空的问题。
        let opened2 = open[1];
        opened1.className = 'animated swing card open show';
        opened2.className = 'animated swing card open show';
        setTimeout(function() {
          hide.call(opened1);
          hide.call(opened2);
        },500);
    }
    open = [];
  }

  //当全部卡片都匹配成功
  if ($('.card.match').length == cards.length) {
    win();
  }

}

//步数和对应星星数
let steps = 0;
let stars = 3;
$('.moves').text('0');

function stepadd() {
  steps ++;
  moves = steps / 2;
  if (moves%1 === 0) {
    $('.moves').text(moves);
  }
  //根据步数修改星星数
  switch(moves) {
    case 16:
            $('.stars').find('li:eq(2)').children().attr('class','fa fa-star-o');
            stars = 2;
            break;
    case 22:
            $('.stars').find('li:eq(1)').children().attr('class','fa fa-star-o');
            stars = 1;
            break;
  }
}




//计时器
let second = 0;
let timer = setInterval(function() {
  second++;
  $('.second').text(second);
},1000);



//完成游戏
function win() {
  clearInterval(timer);
  $('.container').empty();
  $('.container').html("<div class='dialog'>\
  <h1>Congratulations!</h1>\
  <p id = score-move></p><p id = score-time></p>\
  <ul id = score-star>\
  <li><i class = 'fa fa-star'></i></li>\
  <li><i class = 'fa fa-star'></i></li>\
  <li><i class = 'fa fa-star'></i></li></ul>\
  <button>Play again!</button></div>");
  $('#score-move').text(`Moves: ${moves + 0.5} ` );
  $('#score-time').text(`Times: ${second} s`);
  switch(stars) {
    case 2:
           $('#score-star').find('li:eq(2)').children().attr('class','fa fa-star-o');
           break;
    case 1:
           $('#score-star').find('li:eq(2)').children().attr('class','fa fa-star-o');
           $('#score-star').find('li:eq(1)').children().attr('class','fa fa-star-o');
           break;
  }
  $('button').click(function(){location.reload();});
}



//restart
$('.restart').click(function(){
  location.reload();
});
