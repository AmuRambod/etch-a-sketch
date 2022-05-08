# Etch-a-Sketch 
## plans
- [x] Add a header.

- Style the UI:
  - [x] Color template.
  - [X] Responsiveness for mobile.
  - [x] Framing the `.plate` as a real "Etch-a-Sketch" board.
  - [x] Change the cursor to a pen(?) when drawing.

- Add extra features:
  - [x] Clear the plate.

  - [ ] The Options Modal:

    - [ ] Eraser.
    - [ ] Ink color selection.
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