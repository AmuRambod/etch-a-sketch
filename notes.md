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
## 2 Ordibehesht 1401
### Creating and managing a custom cursor
I imagined a feature that when the user starts to draw on the `.plate`, the cursor turns into a pencil. At first I thought creating and adding the custom cursor to my CSS was the hard part. As it turned out, I was wrong! It was just one simple line of CSS:
```css
.myElement {
  cursor: url(./cursor/Pencil.cur),default;
}
```
Note: the second argument(default), is a fallback if for some reason our custom cursor does'nt work.

The hard part was to figure out how to change the cursor when mouse button was down on a cell and turn it back to normal once the mouse button was up. My first idea was to add an `:active` pseudo-element to the `.cell`. How ever when you tried to drag the mouse out of the first activated cell, the cursor would turn back to normal. My second idea was to expand the `mouseover` event on the `.cell` so if the mouse was down, the cursor would change to pencil and if not, the cursor would stay the same. The problem with that idea was that the cursor would glitch when crosing the `.cell` borders to another one.

And after other failed ideas, the soluton was like this:
```css
.plate:active *{
  cursor: url(./cursor/Pencil.cur),default;
}
```
This would define the `:active` state for the `.plate` and it would change the cursor on itself and all of its child elements.

## 14 Ordibehesht 1401
### Making the "footer" visible and beautiful
I added some font-size, color, line-break and line-height to the footer and like my last project (Rock-Paper-Scisors), I tried to add a `:hover` effect to the links to my GitHub page and TheOdinProject so it would do a `transform:scale(1.3)`. However, for some reason It would'nt work. After some hair pulling and existensial crisis, I found that to solve this issue you just have to add this:
```css
footer a{
  display: inline-block;
}
```
Turns out, you can not do `transform` to an `inline` element; so you have to change the `display` to `block` or `inline-block` to add animations. The reason I did'nt have to do that in my last project was I did a `display:flex` to its parent element (footer tag) and when I disabled it, the animation would'nt work!

**I Love STACK-OVERFLOW!!!**

### Adding functionalities
When I started this project, I envisioned a web-app that (at least visually) mimics a real etch-a-sketch board. So I wanted to add those two round knobs on bottom corners and use them to give my app a bit of magic.

The bottom right one is gonna be used for clearing the plate. And for the other button, I want it to open a pop-up window (modal) that has theese options:

1. Selecting the ink color
2. Eraser
3. a slider for adjusting the size of the plate. I have'nt decided on wether I want it on the pop-up or on the bottom side of the `.frame`.

### Clear button
I added a button to clear the plate which does its job with this bit of code:
```js
clearButton.addEventListener("click",() => {
  const cells = plate.querySelectorAll(".cell");
  cells.forEach(cell => {
    cell.style["background-color"] = "white";
    cell.style.opacity = 0.5;
  })
})
```
It basically goes through every cell on the `plate` and turns their background-color and opacity to their undrawn stage.

I had another hurdle with `transform:scale()` in styling the clear-button. This time the problem was that I prior to adding the `:hover` pseudo-class, I used `transform: translate()` to position the knob where I wanted and I used a very specific selector: `.circular-button#clear` so it would automatically overwrite the `.circular-button:hover` selector. This is how  solved it:
```css
.circular-button:hover{
  transform: translate(-1.5rem , -1.5rem) scale(1.5) !important; 
}
```
I added an `!important` at the end of it. Which is a **BAD PRACTICE!**

### Fixing the bug with custom cursor
When I added the [custom cursor](#creating-and-managing-a-custom-cursor) on the [2nd of Ordibehesht](#2-ordibehesht-1401), I had to deal with the headache of making the cursor not glitch when crossing borders of the `.cell`s. At the time my solution was this:
```css
.plate:active *{
  cursor: my-custom-cursor;
}
```
This line of code means this: 
>*If anywhere* **on the `.plate`** *is active (the mouse key is down), every child elements cursor has to change.*

However this has problem! The problem is if you want to enter the `.plate` from outside of it with your mouse down, because the mouse-event happend outside of the `.plate`, the cursor does'nt change.

I fixed it by replacing it with this:
```css
*:active .plate *{
  cursor: my-custom-cursor;
}
```
which means:
>*If anywhere* **on the whole web-page** *is active (the mouse key is down), the cursor of every child element of the `.plate` has to change.*
