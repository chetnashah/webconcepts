function MyPromise(executor) {
    this.handlers = [];
    this._state = 'pending';
    for(var j=0; j< 3242342; j++) {
        global.nn = j;
    }
    this._time = Date.now();
    // class property equivalent
    this.resolveFn = (val) => {
        this._state = 'resolved';
        console.log('resolveFn, this: ', this);
        this.handlers.forEach(obj => {
            const resolutionHandler = obj.handler; 
            const handlerReturnVal = resolutionHandler(val);
            if (handlerReturnVal && handlerReturnVal instanceof MyPromise) {
                handlerReturnVal.resolveFn(val);
            } else {
                console.log('calling obj.promise resolveFn');
                obj.promise.resolveFn(handlerReturnVal);
            }
        });
    }
    this.rejectFn = () => {
        this._state = 'rejected';
    }
    setTimeout(() => {
        executor(this.resolveFn, this.rejectFn);
    },0);
}

MyPromise.prototype.then = function(fulFillHandler, rejectHandler) {
    const newPromise = new MyPromise(() => {});
    console.log('new empty promise created with _time: ', newPromise._time);
    
    console.log('pushing then-handler into promise of _time: ', this._time);
    this.handlers.push({
        handler: fulFillHandler,
        promise: newPromise
    });
    console.log('this.handlers len = ', this.handlers.length);
    return newPromise;
}

MyPromise.resolve = function(val){
    return new MyPromise((res, rej) => { res(val); })
}

module.exports = MyPromise;