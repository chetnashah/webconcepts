// columns will be array of arrays
// column[idx] holds a single column which is an array of cards
const columns = [];

const addColumnBtn = document.getElementById("addcolumn");
const container = document.getElementById("container");
addColumnBtn.addEventListener("click", () => {
  let colName = document.getElementById("colNameInput");
  addColumn(container, colName.value);
});

function addColumn(container, name) {
  const column = document.createElement("div");
  column.setAttribute("draggable", true);
  column.classList.add("column");

  const containerChildrenLength = container.children.length;
  column.dataset.idx = containerChildrenLength + 1;

  column.addEventListener("dragenter", (ev) => {
    if (!ev.target.classList.contains("cardsList")) {
      return;
    }

    // if not hovering ovr column then return
    ev.target.classList.add("dragged-over");
    ev.preventDefault();
  });

  column.addEventListener("dragleave", (ev) => {
    if (!ev.target.classList.contains("cardsList")) {
      return;
    }

    // if not hovering over column, then return.
    ev.target.classList.remove("dragged-over");
    ev.preventDefault();
  });

  column.addEventListener("dragover", (ev) => {
    if (!ev.target.classList.contains("cardsList")) {
      return;
    }

    const elId = ev.dataTransfer.getData("text/plain");
    const el = document.getElementById(elId);
    const container = ev.target;
    let childAfterRef = null;
    for (let i = 0; i < container.children.length; i++) {
      console.log(container.children[i].getBoundingClientRect());
      const childRect = container.children[i].getBoundingClientRect();
      if (childRect.top > ev.clientY) {
        childAfterRef = container.children[i];
        break;
      }
    }

    ev.preventDefault();
  });

  column.addEventListener("drop", (ev) => {
    if (!ev.target.classList.contains("cardsList")) {
      return;
    }
    ev.target.classList.remove("dragged-over");
    ev.preventDefault();
    const elId = ev.dataTransfer.getData("text/plain");
    const el = document.getElementById(elId);
    const container = ev.target;
    let childAfterRef = null;
    for (let i = 0; i < container.children.length; i++) {
      console.log(container.children[i].getBoundingClientRect());
      const childRect = container.children[i].getBoundingClientRect();
      if (childRect.top > ev.clientY) {
        childAfterRef = container.children[i];
        break;
      }
    }
    container.insertBefore(el, childAfterRef);
  });

  const title = document.createElement("p");
  title.innerText = name + " " + column.dataset.idx;

  const removeSelfBtn = document.createElement("button");
  removeSelfBtn.innerText = "Remove this";
  removeSelfBtn.addEventListener("click", () => {
    column.remove();
  });

  // this will hold the list of cards
  const cardsList = document.createElement("div");
  cardsList.classList.add("cardsList");

  const addCardBtn = document.createElement("button");
  addCardBtn.innerText = "Add Card";
  addCardBtn.addEventListener("click", () => {
    const card = document.createElement("div");
    card.dataset.idx = cardsList.children.length + 1;
    card.innerText = title.innerText + "-" + card.dataset.idx;
    card.id = card.innerText;
    card.setAttribute("draggable", true);
    card.classList.add("card");

    card.addEventListener("dblclick", (ev) => {
      ev.target.remove();
    });

    card.addEventListener("dragstart", (ev) => {
      ev.dataTransfer.setData("text/plain", ev.target.id);
    });
    cardsList.appendChild(card);
  });

  column.appendChild(title);
  column.appendChild(removeSelfBtn);
  column.appendChild(addCardBtn);
  column.appendChild(cardsList);

  container.appendChild(column);
}
