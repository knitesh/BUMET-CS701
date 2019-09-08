(function() {
  // Get the pointer to Slider
  const slider = document.querySelector("#bullsEyeSlider");
  const sliderValue = document.querySelector("#bullsEyeSliderValue");

  // Canvas : widht 400 height 400
  const canvas = document.querySelector("#canvas");
  try {
    const ctx = canvas.getContext("2d");
    canvas.width = 400;
    canvas.height = 400;

    // Default Values
    const colors = ["#FF0000", "#0000FF"];
    const outerRadius = 200;
    const startAngle = 0;
    const endAngle = Math.PI * 2;
    // drawBullsEye: function to draw bulls eye based on the bandsize provided
    const drawBullsEye = bandSize => {
      sliderValue.innerText = bandSize;
      for (
        let radius = outerRadius, colorIndex = 0;
        radius > 0;
        radius = radius - bandSize,
          colorIndex = (colorIndex + 1) % colors.length
      ) {
        ctx.fillStyle = colors[colorIndex];
        ctx.beginPath();
        ctx.arc(
          canvas.width / 2,
          canvas.height / 2,
          radius,
          startAngle,
          endAngle
        );
        ctx.closePath();
        ctx.fill();
      }
    };

    // Draw first bulls Eye of rbandSize = 25
    drawBullsEye(25);

    // add a onChange event listner for Slider and draw bulls eye based on slider value
    slider.addEventListener("change", event => {
      drawBullsEye(event.target.value);
    });
  } catch (err) {
    console.log(err);
  }
})();
