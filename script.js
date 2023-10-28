const canvas = document.getElementById("canvas"),
toolBtns = document.querySelectorAll(".tool"),
eraser = document.getElementById("eraser");
fillColor = document.querySelector("#fill-color"),
sizeSlider = document.querySelector("#size-slider"),
// colorBtns = document.querySelectorAll(".colors .option"),
colorPicker = document.querySelector("#color-picker"),
clearCanvas = document.querySelector(".clear-canvas"),
saveImg = document.getElementById("save-img");

const ctx = canvas.getContext("2d"); // context object : will be responsible for drawing on canvas.

// setting height and width of canvas as sync with viewport.
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// setting canvas background colorfill
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvas.width, canvas.height);


// global values with default values
let prevMouseX, prevMouseY, snapshot,
endX, endY, // for use to draw arrow
isDrawing = false,
selectedTool = "pointer",
brushWidth = 5,
selectedColor = "black";


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
}

// Mouse move function:
const drawing = (e) => {
    if(!isDrawing) return; // if isDrawing is false return from here
    endX = e.offsetX;
    endY = e.offsetY;
    ctx.putImageData(snapshot, 0, 0); // adding copied canvas data on to this canvas

    // According to buttons
    if(selectedTool === "pencil" || selectedTool === "eraser") {
        // if selected tool is eraser then set strokeStyle to white 
        // to paint white color on to the existing canvas content else set the stroke color to selected color
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY); // creating line according to the mouse pointer
        ctx.stroke();                     // drawing/filling line with color
    } else if(selectedTool === "square"){
        drawRect(e);
    } else if(selectedTool === "circle"){
        drawCircle(e);
    } else if(selectedTool === "line") {
        drawLine(e);
    } else if(selectedTool === "diamond") {
        drawDiamond(e);
    } else if(selectedTool === "arrow") {
        drawArrow(ctx, prevMouseX, prevMouseY, endX, endY);
    }
}

toolBtns.forEach(btn => {
    btn.addEventListener("click", () => { // adding click event to all btn divs 
        document.querySelectorAll(".icon-div").forEach(tool => {
            tool.classList.remove("active-btn");
        });
        btn.classList.add("active-btn")
        selectedTool = btn.id;
        console.log(selectedTool);
    });
});
