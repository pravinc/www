// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters

// In JavaScript, function parameters default to undefined
// 'default parameters' help set a different default value

// Syntax:
// function fnName(param1 = defaultValue1, ..., paramN = defaultValueN) { /* ... */ }

// problem without default parameter
{
    function multiply(a, b) {
        return a * b
    }

    console.log(multiply(5, 2));    // 10
    console.log(multiply(5));       // NaN !
}

// ES5 handling
{
    function multiply(a, b) {
        b = (typeof b !== 'undefined') ?  b : 1
        return a * b
    }

    console.log(multiply(5, 2));    // 10
    console.log(multiply(5));       // 5
}

// ES6 (ES2015) solution
{
    function multiply(a, b = 1) {
        return a * b;
    }

    console.log(multiply(5, 2));    // expected output: 10

    console.log(multiply(5));       // expected output: 5
    console.log(multiply(5, undefined));    // 5
}

// undefined replaced by default, but not other falsy values
{
    function test(num = 1) {
        console.log(num, typeof num)
    }

    test()           // 'number' (num is set to 1)
    test(undefined)  // 'number' (num is set to 1 too)

    // test with other falsy values:
    test('')         // 'string' (num is set to '')
    test(null)       // 'object' (num is set to null)
}

// The default argument is evaluated at call time.
// Unlike with Python (for example), a new object is created each time the function is called.
{
    function append(value, array = []) {
        array.push(value)
        return array
    }

    console.log(append(1))  // [1]
    console.log(append(2))  // [2], not [1, 2]
}

// This even applies to functions and variables:
{
    function callSomething(thing = something()) {
        return thing
    }

    let numberOfTimesCalled = 0
    function something() {
        numberOfTimesCalled += 1
        return numberOfTimesCalled
    }

    console.log(callSomething())    // 1
    console.log(callSomething())    // 2
}

// Earlier parameters are available to later default parameters
{
    function greet(name, greeting, message = greeting + ' ' + name) {
        return [name, greeting, message]
    }

    console.log(greet('David', 'Hi'));                     // ["David", "Hi", "Hi David"]
    console.log(greet('David', 'Hi', 'Happy Birthday!'));  // ["David", "Hi", "Happy Birthday!"]
}

// extreme case simplified
{
    function go() {
        return ':P'
      }

    function withDefaults(a, b = 5, c = b, d = go(), e = this,
                            f = arguments, g = this.value) {
        return [a, b, c, d, e, f, g]
    }

    function withoutDefaults(a, b, c, d, e, f, g) {
        switch (arguments.length) {
            case 0:
                a;
            case 1:
                b = 5;
            case 2:
                c = b;
            case 3:
                d = go();
            case 4:
                e = this;
            case 5:
                f = arguments;
            case 6:
                g = this.value;
            default:
        }
        return [a, b, c, d, e, f, g];
    }

    console.log(withDefaults.call({value: '=^_^='}));
    // [undefined, 5, 5, ":P", {value:"=^_^="}, arguments, "=^_^="]

    console.log(withoutDefaults.call({value: '=^_^='}));
    // [undefined, 5, 5, ":P", {value:"=^_^="}, arguments, "=^_^="]
}

// If default parameters are defined for one or more parameter, then a second
// scope (Environment Record) is created, specifically for the identifiers
// within the parameter list.
// This scope is a parent of the scope created for the function body.
{
    // Throws a `ReferenceError` for 'get_p' when `f1` is invoked but it works
    // ReferenceError: get_p is not defined
    function f1(a = get_p()) {
        function get_p() { return ':P' }
        console.log(a);
    }

    try {
        f1();
    } catch (error) {
        console.log(error);
    }

    function f2(a, b = () => console.log(a)) {
        var a = 1;
        b();
    }

    f2(); // Logs "undefined"
    f2(5); // Logs "5"
}

// Parameters without defaults after default parameters
{
    function f(x = 1, y) {
        return [x, y]
    }

    console.log(f());   // [1, undefined]
    console.log(f(2));  // [2, undefined]
}

// Destructured parameter with default value assignment
{
    function preFilledArray([x = 1, y = 2] = []) {
        return x + y;
    }

    console.log(preFilledArray());          // 3
    console.log(preFilledArray(undefined)); // 3
    console.log(preFilledArray([]));        // 3
    console.log(preFilledArray([2]));       // 4
    console.log(preFilledArray([2, 3]));    // 5
}

{
    function preFilledArray2([x = 1, y = 2]) {
        return x + y;
    }

    try {
        console.log(preFilledArray2());          // TypeError: undefined is not iterable
    } catch (error) {
        console.log(error);
    }
    try {
        console.log(preFilledArray2(undefined)); // TypeError: undefined is not iterable
    } catch (error) {
        console.log(error);
    }
    console.log(preFilledArray2([]));        // 3
    console.log(preFilledArray2([2]));       // 4
    console.log(preFilledArray2([2, 3]));    // 5
}

{
    function preFilledArray3([x = 1, y = 2] = [4, 3]) {
        return x + y;
    }

    console.log(preFilledArray3());          // 7
    console.log(preFilledArray3(undefined)); // 7
    console.log(preFilledArray3([]));        // 3
    console.log(preFilledArray3([2]));       // 4
    console.log(preFilledArray3([2, 3]));    // 5
}

{
    // Works the same for objects:
    function preFilledObject({ z = 3 } = {}) {
        return z;
    }

    preFilledObject();          // 3
    preFilledObject({});        // 3
    preFilledObject({ z: 2 });  // 2
}
