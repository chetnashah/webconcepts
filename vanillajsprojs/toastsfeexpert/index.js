// Write your code here.
const durationInput = document.getElementById('duration');

const cancellableInput = document.getElementById('cancelable');

const addBtn = document.getElementById('add-button');
const clearBtn = document.getElementById('clear-button');

const toastsList = document.getElementById('toasts');


const messageArea = document.getElementById('message-content');
// messageArea.addEventListener('input', function(ev) {
//   message = ev.target.value;
// });

addBtn.addEventListener('click', function(){
  // add toast
  let duration = (durationInput.value < 500 || !durationInput.value) ? 500 : durationInput.value;
  let cancellable = cancellableInput.checked;
  let toastType = document.querySelector('input[type="radio"]:checked').value;
  let message = document.getElementById('message-content').value;
  
  if(message.trim().length == 0) {
    message = (toastType === 'success') ? 'Success!' : 'Error.';
  }
  
  console.log(duration);
  console.log(cancellable);
  console.log(toastType);

  const toast = document.createElement('div');
  toast.classList.add('toast');
  if(toastType === 'success') {
    toast.classList.add('success-toast');
  } else {
    toast.classList.add('error-toast');
  }
  const messageEl = document.createElement('p');
  messageEl.classList.add('message');
  messageEl.innerText = message;

  const cancelBtnEl = document.createElement('button');
  cancelBtnEl.classList.add('cancel-button');
  cancelBtnEl.innerText = 'X';
  cancelBtnEl.addEventListener('click', () => {
    toast.remove();
  });
  
  toast.appendChild(messageEl);
  if(cancellable) {
    toast.appendChild(cancelBtnEl);
  }

  
  toastsList.insertBefore(toast, toastsList.firstChild);

  setTimeout(() => {
    toast.remove();
  }, duration);
});

clearBtn.addEventListener('click', function(){
  // clear toasts
  toastsList.innerHTML= '';
});


