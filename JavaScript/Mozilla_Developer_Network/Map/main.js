// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
// holds key-value pairs
// remembers the original insertion order of the keys - iterates its elements in insertion order
// Any value (both objects and primitive values) may be used as either a key or a value

const map1 = new Map();

map1.set('a', 1);
map1.set('b', 2);
map1.set('c', 3);

console.log(map1.get('a')); // expected output: 1

map1.set('a', 97);

console.log(map1.get('a')); // expected output: 97

console.log(map1.size);     // expected output: 3

map1.delete('b');

console.log(map1.size);     // expected output: 2
console.log(map1);


// Setting Object properties works for Map objects as well, but it is wrong usage
const wrongMap = new Map()
wrongMap['bla'] = 'blaa'
wrongMap['bla2'] = 'blaaa2'
console.log(wrongMap)  // Map { bla: 'blaa', bla2: 'blaaa2' }
wrongMap.has('bla')    // false
wrongMap.delete('bla') // false
console.log(wrongMap)  // Map { bla: 'blaa', bla2: 'blaaa2' }


// correct usage
const contacts = new Map()
console.log(contacts.set('Jessie', { phone: "213-555-1234", address: "123 N 1st Ave" }))
console.log(contacts.has('Jessie')) // true
console.log(contacts.get('Hilary')) // undefined
console.log(contacts.set('Hilary', { phone: "617-555-4321", address: "321 S 2nd St" }))
console.log(contacts.get('Jessie')) // {phone: "213-555-1234", address: "123 N 1st Ave"}
console.log(contacts['Jessie']);    // undefined - wrong usage
// Returns a new Iterator object that contains an array of [key, value] for each
// element in the Map object in insertion order
console.log('iterator:');
for (let contact of contacts) {
    console.log(contact[0]);
    console.log(contact[1]);
}
for (let contact of contacts.entries()) {
    console.log(contact[0]);
    console.log(contact[1]);
}
console.log('forEach():');
contacts.forEach((value, key) => console.log(key, '=', value));
console.log('keys():');
for (let key of contacts.keys()) {
    console.log(key);
}
console.log('values():');
for (let value of contacts.values()) {
    console.log(value);
}
console.log(contacts.delete('Raymond')) // false
console.log(contacts.delete('Jessie')) // true
console.log(contacts.size) // 1

contacts.clear();
console.log(contacts.size) // 0


// Using the Map object
{
    const myMap = new Map()

    const keyString = 'a string'
    const keyObj = {}
    const keyFunc = function () { }

    // setting the values
    myMap.set(keyString, "value associated with 'a string'")
    myMap.set(keyObj, 'value associated with keyObj')
    myMap.set(keyFunc, 'value associated with keyFunc')

    myMap.size              // 3

    // getting the values
    myMap.get(keyString)    // "value associated with 'a string'"
    myMap.get(keyObj)       // "value associated with keyObj"
    myMap.get(keyFunc)      // "value associated with keyFunc"

    myMap.get('a string')    // "value associated with 'a string'"
    // because keyString === 'a string'
    myMap.get({})            // undefined, because keyObj !== {}
    myMap.get(function () { }) // undefined, because keyFunc !== function () {}
}


// Using NaN as Map keys
{
    const myMap = new Map()
    myMap.set(NaN, 'not a number')

    myMap.get(NaN)
    // "not a number"

    const otherNaN = Number('foo')
    myMap.get(otherNaN)
    // "not a number"
}


/*** Maps can be iterated using a for..of loop and forEach() method ***/
console.log('Maps can be iterated using a for..of loop and forEach() method =>');
{
    const myMap = new Map()
    myMap.set(0, 'zero')
    myMap.set(1, 'one')

    for (const [key, value] of myMap) {
        console.log(key + ' = ' + value)
    }
    // 0 = zero
    // 1 = one

    for (const key of myMap.keys()) {
        console.log(key)
    }
    // 0
    // 1

    for (const value of myMap.values()) {
        console.log(value)
    }
    // zero
    // one

    for (const [key, value] of myMap.entries()) {
        console.log(key + ' = ' + value)
    }
    // 0 = zero
    // 1 = one

    myMap.forEach(function (value, key) {
        console.log(key + ' = ' + value)
    })
    // 0 = zero
    // 1 = one
}


/*** Relation with Array objects - Array to Map to Array ***/
{
    const kvArray = [['key1', 'value1'], ['key2', 'value2']]

    // Use the regular Map constructor to transform a 2D key-value Array into a map
    const myMap = new Map(kvArray)

    myMap.get('key1') // returns "value1"

    myMap.set('key3', 'Pravin');

    // Use Array.from() to transform a map into a 2D key-value Array
    console.log(Array.from(myMap)) // Will show you exactly the same Array as kvArray

    // A succinct way to do the same, using the spread syntax - Map is iterable
    console.log([...myMap])

    // Or use the keys() or values() iterators, and convert them to an array
    console.log(Array.from(myMap.keys())) // ["key1", "key2", "key3"]
}


/*** Cloning and merging Maps ***/
{
    const original = new Map([
        [1, 'one']
    ])

    // CAUTION: Keep in mind that the data itself is not cloned.
    const clone = new Map(original)

    console.log(clone.get(1))       // one
    console.log(original === clone) // false (useful for shallow comparison)
}


/*** Maps can be merged, maintaining key uniqueness: ***/
{
    const first = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three'],
    ])

    const second = new Map([
        [1, 'uno'],
        [2, 'dos']
    ])

    // Merge two maps. The last repeated key wins.
    // Spread operator essentially converts a Map to an Array
    const merged = new Map([...first, ...second])

    console.log(merged.get(1)) // uno
    console.log(merged.get(2)) // dos
    console.log(merged.get(3)) // three
}


/*** Maps can be merged with Arrays, too: ***/
{
    const first = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three'],
    ])

    const second = new Map([
        [1, 'uno'],
        [2, 'dos']
    ])

    // Merge maps with an array. The last repeated key wins.
    const merged = new Map([...first, ...second, [1, 'eins']])

    console.log(merged.get(1)) // eins
    console.log(merged.get(2)) // dos
    console.log(merged.get(3)) // three
}


/*** How do you JSON.stringify an ES6 Map? ***/
// https://stackoverflow.com/questions/29085197/how-do-you-json-stringify-an-es6-map
// check other solutions in the above link also
{
    function replacer(key, value) {
        if(value instanceof Map) {
          return {
            dataType: 'Map',
            value: Array.from(value.entries()), // or with spread: value: [...value]
          };
        } else {
          return value;
        }
    }

    function reviver(key, value) {
        if(typeof value === 'object' && value !== null) {
          if (value.dataType === 'Map') {
            return new Map(value.value);
          }
        }
        return value;
    }

    // Usage:
    const originalValue = new Map([['a', 1], ['b', 32]]);
    const str = JSON.stringify(originalValue, replacer);
    console.log(str);
    const newValue = JSON.parse(str, reviver);
    console.log(originalValue, newValue);
}
