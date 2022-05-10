(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// npm install --save-dev browserify    => https://browserify.org/
// npm install --save-dev watchify      => https://www.npmjs.com/package/watchify
// npx browserify main.js -o bundle.js
// npx watchify main.js -o bundle.js
let Phrase = require("pravinc-palindrome");
// https://www.npmjs.com/package/pravinc-palindrome
// npm install pravinc-palindrome
// npm update pravinc-palindrome

function staticPalindromeAlert() {
    // alert(new Phrase("Madam, I'm Adam.").palindrome());
    checkAndPrintResult("Madam, I'm Adam.");
}

function palindromePromptTester() {
    let string = prompt("Please enter a string for palindrome testing:");
    checkAndPrintResult(string);
}

function palindromeInputTester(event) {
    event.preventDefault();     // without this, page will refresh
    checkAndPrintResult(event.target.phrase.value);
}

function checkAndPrintResult(string) {
    let phrase = new Phrase(string);
    let palindromeResult = document.querySelector("#palindromeResult");

    if (phrase.palindrome()) {
        alert(`"${phrase.content}" is a palindrome!`);
        palindromeResult.innerHTML = `"<strong>${phrase.content}</strong>" is a palindrome!`;
    } else {
        alert(`"${phrase.content}" is not a palindrome.`);
        palindromeResult.innerHTML = `"<strong>${phrase.content}</strong>" is not a palindrome.`;
    }
}

// window.onload = function() {
document.addEventListener("DOMContentLoaded", function() {
    let button = document.querySelector("#palindromeTester");
    button.addEventListener("click", function() {
        staticPalindromeAlert();
    });
});

document.addEventListener("DOMContentLoaded", function() {
    let form = document.querySelector("#palindromeTesterForm");
    form.addEventListener("submit", function(event) {
        event.preventDefault();     // without this, page will refresh
        palindromePromptTester();
    });
});

document.addEventListener("DOMContentLoaded", function() {
    let tester = document.querySelector("#palindromeInputForm");
    tester.addEventListener("submit", function(event) {
        palindromeInputTester(event);
    });
});

// A man, a plan, a canoe, pasta, heros, rajahs, a
// coloratura, maps, snipe, percale, macaroni, a gag, a banana bag, a
// tan, a tag, a banana bag again (or a camel), a crepe, pins, Spam,
// a rut, a Rolo, cash, a jar, sore hats, a peon, a canal—
// Panama!”

},{"pravinc-palindrome":2}],2:[function(require,module,exports){
// https://docs.npmjs.com/about-semantic-versioning

module.exports = Phrase;

// Adds `reverse` to all strings.
String.prototype.reverse = function() {
  return Array.from(this).reverse().join("");
}

// Defines a Phrase object.
function Phrase(content) {
  this.content = content;

  // Returns content processed for palindrome testing.
  this.processedContent = function processedContent() {
    return this.letters().toLowerCase();
  }

  // Returns the letters in the content.
  // For example:
  //   new Phrase("Hello, world!").letters() === "Helloworld"

  // this.letters = function letters() {
  //   let theLetters = [];
  //   const letterRegex = /[a-z]/i;
  //   Array.from(this.content).forEach(function(character) {
  //     if (character.match(letterRegex)) {
  //       theLetters.push(character);
  //     }
  //   });
  //   return theLetters.join("");
  // }
  this.letters = function letters() {
    // return Array.from(this.content).filter(c => c.match(/[a-z]/i)).join("");
    const lettersRegEx = /[a-z]/gi;
    return (this.content.match(lettersRegEx) || []).join("");
  }

  // Returns true if the phrase is a palindrome, false otherwise.
  this.palindrome = function palindrome() {
    // return this.processedContent().length !== 0 &&
    //   this.processedContent() === this.processedContent().reverse();
    if (this.processedContent()) {
      return this.processedContent() === this.processedContent().reverse();
    } else {
      return false;
    }
  }
}

},{}]},{},[1]);
