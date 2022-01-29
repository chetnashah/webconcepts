const toggleBtn = document.getElementById('toggle');// drawer toggle btn
const closeBtn = document.getElementById('close');// modal close btn
const openBtn = document.getElementById('open');// modal open btn
const modal = document.getElementById('modal');// top level modal UI eleemtn


toggleBtn.addEventListener('click', function() {
    document.body.classList.toggle('show-nav');
});

openBtn.addEventListener('click' , function() {
    modal.classList.add('show-modal');
});

closeBtn.addEventListener('click', function(){
    modal.classList.remove('show-modal');
});

window.addEventListener('click', function(e) {
    e.target === modal ? modal.classList.remove('show-modal'): false;// condiitonal dismiss based on target checking
});