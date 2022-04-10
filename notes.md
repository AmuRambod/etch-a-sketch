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