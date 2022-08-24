https://www.youtube.com/watch?v=QTcIXok9wNY&list=PLZlA0Gpn_vH8DWL14Wud_m8NeNNbYKOkj&index=15


## Having a game loop based on requestAnimationFrame

```js
let lastRenderTime = 0;
const FRAMES_PER_SECOND = 1;

function gameLoop(currentTime) {
  requestAnimationFrame(gameLoop);
  if ((currentTime - lastRenderTime) / 1000 < 1 / FRAMES_PER_SECOND) {
    return;
  }
  console.log(" running gameLoop at time: ", currentTime);

  lastRenderTime = currentTime;
  update();
  draw();
}

window.requestAnimationFrame(gameLoop);

function draw() {}
function update() {}
```

## Grid based layout

lets say we can store grid size in a variable: n.

the grid template rows and columns will have `n` fr.

### Snake peice and food peice styled with css classes


## Draw logic

Clear all elements on each draw loop using `board.innerHTML =''`.

And do pure drawing based on state using:

```js
const snakeStateSegments = [
  [11, 10],
  [10, 10],
];
let dirFacing = "right";
let food = [11, 11];

export function draw(board) {
  //   console.log("drawing game!");
  board.innerHTML = "";
  // draw snake
  snakeStateSegments.forEach((segment) => {
    let cell = document.createElement("div");
    cell.classList.add("snake");
    cell.style.gridColumnStart = segment[0];
    cell.style.gridColumnEnd = segment[0] + 1;
    cell.style.gridRowStart = segment[1];
    cell.style.gridRowEnd = segment[1] + 1;

    board.appendChild(cell);
  });

  // draw food
  let foodEl = document.createElement("div");
  foodEl.classList.add("food");
  foodEl.style.gridColumnStart = food[0];
  foodEl.style.gridColumnEnd = food[0] + 1;
  foodEl.style.gridRowStart = food[1];
  foodEl.style.gridRowEnd = food[1] + 1;

  board.appendChild(foodEl);
}
```

## Snake movement logic

convention: head of snake is at `snakeSegments[0]`

when eaten food: add cell at head with same coordinates as food.

When not eaten food: calculate nexthead co-ordinates based on facingDir and keypresss,
 pop tail and assign it nextHead co-ordinates, and at it to front i.e. as new head.

 