export class MyDatePicker {

    static dayNamesList = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];// Su is 0, Sa is 6
    static monthsNamesList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    constructor(el, options){
        this.el = el;
        this.options = options;
        const currentDate = new Date();
        this.shownMonth = currentDate.getMonth();
        console.log('shownMonth = ', this.shownMonth);
        this.shownYear = currentDate.getFullYear();
        this.overlayDiv = this.addDOM(true);
        this.initListeners();
    }

    addDOM(withHidden) {
        const overlay = this.createDatepickerOverlay(withHidden);
        // .appendChild(overlay);
        this.el.parentElement.appendChild(overlay);
        return overlay;
    }

    hideOverlay(){
        this.overlayDiv.classList.toggle('is-hidden');
    }

    initListeners(){
        this.el.addEventListener('click', () => {
            this.hideOverlay();
        });
    }

    daysInMonth (month, year) {
        return new Date(year, month+1, 0).getDate();
    }

    getNextMonthAndYear(month, year) {
        if(month === 11) {
            return [0, year+1];
        } else {
            return [month+1, year];
        }
    }

    getPrevMonthAndYear(month, year) {
        if(month === 0) {
            return [11, year-1];
        } else {
            return [month-1, year];
        }
    }

    createDatepickerOverlay(withHidden) {
        const overlayDiv = document.createElement('div');
        overlayDiv.setAttribute('id', 'datepicker-overlay');
        overlayDiv.classList.add('datepicker-overlay');
        if(withHidden) {
            overlayDiv.classList.add('is-hidden');
        }

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
            const [prevMonth, prevYear] = this.getPrevMonthAndYear(this.shownMonth, this.shownYear);
            this.setShownMonthAndYear(prevMonth, prevYear);
        });

        const nextMonthBtn = document.createElement('button');
        nextMonthBtn.classList.add('month-btn')
        nextMonthBtn.innerText ='>';

        nextMonthBtn.addEventListener('click', () => {
            this.options?.onNextMonthClick();
            const [nextMonth, nextYear] = this.getNextMonthAndYear(this.shownMonth, this.shownYear);
            this.setShownMonthAndYear(nextMonth, nextYear);
        });

        const monthAndYear = `${MyDatePicker.monthsNamesList[this.shownMonth]} ${this.shownYear}`;
        const monthAndYearSpan = document.createElement('span');
        monthAndYearSpan.innerText = monthAndYear;

        header.appendChild(prevMonthBtn);
        header.appendChild(monthAndYearSpan);
        header.appendChild(nextMonthBtn);
        
        return header;
    }

    setShownMonthAndYear(month, year) {
        // console.log('shown month and year changed to ', month, ' year = ', year);
        this.overlayDiv.remove();
        this.shownMonth = month;
        this.shownYear = year;
        this.overlayDiv = this.addDOM(false);
    }

    createDays(){
        const daysContainer = document.createElement('div');
        daysContainer.setAttribute('id', 'days-container');
        daysContainer.classList.add('days-container');

        const firstDayDate = new Date(this.shownYear, this.shownMonth, 1);
        const firstDayDayOfWeek = firstDayDate.getDay();

        // console.log(`first day of ${MyDatePicker.monthsNamesList[this.shownMonth]} falls on ${MyDatePicker.dayNamesList[firstDayDayOfWeek]}`);

        const daysInMonth = this.daysInMonth(this.shownMonth, this.shownYear);
        // console.log('days in month: ', this.shownMonth, ' is ', daysInMonth);
        for(let j=0;j<daysInMonth;j++) {
            const day = document.createElement('button');
            day.innerText = j+1;
            day.classList.add('day-btn');
            if(j === 0) {
                day.style.gridColumnStart = firstDayDayOfWeek+1;
            }
            day.addEventListener('click', (ev) => {
                const selectedDate = new Date(this.shownYear, this.shownMonth, ev.target.innerText);
                console.log('you selected: ', selectedDate);
                this.options?.onSelect(selectedDate);
                this.hideOverlay();
            });
            daysContainer.appendChild(day);
        }

        return daysContainer;
    }
}

