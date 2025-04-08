
'use strict'; // enable strict mode to avoid errors and bad practices

// //function declaration
// function calcAge(birthYear) {
//     const age = 2037 - birthYear; // age is a local variable
//     return age; // return statement ends the function execution and returns the value
// }

// //function expression 
// const calcAge1 = function (birthYear) {
//     return 2037 - birthYear; // return statement ends the function execution and returns the value
// }

// const ageJonas = calcAge1(1991); // function call
// console.log(ageJonas); // 46

// //arrow function
// const calcAge2= birthYear => 2037 - birthYear; // implicit return
// const ageJonas1 = calcAge2(1991); // function call

// const yearUntilRetirement = (birthYear, firstName) => {
//     const age = 2037 - birthYear; // age is a local variable
//     const retirement = 65 - age;
//     return `${firstName} retires in ${retirement} years`;
// }

// console.log(yearUntilRetirement(1991, 'Jonas')); // Jonas retires in 22 years


const friends = ['Michael', 'Steven', 'Peter'];
console.log(friends); // ['Michael', 'Steven', 'Peter']

//adding elements to an array
friends.push('Jay'); // add element to the end of the array
console.log(friends); // ['Michael', 'Steven', 'Peter', 'Jay']

const newFriends = friends.unshift('John'); // add element to the beginning of the array
console.log(friends); // ['John', 'Michael', 'Steven', 'Peter', 'Jay']


console.log(friends.pop()); // remove last element from the array and return it
console.log(friends); // ['John', 'Michael', 'Steven', 'Peter']

console.log(friends.shift()); // remove first element from the array and return it
console.log(friends); // ['Michael', 'Steven', 'Peter']