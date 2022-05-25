describe("once", () => {

    beforeEach(() => {
        window.myFn = () => { };
        spyOn(window, "myFn");
    });

    it("without 'once', a function always runs", () => {
        myFn();
        myFn();
        myFn();
        expect(myFn).toHaveBeenCalledTimes(3);
    });

    it("with 'once', a function runs one time", () => {
        window.onceFn = once(window.myFn);
        spyOn(window, "onceFn").and.callThrough();
        onceFn();
        onceFn();
        onceFn();
        expect(onceFn).toHaveBeenCalledTimes(3);
        expect(myFn).toHaveBeenCalledTimes(1);
    });

});

describe("onceAndAfter", () => {

    it("should call the first function once, and the other after", () => {
        func1 = () => { };
        spyOn(window, "func1");
        func2 = () => { };
        spyOn(window, "func2");
        onceFn = onceAndAfter(func1, func2);
        onceFn();
        expect(func1).toHaveBeenCalledTimes(1);
        expect(func2).toHaveBeenCalledTimes(0);
        onceFn();
        expect(func1).toHaveBeenCalledTimes(1);
        expect(func2).toHaveBeenCalledTimes(1);
        onceFn();
        expect(func1).toHaveBeenCalledTimes(1);
        expect(func2).toHaveBeenCalledTimes(2);
        onceFn();
        expect(func1).toHaveBeenCalledTimes(1);
        expect(func2).toHaveBeenCalledTimes(3);
    });

    it("should support calling with only first function", () => {
        func1 = () => {};
        spyOn(window, "func1");

        onceFn = onceAndAfter(func1);

        onceFn();
        expect(func1).toHaveBeenCalledTimes(1);

        onceFn();
        expect(func1).toHaveBeenCalledTimes(1);
    });

});

describe("onceNoTemp", () => {

    beforeEach(() => {
        window.myFn = () => { };
        spyOn(window, "myFn");
    });

    it("with 'onceNoTemp', a function runs one time", () => {
        onceNoTempFn = onceNoTemp(window.myFn);
        onceNoTempFn();
        onceNoTempFn();
        onceNoTempFn();
        expect(myFn).toHaveBeenCalledTimes(1);
    });

});

describe("alternator", () => {

    it("with 'alternator', 2 given functions are alternatively executed", () => {
        let sayA = () => "A";
        let sayB = () => "B";
        let alt = alternator(sayA, sayB);
        expect(alt()).toBe("A");
        expect(alt()).toBe("B");
        expect(alt()).toBe("A");
        expect(alt()).toBe("B");
        expect(alt()).toBe("A");
        expect(alt()).toBe("B");
    });

});

describe("thisManyTimes", () => {

    beforeEach(() => {
        window.myFn = () => { };
        spyOn(window, "myFn");
    });

    it("should call given function given number of times", () => {
        let thisManyTimesFn = thisManyTimes(window.myFn, 3);
        thisManyTimesFn();
        thisManyTimesFn();
        thisManyTimesFn();
        thisManyTimesFn();
        thisManyTimesFn();
        expect(myFn).toHaveBeenCalledTimes(3);
    });

    it("should not call function if given count is 0", () => {
        let thisManyTimesFn = thisManyTimes(window.myFn, 0);
        thisManyTimesFn();
        thisManyTimesFn();
        expect(myFn).toHaveBeenCalledTimes(0);
    });

    it("should call function only once if given count is 1", () => {
        let thisManyTimesFn = thisManyTimes(window.myFn, 1);
        thisManyTimesFn();
        thisManyTimesFn();
        thisManyTimesFn();
        expect(myFn).toHaveBeenCalledTimes(1);
    });

    it("should call given function many number of times", () => {
        let req_call_count = 100;
        let thisManyTimesFn = thisManyTimes(window.myFn, req_call_count);
        for (let idx = 0; idx < req_call_count * 2; ++idx) {
            thisManyTimesFn();
        }
        thisManyTimesFn();
        expect(myFn).toHaveBeenCalledTimes(req_call_count);
    });

});
