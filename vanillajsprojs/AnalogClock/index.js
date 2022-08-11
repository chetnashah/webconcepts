document.addEventListener("DOMContentLoaded", () => {
  let root = document.documentElement;
  setInterval(() => {
    const { hourRotation, minsRotation, secsRotation } = getRotations();
    // console.log(getRotations());
    root.style.setProperty("--hour-rotation", hourRotation);
    root.style.setProperty("--minute-rotation", minsRotation);
    root.style.setProperty("--seconds-rotation", secsRotation);
  }, 1000);
});

function getRotations() {
  const currDate = new Date();
  const hours = currDate.getHours();
  const mins = currDate.getMinutes();
  const secs = currDate.getSeconds();

  const minsPassedInThisHour = mins % 60;
  const hourminspassedRatio = minsPassedInThisHour / 60;

  const hourRotation = ((hours % 12) + hourminspassedRatio) * 30;
  const minsRotation = (mins % 60) * 6;
  const secsRotation = (secs % 60) * 6;

  return {
    hourRotation,
    minsRotation,
    secsRotation,
  };
}
