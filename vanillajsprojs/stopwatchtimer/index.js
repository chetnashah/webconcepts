// Write your code here.

const startBtn = document.getElementById("start-button");
const stopBtn = document.getElementById("stop-button");
const resetBtn = document.getElementById("reset-button");
const timer = document.getElementById("timer");

let animFrameId;
let startMillis;
let countedTime;
let diffMs;

function onStart(ev){
  startBtn.setAttribute("disabled", true);
  stopBtn.removeAttribute("disabled");
  resetBtn.setAttribute("disabled", true);
  startMillis = performance.now();// time of start click
  countedTime = countedTime || 0;
  startFrameCounting();
}

function startFrameCounting() {
  diffMs = Math.round(performance.now() - startMillis);
  setTimeWithMillis(countedTime + diffMs);
  animFrameId = requestAnimationFrame(startFrameCounting);
}

function onStop(ev){
  countedTime = countedTime + diffMs;
  cancelAnimationFrame(animFrameId);
  stopBtn.setAttribute("disabled", true);
  startBtn.removeAttribute("disabled");
  resetBtn.removeAttribute("disabled");
}

function setTimeWithMillis(millis) {
  let secs = 0;
  let mins = 0;
  let ms = 0;
  ms = String(millis % 1000).padStart(3, '0');
  secs = String(Math.floor((millis / 1000) % 60)).padStart(2, '0');
  mins =  String(Math.floor((millis / 1000 / 60))).padStart(2, '0');
  const formattedTime = `${mins}:${secs}:${ms}`;
  timer.innerText = formattedTime;
}

function onReset(ev){
  startMillis = 0;
  countedTime = 0;
  setTimeWithMillis(startMillis);
  resetBtn.setAttribute("disabled", true);
  stopBtn.setAttribute("disabled", true);
  startBtn.removeAttribute("disabled");
}

startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);
resetBtn.addEventListener('click', onReset);
