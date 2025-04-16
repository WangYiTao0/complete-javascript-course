'use strict';

// Constructor function
// 1. Use a capitalized name for the constructor function
// const Person = function (firstName, birthYear) {
//   // Instance properties
//   this.firstName = firstName;
//   this.birthYear = birthYear;

//   // Never create a method inside a constructor function
//   // this.calcAge = function () {
//   //   console.log(2037 - this.birthYear);
//   // };
// };

// const jonas = new Person('Jonas', 1991);
// const matilda = new Person('Matilda', 2017);
// console.log(jonas, matilda); // Person { firstName: 'Jonas', birthYear: 1991 } Person { firstName: 'Matilda', birthYear: 2017 }

// // javascript is not a class-based language,
// //  but a prototype-based language
// // 2. Use the 'new' keyword to create a new object

// Person.prototype.carlcAge = function () {
//   console.log(2037 - this.birthYear);
// };
// jonas.carlcAge(); // 46
// matilda.carlcAge(); // 20
// Person.prototype.specice = 'Human';

// console.log(jonas.specice); // Human

// console.log(jonas.__proto__); // Person { specice: 'Human' }
// console.log(jonas.__proto__ === Person.prototype); // true

// console.log(jonas.__proto__.__proto__); // Object { constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, … }

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car.
 A car has a make and a speed property.
  The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase 
the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's
 speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} going at ${this.speed} km/h`);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} going at ${this.speed} km/h`);
// };

// const bmw = new Car('BMW', 120);
// const mercedes = new Car('Mercedes', 95);
// bmw.accelerate(); // BMW going at 130 km/h
// bmw.accelerate(); // BMW going at 140 km/h
// bmw.brake(); // BMW going at 135 km/h
// mercedes.accelerate(); // Mercedes going at 105 km/h

class Person {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }
}
const jonas = new Person('Jonas', 1991);
const matilda = new Person('Matilda', 2017);

// console.log(jonas, matilda); // Person { firstName: 'Jonas', birthYear: 1991 } Person { firstName: 'Matilda', birthYear: 2017 }

const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest); // 300
account.latest = 50; // 50
console.log(account.movements); // [200, 530, 120, 300, 50]
