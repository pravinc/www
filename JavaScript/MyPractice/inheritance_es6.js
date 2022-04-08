'use strict';

class Vehicle {
    constructor(make, price) {
        this.make = make;
        this.price = price;
    }
}

class Bike extends Vehicle {
    constructor(make, price, is_self_start) {
        super(make, price);
        this.is_self_start = is_self_start;
    }
}

class Car extends Vehicle {
    constructor(make, price, is_airbag_present) {
        super(make, price);
        this.is_airbag_present = is_airbag_present;
    }
}

let vehicleObject = new Vehicle("Ashok", 200000);
let bikeObject = new Bike("Bajaj", 50000, true);
let carObject = new Car("Hyundai", 100000, true);

console.log(vehicleObject);
console.log(bikeObject);
console.log(carObject);
