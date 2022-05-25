const once = fn => {
    let done = false;
    return (...args) => {
        if (!done) {
            done = true;
            fn(...args);
        }
    };
};

const onceAndAfter = (f, g = () => {}) => {
    let done = false;
    return (...args) => {
        if (!done) {
            done = true;
            f(...args);
        } else {
            g(...args);
        }
    };
};

// Exercise Question 2.1
// https://stackoverflow.com/questions/12713564/function-in-javascript-that-can-be-called-only-once
const onceNoTemp = fn => {
    return (...args) => {
        if (fn) {
            fn(...args);
            fn = null;
        }
    };
};

// Exercise Question 2.2
const alternator = (f, g) => {
    let done = false;
    return (...args) => {
        if (!done) {
            done = true;
            return f(...args);
        } else {
            done = false;
            return g(...args);
        }
    };
};

const thisManyTimes = (fn, max_call_cout) => {
    let call_count = 0;
    return (...args) => {
        if (call_count < max_call_cout) {
            ++call_count;
            fn(...args);
        }
    };
};
