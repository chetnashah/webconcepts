// Write your code here.

const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const addBtn = document.getElementById('add-button');

input.addEventListener('input', (ev) => {
  updateAddBtnState(ev.target.value);
});

addBtn.addEventListener('click', () => {
  const text = input.value;
  const todoItem = createTodoItem(text);
  list.append(todoItem);
  input.value = '';
});

function updateAddBtnState(text){
  if(text && text.trim().length > 0) {
    addBtn.removeAttribute("disabled");
  } else {
    addBtn.setAttribute("disabled","");
  }
}

function createTodoItem(text) {
  const listItem = document.createElement('li');
  const heading = document.createElement('h2');
  heading.textContent = text;
  const xBtn = document.createElement('button');
  xBtn.textContent = 'X';
  xBtn.addEventListener('click', () => {
    listItem.remove();
  });
  xBtn.classList.add('delete-button');

  listItem.append(heading);
  listItem.append(xBtn);

  return listItem;
}