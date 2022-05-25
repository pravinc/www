// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol

// for create a global Symbol that is available in your whole codebase,
// see Symbol.for(key) and Symbol.keyFor(sym)
let sym1 = Symbol()
let sym2 = Symbol('foo')
let sym3 = Symbol('foo')
console.log(sym1, '-', sym1.description);       // undefined
console.log(sym2, '-', sym2.description);       // foo
console.log(sym3, '-', sym3.description);       // foo
console.log(Symbol('foo') === Symbol('foo'));   // false

// following syntax with the new operator will throw a TypeError
try {
    let sym = new Symbol();
} catch(err) {
    console.log(err);   // TypeError: Symbol is not a constructor
}

// If create Symbol wrapper object really needed, use Object() function:
{
    let sym = Symbol('foo');
    console.log(typeof sym);      // "symbol"
    let symObj = Object(sym);
    console.log(typeof symObj);   // "object"
}


// Symbol.for(key)
// To create Symbols available across files and
// even across realms (each of which has its own global scope)
{
    let sym = Symbol.for('FirstName');
    let othersym = Symbol.for('LastName');
    let getsym = Symbol.for('FirstName');
    console.log(sym === getsym);        // true
    console.log(sym === othersym);      // false
    console.log(Symbol.keyFor(sym));
    console.log(Symbol.keyFor(othersym));
    console.log(Symbol.keyFor(getsym));
    console.log(sym, '-', sym.description);             // FirstName
    console.log(othersym, '-', othersym.description);   // LastName
    console.log(getsym, '-', getsym.description);       // FirstName
}


// The typeof operator can help you to identify Symbols.
{
    console.log(typeof Symbol() === 'symbol')
    console.log(typeof Symbol('foo') === 'symbol')
    console.log(typeof Symbol.iterator === 'symbol')
}


// Symbol is not a number
{
    let sym = Symbol(1);
    try {
        console.log(+sym);
    } catch(err) {
        console.log(err);   // TypeError: Cannot convert a Symbol value to a number
    }

    console.log(Object(sym) == sym);    // true - loose equality
    console.log(Object(sym) === sym);   // false - strict equality

    try {
        console.log(Symbol("foo") + "bar");
    } catch(err) {
        console.log(err);   // TypeError: Cannot convert a Symbol value to a string
    }

    console.log(Symbol("foo").toString() + "bar");
}

// Object.getOwnPropertySymbols()
{
    let obj = {}

    obj[Symbol('a')] = 'Sym(a) value'
    obj[Symbol.for('b')] = 'Sym(b) value'
    obj['c'] = 'c value'
    obj.d = 'd value'

    // for..in => enumerate over object properties
    for (let i in obj) {
       console.log(i);  // logs "c" and "d"
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols
    let syms = Object.getOwnPropertySymbols(obj);
    for (let i = 0; i < syms.length; ++i) {
        console.log(i, '=>', syms[i], '=>', obj[syms[i]]);  // logs "Symbol(a)" and "Symbol(d)"
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames
    let names = Object.getOwnPropertyNames(obj);
    for (let i = 0; i < names.length; ++i) {
        console.log(i, '=>', names[i], '=>', obj[names[i]]);  // logs "c" and "d"
    }
}


// Symbol-keyed properties will be completely ignored when using JSON.stringify():
{
    let obj = {[Symbol('foo')]: 'foo', name: 'Pravin'};
    obj[Symbol('bar')] = 'bar';
    console.log(obj);
    console.log(JSON.stringify(obj));   // {"name":"Pravin"}
    console.log(JSON.stringify({[Symbol('foo')]: 'foo'}));    // '{}'
}


// When a Symbol wrapper object is used as a property key, this object will be
// coerced to its wrapped Symbol:
{
    let sym = Symbol('foo');
    let obj = {[sym]: 10};
    console.log(obj[sym]);             // 10
    console.log(obj[Object(sym)]);     // still 10
}
