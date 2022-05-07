//DEFAULT values
const DEFAULT_SIZE = 20;
const DEFAULT_INK = "black";

//tracking the state of the mouse key
let mouseDown = false; //this variable helps us to track the position of the mouse button
let updateSizeMouseDown = false; //this variable tells if the first event of the "sizeSlider" was a mouseDown or the mouseDown was from another place

document.body.addEventListener("mousedown",() => mouseDown = true);
document.body.addEventListener("mouseup",() => mouseDown = false);

//#region Plate
const plate = document.querySelector(".plate");

//color of the ink: DEFAULT = "black"
let ink = DEFAULT_INK;
let plateSize = DEFAULT_SIZE;

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
  e.target.style["background-color"] = ink;
  e.target.style.opacity = 0.85;
}

//this function clears the plate
function clearPlate(){
  const cells = plate.querySelectorAll(".cell");
  cells.forEach(cell => {
    cell.style["background-color"] = "white";
    cell.style.opacity = 0.5;
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

//#region main()
window.onload = () =>{
  createPlate();
}
//#endregion main()