# Etch-a-Sketch notes
## 17 Farvardin 1401
I want to make the `plate`s grid layout with `CSS-grid` so... I need to learn that.
## 20 Farvardin 1401
I made the basic layout of the page and created the `plate` with size you have to specify in the `script.js`. It is hard-coded(for now).

My first problem is that I can not make the plate `cell`s change color when draging the mouse over them while holding the mouse key down.
## 21 Farvardin 1401
### mouse keydown issue
I fixed the issue with the holding the mouse key down thing: 
```js
let mouseDown = false;

plate.addEventListener("mousedown",()=> mouseDown = true);
plate.addEventListener("mouseup",()=> mouseDown = false);
```
`mouseDown` variable helps us to track the position of the mouse button.

and then added these `EventListener`s to the `cell`s:
```js
cell.addEventListener("mousedown",changeColor);
cell.addEventListener("mouseover",changeColor);
```
### grabbing issue
Sometimes, if the user holds the mouse key down for a while and does'nt move the mouse, the cursor turns into grabbing cursor and wrongly selects the cells.

fix:
```css
.cell{
  user-select: none;
}
```
## 24 Farvardin 1401
### plate mouse-down bug
I found a bug that when you hold the mouse down outside of the plate and then go inside it, it does'nt register and vice-versa if you hold the mouse key down and exit the plate and release the mouse key then go back inside, it registeres as if you never released the key.

fix:
``` JS
document.body.addEventListener("mousedown",()=> mouseDown = true);
document.body.addEventListener("mouseup",()=> mouseDown = false);
```
Replacing `plate.addEventListener` with `document.body.addEventListener`.
### A bit of code-cleanup
in order to create the `.plate`s grid template, I used to do it in a very caveman way with for-loops:
```js
let gridTemplate = "";
for(let i = 1;i <= size;i++){
  gridTemplate += " auto ";
}
plate.style["grid-template"] = `${gridTemplate} / ${gridTemplate}`;
```
There is a more inteligent way of doing this by using `repeat()`:
```js
plate.style["grid-template"] = `repeat(${size},1fr) / repeat(${size},1fr)`
```

## 30 Farvardin 1401
### Framing the plate
I decided it would be best(design wise) that my website resembles a real etch-a-sketch board so I designed a frame and added shadows (to both frame and texts). In order to create an illusion of insate from frame in the plate, I did this:
```css
.plate{
  /*creates a shadow inside the plate to create the illusion of depth*/
  box-shadow: 1rem 1rem 15px 0.5rem black inset;
}
.cell{
  /*to show the inset shadow of the plate*/
  opacity:0.5;
}
```
but I had to change the opacity of the cell after it have been colored to 0.85.

### Prelude to responsiveness
I changed all of the `px` values to rem and other relative units. In desktop view, I changed the `font-size` value on the `:root` element to 11px and in different viewport widths, I will change this value accordingly.

## 31 Farvardin 1401
### Mobile responsiveness
In order to make the sizes of every element responsive to viewport-width, I modified the `font-size` value of the `:root` element:
```css
:root{
  font-size: clamp(4.5px,0.9vw,11px);
}
```
The font size will be 0.9% of the viewport-width with the minimum of 4.5 pixels and maximum of 11 pixels.

And there was an issue of the background image for the mobile: It got janky and smooshed when the width was smaller than height. So in order to fix it, I rotated the original image 90° and saved it.
```css
@media screen and (orientation: portrait) {
  body {
    background-image: url(rotated-version-of-background-image.png);
  }
}
```
When the viewport-width is smaller than viewport-height(portrait mode), The background image will be the rotated version.