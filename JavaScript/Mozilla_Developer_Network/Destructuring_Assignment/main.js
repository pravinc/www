// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

// destructuring assignment syntax is a JavaScript expression that makes it
// possible to unpack values from arrays, or properties from objects, into
// distinct variables

// uses similar syntax to object and array literal expressions, but on the
// left-hand side of the assignment to define what values to unpack from the
// sourced variable

{
    let a, b, rest;
    [a, b] = [1, 2];
    console.log(a); // 10
    console.log(b); // 20

    [a, b, ...rest] = [10, 20, 30, 40, 50];
    console.log(a); // 10
    console.log(b); // 20
    console.log(rest); // [30, 40, 50]

    ({ a, b } = { a: 10, b: 20 });
    console.log(a); // 10
    console.log(b); // 20

    // Stage 4(finished) proposal
    ({a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40});
    console.log(a); // 10
    console.log(b); // 20
    console.log(rest); // {c: 30, d: 40}
}

{
    const x = [1, 2, 3, 4, 5];
    const [y, z] = x;           // same as: y = x[0]; z = x[1];
    console.log(y); // 1
    console.log(z); // 2
}

// Array destructuring - Basic variable assignment
{
    const foo = ['one', 'two', 'three'];

    const [red, yellow, green] = foo;
    console.log(red); // "one"
    console.log(yellow); // "two"
    console.log(green); // "three"
}

// Array destructuring - Assignment separate from declaration
{
    let a, b;

    [a, b] = [1, 2];
    console.log(a); // 1
    console.log(b); // 2
}

{
    const foo = ['one', 'two'];

    const [red, yellow, green, blue] = foo;
    console.log(red); // "one"
    console.log(yellow); // "two"
    console.log(green); // undefined
    console.log(blue);  //undefined
}

// Default values
{
    let a, b;

    [a = 5, b = 7] = [1];
    console.log(a); // 1
    console.log(b); // 7
}

// Swapping variables
{
    let a = 1;
    let b = 3;

    [a, b] = [b, a];
    console.log(a); // 3
    console.log(b); // 1

    const arr = [1, 2, 3];
    [arr[2], arr[1]] = [arr[1], arr[2]];
    console.log(arr); // [1,3,2]
}

// Parsing an array returned from a function
{
    function f() {
        return [1, 2];
    }

    let a, b;
    [a, b] = f();
    console.log(a); // 1
    console.log(b); // 2
}

// Ignoring some returned values
{
    function f() {
        return [1, 2, 3];
    }

    // You can ignore return values that you're not interested in:
    const [a, , b] = f();
    console.log(a); // 1
    console.log(b); // 3

    const [c] = f();
    console.log(c); // 1

    // You can also ignore all returned values:
    [, ,] = f();
}

// Assigning the rest of an array to a variable
{
    const [a, ...b] = [1, 2, 3];
    console.log(a); // 1
    console.log(b); // [2, 3]
}

{
    // Always consider using rest operator as the last element
    // SyntaxError: Rest element must be last element
    // const [a, ...b,] = [1, 2, 3];
}

// Unpacking values from a regular expression match
{
    function parseProtocol(url) {
        const parsedURL = /^(\w+)\:\/\/([^\/]+)\/(.*)$/.exec(url);
        if (!parsedURL) {
            return false;
        }
        console.log(parsedURL);
        // ["https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        // "https", "developer.mozilla.org", "en-US/docs/Web/JavaScript"]

        const [, protocol, fullhost, fullpath] = parsedURL;
        return protocol;
    }

    console.log(parseProtocol('https://developer.mozilla.org/en-US/docs/Web/JavaScript'));
    // "https"

    console.log(/^(\w+)\:\/\/(.+)\/(.*)$/.exec('https://pravinc.github.io/www/test/me'));
    // 'https', 'pravinc.github.io/www/test', 'me'

    // http://webagility.com/posts/the-basics-of-regex-explained
    // Not [^]
    // [^D]an - Match anything that ends with "an" and starts with any character except "D",
    //          so “Dan” would not be valid, but "San", "Can" or "man" would.
    // [^DB]an - Same as above, but also “Ban” is one of the invalid matches.
    console.log(/^(\w+)\:\/\/([^\/]+)\/(.*)$/.exec('https://pravinc.github.io/www/test/me'));
    // 'https', 'pravinc.github.io', 'www/test/me'

    console.log(/^(\w+)\:\/\/([^\/]+)(.*)$/.exec('https://pravinc.github.io/www/test/me'));
    // 'https', 'pravinc.github.io', '/www/test/me'
}

// Object destructuring - Basic assignment
{
    const user = {
        id: 42,
        isVerified: true
    };

    const {id, isVerified} = user;

    console.log(id); // 42
    console.log(isVerified); // true
}

// Assignment separate from declaration
{
    let a, b;

    ({a, b} = {a: 1, b: 2});
    console.log(a, b);
}

// Assigning to new variable names
{
    const o = {p: 42, q: true};
    const {p: foo, q: bar} = o;
    // takes from the object 'o' the properties named 'p' and 'q' and assigns it
    // to a local variables named 'foo' and 'bar'

    console.log(foo); // 42
    console.log(bar); // true
}

// Default values if the value unpacked from the object is undefined
{
    const {a = 10, b = 5} = {a: 3};

    console.log(a); // 3
    console.log(b); // 5
}

// Assigning to new variable names and providing default values
{
    const {a: aa = 10, b: bb = 5} = {b: 3};

    console.log(aa); // 10
    console.log(bb); // 3
}

// Unpacking properties from objects passed as a function parameter
{
    const user = {
        id: 872,
        displayName: 'jdoe',
        fullName: {
            firstName: 'John',
            lastName: 'Doe'
        }
    };

    function userId({ id }) {
        return id;
    }

    console.log(userId(user)); // 42

    // define different name for the unpacked variable
    function userDisplayName({ displayName: dname }) {
        return dname;
    }

    console.log(userDisplayName(user)); // `jdoe`

    // unpack nested objects
    function whois({ displayName, fullName: { firstName: name } }) {
        return `${displayName} is ${name}`;
    }

    console.log(whois(user));  // "jdoe is John"
}

// Setting a function parameter's default value
{
    function drawChart({ size = 'big', coords = { x: 0, y: 0 }, radius = 25 } = {}) {
        console.log(size, coords, radius);
        // do some chart drawing
    }

    drawChart();
    drawChart({
        coords: { x: 18, y: 30 },
        radius: 30
    });
}

// Nested object and array destructuring
{
    const metadata = {
        title: 'Scratchpad',
        translations: [
            {
                locale: 'de',
                localization_tags: [],
                last_edit: '2014-04-14T08:43:37',
                url: '/de/docs/Tools/Scratchpad',
                title: 'JavaScript-Umgebung'
            }
        ],
        url: '/en-US/docs/Tools/Scratchpad'
    };

    let {
        title: englishTitle, // rename
        translations: [
            {
                title: localeTitle, // rename
            },
        ],
    } = metadata;

    console.log(englishTitle); // "Scratchpad"
    console.log(localeTitle);  // "JavaScript-Umgebung"
}

// For of iteration and destructuring
{
    const people = [
        {
            name: 'Mike Smith',
            family: {
                mother: 'Jane Smith',
                father: 'Harry Smith',
                sister: 'Samantha Smith'
            },
            age: 35
        },
        {
            name: 'Tom Jones',
            family: {
                mother: 'Norah Jones',
                father: 'Richard Jones',
                brother: 'Howard Jones'
            },
            age: 25
        }
    ];

    for (const { name: n, family: { father: f } } of people) {
        console.log('Name: ' + n + ', Father: ' + f);
    }
    // "Name: Mike Smith, Father: Harry Smith"
    // "Name: Tom Jones, Father: Richard Jones"
}

// Computed object property names and destructuring
{
    let key = 'z';
    let {[key]: foo} = {z: 'bar'};

    console.log(foo); // "bar"
}

// Rest in Object Destructuring
{
    let {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40}
    console.log(a); // 10
    console.log(b); // 20
    console.log(rest); // { c: 30, d: 40 }
}

// Invalid JavaScript identifier as a property name
{
    const foo = { 'fizz-buzz': true };
    const { 'fizz-buzz': fizzBuzz } = foo;  // 'fizz-buzz' is invalid identifier
    console.log(fizzBuzz); // true
}

// Combined Array and Object Destructuring
{
    const props = [
        { id: 1, name: 'Fizz' },
        { id: 2, name: 'Buzz' },
        { id: 3, name: 'FizzBuzz' }
    ];

    const [, , { name }] = props;

    console.log(name); // "FizzBuzz"
}

// The prototype chain is looked up when the object is deconstructed
{
    let obj = {self: '123'};
    obj.__proto__.prot = '456';
    const {self, prot} = obj;
    console.log(self, prot);
    // self "123"
    // prot "456" (Access to the prototype chain)
}
