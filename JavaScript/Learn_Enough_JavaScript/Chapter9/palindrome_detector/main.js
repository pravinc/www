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

// https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector

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
