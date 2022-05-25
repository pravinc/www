
var doSomething = function(result, status) {
    console.log("Result:", result);
    console.log("Status:", status);
};

// https://worldtimeapi.org/
// https://www.npmjs.com/package/jquery
// https://api.jquery.com/jquery.get/

// GET http://worldtimeapi.org/api/timezone/Asia/Kolkata?name=John&time=2pm
// http://worldtimeapi.org/api/timezone/Asia/Kolkata?name=John&time=2pm&choices[]=Jon&choices[]=Susan
$.get("http://worldtimeapi.org/api/timezone/Asia/Kolkata",
        { name: "John", time: "2pm", "choices[]": ["Jon", "Susan"] }, doSomething);

$.get("http://worldtimeapi.org/api/timezone/Asia/Kolkata", {}, function(result, status) {
    let time_window = document.querySelector('#time_window');
    // time_window.innerHTML = JSON.stringify(result);
    time_window.innerHTML = result['datetime'];
});
