//context.arc(x,y,r,sAngle,eAngle,counterclockwise);
(function(doc) {
  // Default values
  const radius = 30;
  const starAngle = 0;
  const endAnagle = 2 * Math.PI;
  const counterclockwise = true;
  const canvas = doc.getElementById("canvas");
  try {
    const context = canvas.getContext("2d");
    // click event handler
    canvas.onclick = function(e) {
      const nextColor = randomColor(); // get a random color
      context.fillStyle = nextColor;
      // mouse x and y relative to canvas
      x = e.clientX - e.target.offsetLeft;
      y = e.clientY - e.target.offsetTop;

      // start new arc drawing
      context.beginPath();
      context.arc(x, y, radius, starAngle, endAnagle, counterclockwise);
      context.fill();
      context.closePath();
    };
  } catch (err) {
    console.log(err);
  }
})(document);
