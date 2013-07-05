(function(){
  // get the canvas, 2d context, paragraph for data and set the radius
  var canvas = document.getElementsByTagName('canvas')[0],
      ctx = canvas.getContext('2d'),
      info = document.getElementById('data'),
      radius = 10;

  // set the canvas to cover the screen
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;

  // move the context co-ordinates to the bottom middle of the screen
  ctx.translate(canvas.width/2, canvas.height);

  ctx.fillStyle = "rgba(0,0,0,0.9)";
  ctx.strokeStyle = "rgba(255,0,0,0.9)";
  ctx.lineWidth = 5;

  function draw(frame) {
    // set up data array and other variables
    var data = [],
        pos, i, len;

    // cover the canvas with a 10% opaque layer for fade out effect.
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.fillRect(-canvas.width/2,-canvas.height,canvas.width,canvas.height);

    // set the fill to black for the points
    ctx.fillStyle = "rgba(0,0,0,0.9)";

    // loop over the frame's pointables
    for (i=0, len=frame.pointables.length; i<len; i++) {
      // get the pointable and its position
      pos = frame.pointables[i].tipPosition;

      // add the position data to our data array
      data.push(pos);

      // draw the circle where the pointable is
      ctx.beginPath();
      ctx.arc(pos.x-radius/2 ,-(pos.y-radius/2),radius,0,2*Math.PI);
      ctx.fill();
      ctx.stroke();
    }

    // print out our position points
    info.innerHTML = data.join(', ');
  };

  // run the animation loop with the draw command
  Leap.loop(draw);
})();
