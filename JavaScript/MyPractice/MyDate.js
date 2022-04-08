'use strict'; // strict mode ensures that 'this' is 'undefined' in the MyDate regular function call

function MyDate() {
    if (this instanceof MyDate) {
        console.log("MyDate() called via new operator, store Date in MyDate");
        this.date = new Date();
    } else {
        // in strict mode, 'this' is 'undefined'
        // in non strict mode, 'this' is 'globalThis' even when called from invokeMyDateFunc
        // 'globalThis' is 'global' in node.js and 'window' in node.js
        console.log("MyDate() called as regular function, printing DateString");
        console.log(this);
        return (new Date()).toGMTString();
    }
}

MyDate.prototype.invokeMyDateFunc = function() {
    console.log("invokeMyDateFunc(): " + this);
    MyDate();
}

let myDateObj = new MyDate();
console.log(myDateObj);
myDateObj.invokeMyDateFunc();

let myDateString = MyDate();
console.log(myDateString);

