const width = 100;
const height = 80;
const offset = 15;

// 这是我们的玩家要躲避的敌人
let Enemy = function(x,row,speed) {
  let n = 1;
  switch (row) {
    case 1:
      n = 2;
      break;
    case 2:
      n = 3;
      break;
    case 3:
      n = 4;
      break;
  }
  this.x = x;
  this.y = height * n - offset;
  this.speed = speed;
  this.sprite = 'images/enemy-bug.png';// 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x = this.x + this.speed * dt;
    if (this.x > 505) {
      this.x = 0;
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
let Player = function() {
  this.x = width * 2;
  this.y = height * 5 - offset;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(direction) {
  if (this.x < 0) {
    this.x = 0;
  }else if (this.x > width * 4) {
    this.x = width * 4;
  }else if (this.y > (height * 5 - offset)) {
    this.y = height * 5 - offset;
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
  switch(direction) {
    case 'up':
      this.y = this.y - height;
      break;
    case 'down':
      this.y = this.y + height;
      break;
    case 'left':
      this.x = this.x - width;
      break;
    case 'right':
      this.x = this.x + width;
      break;
  }
};

Player.prototype.reset = function() {
  this.x = width * 2;
  this.y = height * 5 - offset;

};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
const enemy1 = new Enemy(0,1,100);
const enemy2 = new Enemy(300,2,200);
const enemy3 = new Enemy(100,3,150);
const enemy4 = new Enemy(0,1,100);
const enemy5 = new Enemy(100,2,50);
const enemy6 = new Enemy(500,3,50);
const player = new Player();
const allEnemies = [];
allEnemies.push(enemy1,enemy2,enemy3,enemy4,enemy5,enemy6);//只有数组里的enemy才会被重绘


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
