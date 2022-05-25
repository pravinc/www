
function billTheUser(some, sales, data) {
    alert("Billing process started ...\n" + some + "\n" + sales + "\n" + data);
}

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

const billTheUserOnceFn = once(billTheUser);
const billOnceOrFailFn = onceAndAfter(billTheUser,
                                        () => {
                                            alert("Billing already done !!!");
                                        });
