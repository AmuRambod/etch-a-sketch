# Etch-a-Sketch 
## plans
- [x] Add a header.

- [ ] Write the *README.md*.

- [ ] Edit the options modal:
  - In the options modal, if user chooses pencil mode, the pencil button mode expands to reveal the color picker underneath it. And if the user switches the mode, the color picker fades and pencil button mode goes back to normal.

- Style the UI:
  - [x] Color template.
  - [X] Responsiveness for mobile.
  - [x] Framing the `.plate` as a real "Etch-a-Sketch" board.
  - [x] Change the cursor to a pen(?) when drawing.

- Add extra features:
  - [x] Clear the plate.

  - [x] The Options Modal:

    - [x] Eraser.
    - [x] Ink color selection.

  - [x] Plate size selection.

  - [ ] Ability to download the drawn sketch.

- Minor plans:
  - [x] Add the ® Symbol after the "Etch A Sketch" logo using pseudo-elements. => It was done by `<sup>` tag.

## Bugs
- ### major bugs
  - [ ] `size-slider`s styling does not work on firefox.
  - [ ] the whole site looks weird and janky on firefox.
  - [x] text selecting interferes with showing the pencil cursor.
    - potential fix: setting `user-select:none` for all elements. => **IT WAS NOT!**

- ### minor bugs
  - [x] Footer is not visible.
  - [x] Footer links go to nowhere.
  - [ ] Clicking the *options button* should close the `.options-toolbar`:

    - When the `.option-toolbar` is open, when you add anywhere except the `#options`, the toolbar closes and the *options button* itself is part of `#options`. 

  - [ ] When a `.cell` is drawn, its borders should be gone!