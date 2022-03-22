function describe(testSuiteName, func) {
    // Write your code here.
    try{
      console.log(`beginning test suite ${testSuiteName}`);
      func();
      console.log(`successfully completed test suite ${testSuiteName}`);
    } catch(err) {
      console.error(`failed running test suite ${testSuiteName}${err.message}`);
    }
  }
  
  function it(testCaseName, func) {
    try{
      console.log(`beginning test case ${testCaseName}`);
      func();
      console.log(`successfully completed test case ${testCaseName}`);
    } catch(err) {
      throw new Error(` on test case ${testCaseName} with error message ${err.message}`);
    }
    // Write your code here.
  }
  
  function expect(actual) {
    // Write your code here.
    return {
      toExist: () =>{
        if(actual === null || actual === undefined){
          throw new Error(`expected value to exist but got ${JSON.stringify(actual)}`);
        }
      },
      toBe: (expected) => {
        if(expected !== actual) {
          throw new Error(`expected ${JSON.stringify(actual)} to be ${JSON.stringify(expected)}`);
        } 
      },
      toBeType: (type) => {
        const typeOfActual = typeof actual;
        if(typeOfActual !== type) {
          throw new Error(`expected ${JSON.stringify(actual)} to be of type ${type} but got ${typeOfActual}`)
        }
      }
    };
  }
  
  // Do not edit the lines below.
  exports.describe = describe;
  exports.it = it;
  exports.expect = expect;
  