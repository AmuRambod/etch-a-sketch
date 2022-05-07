//DEFAULT values
const DEFAULT_SIZE = 20;
const DEFAULT_INK = "black";

let mouseDown = false; //this variable helps us to track the position of the mouse button
document.body.addEventListener("mousedown",() => mouseDown = true);
document.body.addEventListener("mouseup",() => mouseDown = false);

//#region Plate
const plate = document.querySelector(".plate");

//color of the ink: DEFAULT = "black"
let ink = DEFAULT_INK;

// this function creates the plate with size its given and adds two `EventListener`s to each cell.
function createPlate(size){
  plate.style.display = "grid";
  plate.style["grid-template"] = `repeat(${size},1fr) / repeat(${size},1fr)`;
  console.log("kir");

  //creating the cells and adding the `EventListener`s:
  for(let i = 1;i <= (size**2);i++){
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("mousedown",changeColor);
    cell.addEventListener("mouseover",changeColor);
    plate.appendChild(cell);
  }
}

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

//clear button
const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click",clearPlate)

//#region main()
window.onload = () =>{
  createPlate(DEFAULT_SIZE);
}
//#endregion main()