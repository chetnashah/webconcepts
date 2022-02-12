export class MyDatePicker {

    static dayNamesList = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];// Su is 0, Sa is 6
    static monthsNamesList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    constructor(el, options){
        this.el = el;
        this.options = options;
        const currentDate = new Date();
        this.shownMonth = currentDate.getMonth();
        this.shownYear = currentDate.getFullYear();
        this.overlayDiv = this.addDOM();
        this.initListeners();
    }

    addDOM() {
        const overlay = this.createDatepickerOverlay();
        // .appendChild(overlay);
        this.el.parentElement.appendChild(overlay);
        return overlay;
    }

    initListeners(){
        this.el.addEventListener('click', () => {
            this.overlayDiv.classList.toggle('is-hidden');
        });
    }

    daysInMonth (month, year) { // Use 1 for January, 2 for February, etc.
        return new Date(year, month, 0).getDate();
    }      

    createDatepickerOverlay() {
        const overlayDiv = document.createElement('div');
        overlayDiv.classList.add('datepicker-overlay');
        overlayDiv.classList.add('is-hidden');

        const header = this.createHeader();
        overlayDiv.appendChild(header);

        const dayNamesContainer = this.createDayNameRow();
        overlayDiv.appendChild(dayNamesContainer);

        const daysBody = this.createDays();
        overlayDiv.appendChild(daysBody);

        return overlayDiv;
    }

    createDayNameRow(){
        const dayNamesContainer = document.createElement('div');
        dayNamesContainer.classList.add('day-names-container');
        const dayNames = MyDatePicker.dayNamesList;
        for(let i=0; i<dayNames.length; i++) {
            const dayName = document.createElement('span');
            dayName.classList.add('dayname');
            dayName.innerText = dayNames[i];    
            dayNamesContainer.appendChild(dayName);
        }
        return dayNamesContainer;
    }

    createHeader(){
        const header = document.createElement('div');
        header.classList.add('datepicker-header');

        const prevMonthBtn = document.createElement('button');
        prevMonthBtn.classList.add('month-btn');
        prevMonthBtn.innerText ='<';

        prevMonthBtn.addEventListener('click', () => {
            this.options?.onPrevMonthClick();
        });

        const nextMonthBtn = document.createElement('button');
        nextMonthBtn.classList.add('month-btn')
        nextMonthBtn.innerText ='>';

        nextMonthBtn.addEventListener('click', () => {
            this.options?.onNextMonthClick();
        });

        const monthAndYear = `${MyDatePicker.monthsNamesList[this.shownMonth]} ${this.shownYear}`;
        const monthAndYearSpan = document.createElement('span');
        monthAndYearSpan.innerText = monthAndYear;

        header.appendChild(prevMonthBtn);
        header.appendChild(monthAndYearSpan);
        header.appendChild(nextMonthBtn);
        
        return header;
    }

    createDays(){
        const daysContainer = document.createElement('div');
        daysContainer.classList.add('days-container');

        const firstDayDate = new Date(this.shownYear, this.shownMonth, 1);
        const firstDayDayOfWeek = firstDayDate.getDay();

        console.log(`first day of ${MyDatePicker.monthsNamesList[this.shownMonth]} falls on ${MyDatePicker.dayNamesList[firstDayDayOfWeek]}`);

        const daysInMonth = this.daysInMonth(this.shownMonth, this.shownYear);
        for(let j=0;j<daysInMonth;j++) {
            const day = document.createElement('button');
            day.innerText = j+1;
            day.classList.add('day-btn');
            daysContainer.appendChild(day);
        }

        return daysContainer;
    }
}

