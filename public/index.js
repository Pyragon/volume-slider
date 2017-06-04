$(document).ready(function() {

  var canvas = $('<canvas/>').attr({width:150, height:300}).appendTo('body');

  var context = canvas.get(0).getContext('2d');

  var block_size = 15; //10 blocks
  var h = (300/block_size);
  var w = (150/block_size);

  var cur_y = h-1;

  var cur_x = 0;
  var our_block_size = 6;

  var direction = 'right';

  var fps = 1;

  var tick_timeout = null;

  var state = null;

  function newState() {
    state = new Array(w);
    for(var x = 0; x < w; x++)
      state[x] = new Array(h);
  }

  newState();
  tick();

  function start() {
    fillBlocks('red');
    tick_timeout = setTimeout(tick, 1000 / fps);
  }

  function tick() {
    tick_timeout = setTimeout(tick, 1000 / fps);
    eraseBlocks();
    move(direction);
  }

  function fillBlocks(colour) {
    for(var i = 0; i < our_block_size; i++) {
      var index = cur_x + i;
      context.fillStyle = colour;
      context.fillRect(index * block_size, cur_y * block_size, block_size, block_size);
    }
  }

  function eraseBlocks() {
    for(var i = 0; i < w; i++) {
      context.fillStyle = 'white';
      context.fillRect(i * block_size, cur_y * block_size, block_size, block_size);
    }
  }

  function pastEnd(x) {
    if(direction === 'right') return x+our_block_size > w;
    else if(direction === 'left') return x < 0;
  }

  function move(direction) {
    cur_x += (direction === 'right' ? 1 : -1);
    fillBlocks('red');
    if(pastEnd(cur_x + ((direction === 'right' ? 1 : -1))))
      changeDirection();
  }

  function changeDirection() {
    if(direction === 'left') direction = 'right';
    else if(direction === 'right') direction = 'left';
  }

  function topUp() {
    clearTimeout(tick_timeout);
    if(checkLoss()) {
      lose();
      return false;
    }
    for(var x = 0; x < our_block_size; x++) {
      state[cur_x + x][cur_y] = true;
      console.log(`State ${cur_x + x},${cur_y} is now true`);
    }
    cur_y--;
    tick();
  }

  function lose() {
    console.log("You lose!");
  }

  function checkLoss() {
    if(cur_y == h-1) //we've moved to second column, obv always allowed
      return false;
    for(var x = 0; x < our_block_size; x++) {
      if(state[cur_x + x][cur_y+1] === true)
        return false;
      else
        console.log(`No block on ${cur_x+x},${cur_y}`);
    }
    return true;
  }

  $(document).on('keydown', function(e) {
    if(e.which == 83) loss = true;
    else if(e.which == 32) topUp();
  });

});
