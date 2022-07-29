// Write your code here.
const blueBox = document.getElementById("blue");
const redBox = document.getElementById("red");
const greenBox = document.getElementById("green");

const unrankedSection = document.getElementById("unranked-section");
const unrankedSectionDropZone = document.getElementById("unranked-drop-zone");

// drag start listener is used to setup data
const dragStartListener = (ev) => {
  ev.dataTransfer.setData("text/plain", ev.target.id);
};

const ondblclick = (ev) => {
  if(ev.target.parentElement != unrankedSectionDropZone) {
    unrankedSectionDropZone.appendChild(ev.target);    
  }
};

blueBox.addEventListener('dragstart', dragStartListener);
redBox.addEventListener('dragstart', dragStartListener);
greenBox.addEventListener('dragstart', dragStartListener);

blueBox.addEventListener('dblclick', ondblclick);
redBox.addEventListener('dblclick', ondblclick);
greenBox.addEventListener('dblclick', ondblclick);

// add dragover/drag listeners

const ondragover_handler =(ev) => {
  ev.preventDefault();
}

const ondrop_handler = (ev) => {
  // dont do anything if dropped in the same zone
  if(ev.target != unrankedSectionDropZone) {
      const id = ev.dataTransfer.getData("text/plain");
      const el = document.getElementById(id);
       let finalTarget = ev.target;
      if(finalTarget == blueBox || finalTarget == greenBox || finalTarget == redBox) {
        finalTarget = finalTarget.parentElement;
      }
      if(finalTarget != unrankedSectionDropZone) {
          finalTarget.appendChild(el);
      }
  }
  ev.preventDefault();
}

const tiers = document.querySelectorAll('.drop-zone');
console.log(tiers);
tiers.forEach((tier) => {
  console.log('tier = ' , tier);
  tier.addEventListener('dragover', ondragover_handler);
  tier.addEventListener('drop', ondrop_handler);
});
