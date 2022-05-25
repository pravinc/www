'use strict';

var call_count = 0;
function factorial_recurse(n) {
    ++call_count;
    console.log(call_count);
    // console.trace();
    if (n === 0) {
        return 1;
    } else {
        return n * factorial_recurse(n - 1); // not TCO since multiplication applied after return
    }
}

// https://stackoverflow.com/questions/42788139/es6-tail-recursion-optimisation-stack-overflow
// https://stackoverflow.com/questions/37224520/are-functions-in-javascript-tail-call-optimized
// https://2ality.com/2015/06/tail-call-optimization.html
// https://stackoverflow.com/questions/34125/which-if-any-c-compilers-do-tail-recursion-optimization

// https://javascript.plainenglish.io/javascript-optimizations-tail-call-optimization-tco-471b4f8e4f37
function factorial_tco(n, total /* = 1 */) {
    // console.trace();
    if (n === 0) {
        return total;
    }    // proper tail call
    return factorial_tco(n - 1, n * total);
}

function factorial_iterative(n) {
    var total = 1;

    for (var i = 1; i <= n; i++) {
        total *= i;
    }

    return total;
}

// https://testbook.com/learn/maths-sum-of-n-natural-numbers/
// (n * (n + 1)) / 2
function sumOfN_tco(n, total /* = 1 */) {
    // console.trace();
    if (n === 0) {
        return total;
    }    // proper tail call
    return sumOfN_tco(n - 1, n + total);
}

function sumOfN_iterative(n) {
    var total = 0;

    for (var i = 0; i <= n; i++) {
        total += i;
    }

    return total;
}

console.log("Result:", factorial_recurse(7));   // 5040
console.log("Result:", factorial_tco(7, 1));    // 5040

console.log("Result:", sumOfN_tco(100000, 0));
console.log("Result:", sumOfN_iterative(100000));

console.log("Result:", factorial_tco(100000, 1));
console.log("Result:", factorial_iterative(100000));


// console.log("Result:", fact(0x28e1));

// const fact_tco_arrowfn = (n, acc /* = 1 */) => n <= 1 ? acc : fact_tco_arrowfn(n - 1, n * acc)
// console.log("Result:", fact_tco_arrowfn(100000, 1));
