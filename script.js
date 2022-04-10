
//#region Plate
const plate = document.querySelector(".plate");
let mouseDown = false; //this variable helps us to track the position of the mouse button
plate.addEventListener("mousedown",()=> mouseDown = true);
plate.addEventListener("mouseup",()=> mouseDown = false);

//color of the ink: DEFAULT = "black"
let ink = "black";

// this function creates the plate with size its given and adds two `EventListener`s to each cell.
function createPlate(size){
  let gridTemplate = "";
  for(let i = 1;i <= size;i++){
    gridTemplate += " auto ";
  }
  plate.style.display = "grid";
  plate.style["grid-template"] = `${gridTemplate} / ${gridTemplate}`;
  
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
}
//#endregion Plate

//#region main()
createPlate(16);
//#endregion main()