const fill = document.querySelector('.fill');

const empties = document.querySelectorAll('.empty');

// fill listeners

fill.addEventListener('dragstart', dragStart);

fill.addEventListener('dragend', dragEnd);

for(const empty of empties){
    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('dragenter', dragEnter);
    empty.addEventListener('dragleave', dragLeave);
    empty.addEventListener('drop', dragDrop);
}

function dragOver(ev){
    console.log('dragged over');
    ev.preventDefault();
    this.className += ' hovered';
}

function dragEnter(ev){
    console.log('drag enterr');
    ev.preventDefault();
    this.className += ' hovered';
}

function dragLeave(){
   console.log('objectdragleave :'); 
    this.className = 'empty';
}

function dragDrop(ev){
    console.log('objectdragdrop : ev = ', ev);
    ev.preventDefault();

     var data = ev.dataTransfer.getData("text");
     console.log('drop, got data = ', data);
     ev.target.innerText = data;
}
function dragStart(ev){
    console.log('fill drag start!');
    ev.dataTransfer.setData('text/plain', ev.target.innerText);
    this.className += ' hold';
    setTimeout(
        () => {this.className = 'invisible'},
     0);
 }

function dragEnd(ev){
    console.log('fill drag end');
    this.className = 'fill';
}