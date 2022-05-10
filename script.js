//DEFAULT values
const DEFAULT_MODE = "pencil-mode";
const DEFAULT_SIZE = 20;
const DEFAULT_INK = "black";

//tracking the state of the mouse key
let mouseDown = false; //this variable helps us to track the position of the mouse button
let updateSizeMouseDown = false; //this variable tells if the first event of the "sizeSlider" was a mouseDown or the mouseDown was from another place

document.body.addEventListener("mousedown",() => mouseDown = true);
document.body.addEventListener("mouseup",() => mouseDown = false);

//setting the DEFAULT values to the main function variables
let currentMode = DEFAULT_MODE;
let plateSize = DEFAULT_SIZE;
let ink = DEFAULT_INK;

//#region Plate
const plate = document.querySelector(".plate");

// this function creates the plate with size of global "plateSize" and adds two `EventListener`s to each cell.
function createPlate(){
  plate.innerHTML = "";
  plate.style.display = "grid";
  plate.style["grid-template"] = `repeat(${plateSize},1fr) / repeat(${plateSize},1fr)`;

  //creating the cells and adding the `EventListener`s:
  for(let i = 1;i <= (plateSize**2);i++){
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("mousedown",changeColor);
    cell.addEventListener("mouseover",changeColor);
    plate.appendChild(cell);
  }
}

//this function changes the color of the cells that have been drawn on
function changeColor(e){
  if(e.type === "mouseover" && !mouseDown) return;
  let color;
  switch (currentMode){
    case "pencil-mode":
      color = ink;
      e.target.classList.add("drawn");
      break;
    case "eraser-mode":
      color = "white";
      e.target.classList.remove("drawn");
      break;
    default:
      console.log(`mode ERROR!\ncurrentMode = ${currentMode}`);
      break;
  }
  e.target.style["background-color"] = color;
}

//this function clears the plate
function clearPlate(){
  const cells = plate.querySelectorAll(".cell");
  cells.forEach(cell => {
    cell.style["background-color"] = "white";
    cell.classList.remove("drawn");
  })
}

//#endregion Plate

//size range input
const sizeSlider = document.querySelector("#size-slider");
const sizeLabel = document.querySelector('label[for="size-slider"]');

const sizeMin = parseInt(sizeSlider.getAttribute("min"));
const sizeMax = parseInt(sizeSlider.getAttribute("max"));
const sizeRange = sizeMax - sizeMin;

sizeSlider.onmouseup = () => {
  sizeLabel.classList.remove("active");
  if(!updateSizeMouseDown) return;
  updateSizeMouseDown = false;
  createPlate();
}

sizeSlider.onmousemove = updateSize;

sizeSlider.onmousedown = updateSize;

//this function updates the value of the global "plateSize" to the "sizeSlider"s value
function updateSize(e){
  if(e.type == "mousedown"){
    updateSizeMouseDown = true;
  }
  if(!updateSizeMouseDown) return;
  plateSize = sizeSlider.value;
  
  //this part makes the label follow the "thumb" of the slider
  let translateX = ((plateSize-sizeMin)/sizeRange)*24 - 12;
  sizeLabel.style.setProperty("--position-x",`${translateX}rem`);
  
  sizeLabel.textContent = plateSize;
  sizeLabel.classList.add("active");
}

//clear button
const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click",clearPlate)

//options button
const overlay = document.querySelector("#overlay");
//clicking anywhere except the option box when the box is open => close the box
overlay.onclick = () =>{
  overlay.classList.remove("active");
  optionsButton.classList.remove("active");
}

const optionsButton = document.querySelector("#options");
optionsButton.addEventListener("click",openOptionsBox);

//this function opens the ".options-toolbar"
function openOptionsBox(){
  overlay.classList.add("active");
  optionsButton.classList.add("active");
}

//explaining this chunk of code:
// get all the ".option-mode" buttons => when on of them is clicked =>
// get the targets id(i.e mode) => add class ".active" to the target and
// remove the class ".active" from the other one.
const modeButtons = optionsButton.querySelectorAll(".options-mode");
modeButtons.forEach(button => {
  button.onclick = (e) => {
    currentMode = e.target.getAttribute("id");
    optionsButton.querySelector(`#${currentMode}`).classList.add("active");
    optionsButton.querySelector(`.options-mode:not(#${currentMode})`).classList.remove("active");
    //setting the cursor
    document.querySelector(":root").style.setProperty("--current-mode-cursor",`var(--${currentMode}-cursor)`);
  }
})

// color-picker
const colorPicker = document.querySelector("#color-picker");
colorPicker.onchange = (e) => ink = e.target.value;

//#region main()
window.onload = () =>{
  createPlate();
}
//#endregion main()