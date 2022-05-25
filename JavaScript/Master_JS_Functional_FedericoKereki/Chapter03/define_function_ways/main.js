// https://bocoup.com/blog/the-many-faces-of-functions-in-javascript

/**********************************/
/*** named function declaration ***/
/**********************************/
// Because of hoisting, this function will be accessible everywhere in the scope
// where it's defined
console.log(first.name);        // "first"
first();

function first() {
    console.log(first.name);    // "first"
}


/*************************************/
/*** anonymous function expression ***/
/*************************************/
// Since the assignment isn't hoisted, the function will only be accessible
// after the assignment has been executed
let second = function() {};
console.log(second.name);       // "second"

let myArray = new Array(3);
myArray[1] = function() {};
myArray[2] = function secondName() {};
console.log(myArray[1].name);   // ""
console.log(myArray[2].name);   // "secondName"


/*********************************/
/*** named function expression ***/
/*********************************/
// named functions are more easily recognized in an error traceback
let third = function thirdName() {
    console.log(third.name);    // "thirdName"
}
console.log(third.name);        // "thirdName"
third();


/***********************************************/
/*** immediately-invoked function expression ***/
/***********************************************/
// lets you use a closure (inner function can access var in outer function privately)
// outer function is kind of a singleton
// also the basis of the module pattern
var myCounter = (function(initialValue = 0) {
    let count = initialValue;
    return function() {
        count++;
        return count;
    };
})(77);

console.log(myCounter()); // 78
console.log(myCounter()); // 79
console.log(myCounter()); // 80
console.log(myCounter.name);    // ""


/****************************/
/*** function constructor ***/
/****************************/
// isn't safe, and you shouldn't use it - could allow many dangerous hacks
var sum3 = new Function("x", "y", "z", "var t = x+y+z; return t;");
console.log(sum3(4, 6, 7)); // 17
console.log(sum3.name);     // "anonymous"
