// reference: https://requirejs.org/
// reference: https://github.com/browserify/commonjs-assert
// const assert = require('assert');

// https://stackoverflow.com/questions/58211880/uncaught-syntaxerror-cannot-use-import-statement-outside-a-module-when-import
// import assert from 'assert';

// reference: https://cdn.jsdelivr.net/gh/chaijs/chai@v4.3.4/test/should.js
var should = chai.Should();

// reference: https://www.chaijs.com/api/assert/
// reference: https://cdn.jsdelivr.net/gh/chaijs/chai@v4.3.4/test/assert.js
var assert = chai.assert;

// happy path test
it('correctly calculates 2 plus 2', () => {
    should.equal(add(2, 2), 4);
    assert.equal(add(2, 2), 4);
});

// sad path test
// https://stackoverflow.com/questions/40848551/how-does-adding-string-with-integer-work-in-javascript
it("correctly calculates str('2') plus 2", () => {
    add('2', 2).should.equal(4);
});

it("correctly calculates 2 plus str('2')", () => {
    add(2, '2').should.equal(4);
});
