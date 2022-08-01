// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors
// provide access to object properties by using dot notation or bracket notation
// Syntax:
// object.property
// object['property']
// One can think of object as associative array (map, dictionary, hash, lookup table).
// The keys in this array are the names of the object's properties.

{
    const person1 = {};
    person1['firstname'] = 'Mario';
    person1['lastname'] = 'Rossi';
    person1.age = 32;

    console.log(person1.firstname);     // expected output: "Mario"
    console.log(person1['age']);        // 32

    const person2 = {
      firstname: 'John',
      lastname: 'Doe'
    };

    console.log(person2['lastname']);   // expected output: "Doe"
}

{
    const object = {};

    object.$1 = 'foo';
    console.log(object.$1);  // 'foo'

    /* You cannot use try-catch blocks to handle syntax errors as they are thrown
     * while the code is being parsed and not while it's running.
     */
    // object.1 = 'bar';       // SyntaxError
    // console.log(object.1);  // SyntaxError
}

// A method is a property that can be called
// (for example, if it has a reference to a Function instance as its value)

// If you use a method for a numeric literal, and the numeric literal has no
// exponent and no decimal point, you should leave white-space(s) before the
// dot preceding method call, so that dot is not interpreted as a decimal point.
{
    console.log(77 .toExponential());
    // or
    console.log(77
    .toExponential());
    // or
    console.log((77).toExponential());
    // or
    console.log(77..toExponential());
    // or
    console.log(77.0.toExponential());
    // because 77. === 77.0, no ambiguity
}

// In object[property_name] syntax, 'property_name' is just a string or Symbol.
// So, it can be any string, including '1foo', '!bar!', or even ' ' (a space).
{
    console.log('bracket notation:', (77)['toExponential']());
}

// Property names are string or Symbol.
// Any other value, including a number, is coerced to a string
{
    let object = {}
    object['1'] = 'value'
    console.log('number property name:', object[1])
}

// object also coerced to string
{
    let foo = {unique_prop: 1}, bar = {unique_prop: 2}, object = {};
    object[foo] = 'value'
    console.log(foo);
    console.log(bar);
    console.log('same property other object:', object[bar])    // value
    console.log('same property object literal:', object[{unique_prop: 3}]);
    console.log('empty object:', object[{}]);
}

{
    const person1 = {};
    person1['firstname'] = 'Mario';
    person1['lastname'] = 'Rossi';
    person1.age = 32;

    // CAUTION: avoid using eval to form 'dot notation' property acessor
    prop_name = 'age';
    console.log('dot notation eval():', eval('person1.' + prop_name));

    // use 'bracket notation' instead
    console.log('bracket notation:', person1[prop_name]);
}
