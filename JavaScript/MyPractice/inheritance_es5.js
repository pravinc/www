'use strict';

// Refer https://www.accelebrate.com/blog/javascript-es6-classes-and-prototype-inheritance-part-1-of-2/

function Vehicle(make, price) {
    this.make = make;
    this.price = price;
}
// declare Vehicle specific prototype functions here

function Bike(make, price, is_self_start) {
    Vehicle.call(this, make, price);
    this.is_self_start = is_self_start;
}
Bike.prototype = Object.create(Vehicle.prototype);
Bike.prototype.constructor = Bike;
// declare Bike specific prototype functions here

function Car(make, price, is_airbag_present) {
    Vehicle.call(this, make, price);
    this.is_airbag_present = is_airbag_present;
}
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;
// declare Car specific prototype functions here

let vehicleObject = new Vehicle("Ashok", 200000);
let bikeObject = new Bike("Bajaj", 50000, true);
let carObject = new Car("Hyundai", 100000, true);

console.log(vehicleObject);
console.log(bikeObject);
console.log(carObject);
