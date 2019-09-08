//context.arc(x,y,r,sAngle,eAngle,counterclockwise);
(function(doc) {
  // Default values
  const radius = 30;
  const starAngle = 0;
  const endAnagle = 2 * Math.PI;
  const counterclockwise = true;
  // Array to hold center of all existing circle on canvas
  let circleCenters = [];

  //helper functions :
  const distance = function(point1, point2) {
    var a = point1.x - point2.x;
    var b = point1.y - point2.y;
    var distance = Math.sqrt(a * a + b * b);
    // console.log(distance);
    return distance;
  };

  //get the canvas element
  const canvas = doc.getElementById("canvas");
  try {
    //get the canvas context
    const context = canvas.getContext("2d");
    // Drae new circle
    const drawCircle = function(circle) {
      context.fillStyle = circle.color;
      context.beginPath();
      context.arc(
        circle.x,
        circle.y,
        radius,
        starAngle,
        endAnagle,
        counterclockwise
      );
      context.fill();
      context.closePath();
    };
    // click event handler
    canvas.onclick = function(e) {
      // mouse x and y relative to canvas
      x = e.clientX - e.target.offsetLeft;
      y = e.clientY - e.target.offsetTop;

      // Check if canvas already has circles
      // if yes, check the distance between current clicked coordinates
      // and existing circles center,
      // if it is less than radius *2 == circles are overlapping
      // remove the old circle for the circle array
      if (circleCenters.length > 0) {
        circleCenters.forEach((circle, idx) => {
          if (distance({ x, y }, circle) <= radius * 2) {
            circleCenters = circleCenters.filter(
              points => circle.x != points.x && circle.y != points.y
            );
          }
        });
      }

      // insert new center into the circle array
      circleCenters.push({ x, y, color: randomColor() });
      // cleart the whole canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
      //redraw circles present in the circle array
      circleCenters.forEach(function(circle) {
        drawCircle(circle);
      });
    };
  } catch (err) {
    console.log(err);
  }
})(document);
