// Remember, we're gonna use strict mode in all scripts now!
"use strict";

let a = 10;

let b = 20;
console.log(a + b); // ReferenceError: a is not defined

if (true) {
  let x = 10;
  const y = 20;
  var z = 30;
}

console.log(a + b); // ReferenceError: a is not defined
console.log();
