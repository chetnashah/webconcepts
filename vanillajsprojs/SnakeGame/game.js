const snakeStateSegments = [
  [11, 10],
  [10, 10],
];
let dirFacing = "right";
let food = [11, 11];

export function setup(board) {
  document.body.addEventListener("keydown", (ev) => {
    switch (ev.key) {
      case "ArrowDown":
        moveSnake("down");
        break;
      case "ArrowUp":
        moveSnake("up");
        break;
      case "ArrowRight":
        moveSnake("right");
        break;
      case "ArrowLeft":
        moveSnake("left");
        break;
    }
  });
}

function randomFoodSpawn() {
  food[0] = Math.ceil(Math.random() * 15);
  food[1] = Math.ceil(Math.random() * 15);
}

function moveTailToFront(nextHead) {
  const poppedTail = snakeStateSegments.pop();
  poppedTail[0] = nextHead[0];
  poppedTail[1] = nextHead[1];
  snakeStateSegments.unshift(poppedTail);
}

function moveSnake(dir) {
  const currHead = snakeStateSegments[0];

  switch (dir) {
    case "left":
      {
        if (dirFacing == "right") return;
        dirFacing = "left";
        const nextHead = [currHead[0] - 1, currHead[1]];
        if (nextHead[0] == food[0] && nextHead[1] == food[1]) {
          snakeStateSegments.unshift([food[0], food[1]]);
          randomFoodSpawn();
        } else {
          moveTailToFront(nextHead);
        }
      }
      break;
    case "right":
      {
        if (dirFacing == "left") return;
        dirFacing = "right";
        const nextHead = [currHead[0] + 1, currHead[1]];
        if (nextHead[0] == food[0] && nextHead[1] == food[1]) {
          snakeStateSegments.unshift([food[0], food[1]]);
          randomFoodSpawn();
        } else {
          moveTailToFront(nextHead);
        }
      }
      break;
    case "down":
      {
        if (dirFacing == "up") return;
        dirFacing = "down";
        const nextHead = [currHead[0], currHead[1] + 1];
        if (nextHead[0] == food[0] && nextHead[1] == food[1]) {
          snakeStateSegments.unshift([food[0], food[1]]);
          randomFoodSpawn();
        } else {
          moveTailToFront(nextHead);
        }
      }
      break;
    case "up":
      {
        if (dirFacing == "down") return;
        dirFacing = "up";
        const nextHead = [currHead[0], currHead[1] - 1];
        if (nextHead[0] == food[0] && nextHead[1] == food[1]) {
          snakeStateSegments.unshift([food[0], food[1]]);
          randomFoodSpawn();
        } else {
          moveTailToFront(nextHead);
        }
      }
      break;
  }
}

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

export function update(board) {
  //   console.log("updating board");
}
