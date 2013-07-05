(function(){
  // get the canvas, 2d context, paragraph for data and set the radius
  var canvas = document.getElementsByTagName('canvas')[0],
      ctx = canvas.getContext('2d'),
      lastPosition, toolId;

  // set the canvas to cover the screen
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;

  // move the context co-ordinates to the bottom middle of the screen
  ctx.translate(canvas.width/2, canvas.height);

  ctx.strokeStyle = "rgba(255,0,0,0.9)";
  ctx.lineWidth = 2;

  function draw(frame){
    var tool, currentPosition, i, len;
    if(toolId !== undefined){
      // we have a current toolId, so we should look for it in this frame
      tool = frame.tool(toolId);
      // if the tool is valid, i.e. it is still in the frame
      if(tool.valid){
        // we take the position of its tip
        currentPosition = tool.tipPosition;
        // and if it is closer to the screen than the device
        if(currentPosition.z < 0){
          // we draw a line between the current position and the previous one
          ctx.beginPath();
          ctx.moveTo(lastPosition.x, -lastPosition.y);
          ctx.lineTo(currentPosition.x, -currentPosition.y);
          ctx.stroke();
        }
        // finally, we update the last position
        lastPosition = currentPosition;
      }else{
        // the tool is not valid, let's find a new one.
        toolId = undefined;
        lastPosition = undefined;
      }
    }else{
      // we do not have a tool right now so we should look for one
      if(frame.tools.length > 0){
        // if the frame has some tools in it, we choose the first one
        tool = frame.tools[0];
        toolId = tool.id;
        lastPosition = tool.tipPosition;
      }
      // we should also look for a gesture to see if we should clear the drawing
      if(frame.gestures.length > 0){
        // we check each gesture in the frame
        for(i=0, len=frame.gestures.length; i<len; i++){
          // and if one is the end of a swipe, we clear the canvas
          if(frame.gestures[i].type === 'swipe' && frame.gestures[i].state === 'stop'){
            ctx.clearRect(-canvas.width/2,-canvas.height,canvas.width,canvas.height);
          }
        }
      }
    }
  }

  // we have to enable gestures so that the device knows to send them through the websocket
  Leap.loop({ enableGestures: true }, draw);
})();

