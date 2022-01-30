console.log('hello world!');

function createToast(text) {
    const node = document.createElement('div');
    node.classList.add('toast');
    node.innerText = text;
    return node;
}

const addToastBtn = document.getElementById('add-toast');
const toastGroup = document.getElementById('toast-group');
addToastBtn.addEventListener('click', function(){
    const toast = createToast('Hello world!');
    toastGroup.appendChild(toast);
    Promise.allSettled(
        toast.getAnimations().map(animation => 
          animation.finished // animation.finished is a promise object.
        )
      ).then(() => {
          console.log('animation doen, removing child - ');
        toastGroup.removeChild(toast);
      });

});