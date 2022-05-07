// npm install --save-dev browserify    => https://browserify.org/
// npm install --save-dev watchify      => https://www.npmjs.com/package/watchify
// npx browserify main.js -o bundle.js
// npx watchify main.js -o bundle.js
let Phrase = require("pravinc-palindrome");

alert(new Phrase("Madam, I'm Adam.").palindrome());

let string = prompt("Please enter a string for palindrome testing:");
let phrase = new Phrase(string);

if (phrase.palindrome()) {
  alert(`"${phrase.content}" is a palindrome!`);
} else {
  alert(`"${phrase.content}" is not a palindrome.`)
}
