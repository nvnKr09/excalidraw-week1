const canvas = document.getElementById("canvas"),
  toolBtns = document.querySelectorAll(".tool"),
  fillColor = document.querySelector("#fill-color"),
  sizeSlider = document.querySelector("#size-slider"),
  readyMadeColor = document.querySelectorAll(".readymade-color"),
  bgReadyMadeColor = document.querySelectorAll(".bg-readymade-color"),
  colorPicker = document.querySelector("#color-picker"),
  bgColorPicker = document.querySelector("#color-picker-bg"),
  clearCanvas = document.querySelector(".clear-canvas"),
  saveImg = document.getElementById("save-img");

const ctx = canvas.getContext("2d"); // context object : will be responsible for drawing on canvas.

// setting height and width of canvas as sync with viewport.
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// global values with default values
let prevMouseX,
  prevMouseY,
  snapshot,
  endX,
  endY, // for use to draw arrow
  isDrawing = false,
  selectedTool = "pointer",
  brushWidth = 5,
  selectedColor = "black", // for stroke
  bgSelectedColor = "#fff";

// Setting Canvas Background color
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Mouse down function:
const startDraw = (e) => {
  isDrawing = true;
  prevMouseX = e.offsetX; // passing current mouseX position as prevMouseX value
  prevMouseY = e.offsetY; // passing current mouseY position as prevMouseY value
  ctx.beginPath(); // creating new path to draw
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = brushWidth; // passing brushSize as line width
  ctx.strokeStyle = selectedColor; // passing selectedColor as stroke style
  ctx.fillStyle = selectedColor; // passing selectedColor as fill style
  // copying canvas data & passing as snapshot value.. this avoids dragging the image
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

// Mouse move function:
const drawing = (e) => {
  if (!isDrawing) return; // if isDrawing is false return from here
  // arrow vars
  endX = e.offsetX;
  endY = e.offsetY;
  //
  ctx.putImageData(snapshot, 0, 0); // adding copied canvas data on to this canvas

  // According to buttons
  if (selectedTool === "pencil") {
    ctx.strokeStyle = selectedColor;
    ctx.lineTo(e.offsetX, e.offsetY); // creating line according to the mouse pointer
    ctx.stroke(); // drawing/filling line with color
  } else if (selectedTool === "eraser") {
    ctx.strokeStyle = bgSelectedColor;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  } else if (selectedTool === "square") {
    drawRect(e);
  } else if (selectedTool === "circle") {
    drawCircle(e);
  } else if (selectedTool === "line") {
    drawLine(e);
  } else if (selectedTool === "diamond") {
    drawDiamond(e);
  } else if (selectedTool === "arrow") {
    drawArrow(ctx, prevMouseX, prevMouseY, endX, endY);
  }
  const lock = document.getElementById("locker");
  if(selectedTool === "locker"){
    lock.innerHTML = `<i class="fa-light fa-lock"></i>`;
  } else {
    lock.innerHTML = `<i class="fa-light fa-unlock"></i>`;
  }
};

toolBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // adding click event to all btn divs
    document.querySelectorAll(".icon-div").forEach((tool) => {
      tool.classList.remove("active-btn");
    });
    btn.classList.add("active-btn");
    selectedTool = btn.id;
    console.log(selectedTool);
    // cursor styling on canvas
    if (
      selectedTool === "square" ||
      selectedTool === "circle" ||
      selectedTool === "pencil" ||
      selectedTool === "diamond" ||
      selectedTool === "arrow" ||
      selectedTool === "line" ||
      selectedTool === "eraser" ) {
      canvas.style.cursor = "crosshair";
      document.querySelector(".editing-div").style.left = "16px";
    } else if (selectedTool === "hand") {
      canvas.style.cursor = "grab";
      document.querySelector(".editing-div").style.left = "-200px";
    } else {
      canvas.style.cursor = "default";
      document.querySelector(".editing-div").style.left = "-200px";
    }
  });
});
