import { MyDatePicker } from "./mydatepicker.js";

console.log('hello!');

const fromdateInput = document.querySelector('#from');
var picker = new MyDatePicker(fromdateInput, {
    format: 'D MMM YYYY',
    onPrevMonthClick: () => {
        console.log('on prev mont click');
    },
    onNextMonthClick: () => {
        console.log('on next month click');
    },
    onSelect: function() {
        console.log(this.getMoment().format('Do MMMM YYYY'));
    }
});

