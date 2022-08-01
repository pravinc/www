// https://simonsmith.io/easier-function-arguments-with-destructuring
// https://simonsmith.io/destructuring-objects-as-function-parameters-in-es6
// https://stackoverflow.com/questions/11796093/is-there-a-way-to-provide-named-parameters-in-a-function-call-in-javascript

// Destructuring function arguments can be used as 'named params'

{
    // Before
    function beforeFunc(isFeatureEnabled, timeout) {
        console.log(isFeatureEnabled, timeout);
    }
    beforeFunc(true, 400);
    beforeFunc(400, true);  // syntax OK, semantic error

    // After
    function afterFunc({isFeatureEnabled, timeout}) {
        console.log(isFeatureEnabled, timeout);
    }
    afterFunc(false, 100);      // undefined undefined
    afterFunc({isFeatureEnabled: true, timeout: 400});
    afterFunc({timeout: 500, isFeatureEnabled: true});  // all good, implicitly documented
}

// increased readability even with single arguments
{
    function getSomeDataFromApi_1(pageNum) {
        console.log(pageNum);
    }
    function getSomeDataFromApi_2({pageNum}) {
        console.log(pageNum);
    }

    getSomeDataFromApi_1(3);            // what is 3 ???
    getSomeDataFromApi_2({pageNum: 2});
}

// Renaming arguments
{
    function someOtherFunction({currentUserIsAdmin: isAdmin}) {
        console.log(isAdmin);

        try {
            console.log(currentUserIsAdmin);
        } catch(err) {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
            console.log(err.name, ':', err.message);
        }
    }

    someOtherFunction({currentUserIsAdmin: true});
}

// ES5
{
    function myFunc(opts) {
        var name = opts.name;
        var age = opts.age;
        console.log(name, age);
    }
    myFunc({ name: 'John', age: 25 });
}

// ES6
{
    function myFunc({name, age}) {
        console.log(name, age);
    }
    myFunc({ name: 'John', age: 25 });
}

// default values
{
    function myFunc_ES5(opts) {
        var name = opts.name === undefined ? 'ES5_default_user' : opts.name;
        var age = opts.age === undefined ? 'ES5_default_age' : opts.age;
        console.log(name, age);
    }
    myFunc_ES5({});

    function myFunc_ES6_1({ name = 'ES6_default_user_1', age = 'ES6_default_age_1' }) {
        console.log(name, age);
    }
    myFunc_ES6_1({});

    // It can also be split onto multiple lines
    function myFunc_ES6_2({
        name = 'ES6_default_user_2',
        age = 'ES6_default_age_2'
    }) {
        console.log(name, age);
    }
    myFunc_ES6_2({});
}

// Allowing the configuration object to be optional
{
    function myFunc_ES6({name = 'ES6_default_user', age = 'ES6_default_age'} = {}) {
        console.log(name, age);
    }
    myFunc_ES6();

    // same using ES5
    function myFunc_ES5(opts) {
        opts = opts === undefined ? {} : opts;
        // var opts = arguments[0] === undefined ? {} : arguments[0];
        var name = opts.name === undefined ? 'ES5_default_user' : opts.name;
        var age = opts.age === undefined ? 'ES5_default_age' : opts.age;
        console.log(name, age);
    }
    myFunc_ES5();
}

// Renaming the extracted values
{
    function myFunc({someLongPropertyName: prop = 'Default string'} = {}) {
        console.log(prop);
    }
    myFunc({someLongPropertyName: 'Hello'})
    myFunc();
}

// renaming and shorthand properties combined for conciseness
{
    function createElement(component, { className }) {
        console.log(component, className);
    }

    function getComponent({ containerClass: className = 'Component' } = {}) {
        // renaming allows using shorthand properties
        // Here we can avoid {className: className}
        return createElement('ROOT', { className });
    }

    // Users of the function know exactly what the className does
    getComponent({ containerClass: 'Container' });
}

// https://stackoverflow.com/questions/11796093/is-there-a-way-to-provide-named-parameters-in-a-function-call-in-javascript
{
    function myFunction({param1 = 'p1def', param2 = 'p2def'}={}){
      console.log(param1, param2);
    }
    myFunction();
    myFunction({ param1 : 5});
    myFunction({ param2 : 33});
    myFunction({ param1 : 70, param2 : 175});
}
