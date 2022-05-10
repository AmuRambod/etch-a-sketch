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


## 18 Ordibehesht 1401
Last night I hyper-focused on creating the `#size-slider` so much that I forgot to take notes of my progress or to commit my changes to git. So now my notes on this topic will not be very precise but I will try my best.

### Size slider
These sliders are `<input type="range>` and they have some attributes like *min*, *max*, *value* and so on to control the input value by these sliders.

Styling it was difficult. Turns out the styling is done by **Web-kit**s. [Here](https://brennaobrien.com/blog/2014/05/style-input-type-range-in-every-browser.html) is the article that teaches how to style these **range input**s.

And for the part that shows the `sizeValue` when you are sliding, I used the `<label>` for it and styled it. The clever part of this is that it follows the sliders **thumb** and the way I achieved this effect was like this:
```js
const sizeMin = parseInt(sizeSlider.getAttribute("min"));
const sizeMax = parseInt(sizeSlider.getAttribute("max"));
const sizeRange = sizeMax - sizeMin;
//these lines basically getting the "min" and "max" values of the range-input
//so if I want to, I can change them later

//this function updates the labels content as the "slider" slides.
function updateSize(){
  let translateX = ((plateSize-sizeMin)/sizeRange)*24 - 12;
  sizeLabel.style.setProperty("--position-x",`${translateX}rem`);

  let restOfTheCode = "Blah-Blah";
}
```
The first two lines of code in the `updateSize` function, basically calculates the portion of the current value in the range and converts it to the **24rem** distance of the slider which I figured it out by putting values on `--position-x` and testing it. The reason for the "-12" in the first line is that I centered the label so the range of `--position-x` is from *-12rem* to *+12rem*.

**PERSONAL NOTE: I coded the label following the thumb part when I was so tired and sleepless that I could'nt hold my eyelids open and my mom was actually worried about me :laughing:**

Long story short, I did it but it only works on chromium based browsers. And by the way every thing looks a bit janky in firefox and I don't know the reason. I added this to the bugs to fix!

## 20 Ordibehesht 1401
So I did it again! I hyper-focused on the options modal two days ago and I forgot to take notes and now I have no idea how I did it :sweat_smile:

### Options toolbox and Eraser mode
Yesterday, I added the `.options-toolbox`'s HTML and CSS and added JavaScript that would open and close the toolbox when you clicked on the `#options` button. Now, I added the *eraser-mode* and *pencil-mode* functionality. The way I achieved this was by defining a global variable `currentMode` in <ins>script.js</ins> that would change with clicking on `.option-mode` buttons and getting the *id* attribute of the pressed button.
```js
modeButtons.forEach(button => {
  button.onclick = (e) => {
    currentMode = e.target.getAttribute("id");
  }
})
```
And then, in the `changeColor(e)` function - that would change the color of the selected `.cell`, I did this:
```js
function changeColor(e){
  switch(currentMode){
    case "pencil-mode":
      e.target.style["background-color"] = ink;
      break;
    case "eraser-mode":
      e.target.style["background-color"] = white;
  }
}
```
On the [2nd of Ordibehesht](#creating-and-managing-a-custom-cursor), I added a custom cursor. And now I wanted the cursor to change to an eraser when on *eraser-mode*. So I defined two `:root` variables in my css for these two icons and another variable to track the current mode:
```css
:root{
  --pencil-mode-cursor: url(path-to-pencil-cursor);
  --eraser-mode-cursor: url(path-to-eraser-cursor);
  --current-mode-cursor: var(--pencil-mode-cursor);
  /* On load, the "pencil-mode" will be active */
}

*:active .plate *{
  cursor: var(--current-mode-cursor);
}
```
Then I controled the `--current-mode-cursor` in <ins>script.js</ins>:
```js
modeButtons.forEach(button => {
  button.onclick = (e) => {
    currentMode = e.target.getAttribute("id");
    document.querySelector(":root").style.setProperty("--current-mode-cursor",`var(--${currentMode}-cursor)`);
  }
})
```

### Adding the color-picker functionality
The `#color-picker` is an `<input type="color">` that will change the color of the ink, when drawing on the `.plate`. Styling it was a massive headache with `-webkit`s and I wasn't realy awake when I did it. So I don't remember how I did it. :sweat_smile:

However, the JavaScript part was like this:
```js
colorPicker.addEventListener("change", (e) => {
  ink = e.target.value;
})
```
**ink** is a global value that when `changeColor(e)` is called, it would change the color of the drawn `.cell` to its value.