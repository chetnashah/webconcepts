let boardSize = getComputedStyle(document.body).getPropertyValue(
  "--board-size"
);
console.log("board size = ", boardSize);

const board = document.getElementById("game-board");

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
