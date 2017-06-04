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

  var loss = false;

  var tick_timeout = null;

  tick();

  function start() {
    fillBlocks('red');
    tick_timeout = setTimeout(tick, 1000 / fps);
  }

  function tick() {
    if(loss == true) return;
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
    cur_y--;
    clearTimeout(tick_timeout);
    tick();
  }

  $(document).on('keydown', function(e) {
    if(e.which == 83) loss = true;
    else if(e.which == 32) topUp();
  });

});
