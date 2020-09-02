
// test('promise constructor can be called', () => {
//     const MyPromise = require('./MyPromise.js');

//     let k = 0;
//     new MyPromise((resolve, reject) => {
//         k = 1;
//         for(var j=0; j< 3242342; j++) {
//             global.jj = j;
//         }
//     }).then(() => {
//         expect(k).toBe(1);
//     });

// });

// test('promise then methods are called on resolution', (done) => {
//     const MyPromise = require('./MyPromise');
//     let j = 0;
//     let resValue = 0;
//     let p = new MyPromise((resolve, reject) => {
//         j = 1;
//         resolve(j);
//     });
//     p.then((x, y) => {
//         console.log('then handler called!!');
//         resValue = x;
//         expect(resValue).toBe(1);
//         done();
//         // done();
//     });
// });

test('promise then chaining is supported', (done) => {
    const MyPromise = require('./MyPromise');
    let j = 0;
    let resValue = 0;
    let p = new MyPromise((resolve, reject) => {
        j = 1;
        resolve(j);
    });
    p.then((x, y) => {// create and return a new promise here in then, save reference to promise, fn both
        console.log('then handler called!!');
        resValue = x;
        expect(resValue).toBe(1);
        return (resValue + 99);// reference of promise is resolved with running and getting return value
    })
    .then((t, q) => {
        expect(t).toBe(100);
        done();
    });
});