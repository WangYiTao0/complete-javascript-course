'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const initApp = function () {
  containerApp.style.opacity = 0;
};

initApp();

const UpdateUI = function (acc) {
  displayMovements(acc.movements);
  calcDisplaySummary(acc);
  calcDisplayBalance(acc);
};

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ''; // Clear the container

  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
         <div class="movements__date">3 days ago</div>
        <div class="movements__value">${mov}€</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//displayMovements(account1.movements);

const calcDisplaySummary = function (acc) {
  const input = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  const output = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${input}€`;
  labelSumOut.textContent = `${Math.abs(output)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .filter(mov => mov >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest}€`;
};

//balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

// Creating usernames for each account owner
// short form of the owner name
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

console.log(accounts);

let currentAccount = null; // Variable to store the current account
//Event Handler
btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent form from submitting
  const inputAcc = inputLoginUsername.value;
  const inputPin = inputLoginPin.value;
  currentAccount = accounts.find(acc => acc.username === inputAcc);
  // Check if the account exists and if the pin is correct
  if (currentAccount?.pin === Number(inputPin)) {
    console.log('Login successful');
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); // Remove focus from the pin input field
    UpdateUI(currentAccount);
  } else {
    console.log('Login failed');
    // Display error message
    labelWelcome.textContent = 'Login failed. Please try again.';
    containerApp.style.opacity = 0;
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent form from submitting
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Transfer money
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    UpdateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent form from submitting
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // Delete account
    accounts.splice(index, 1);
    // Hide UI
    labelWelcome.textContent = 'Log in to get started';
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent form from submitting
  const amount = Number(inputLoanAmount.value);
  // Check if the amount is valid and if the current account has enough balance
  // to cover the loan amount (10% of the loan amount)
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);
    UpdateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnSort.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent form from submitting
  const sorted = containerMovements.classList.toggle('sort');
  displayMovements(currentAccount.movements, sorted);
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];

// // Slice method
// // console.log(arr.slice(2)); // ['c', 'd', 'e']
// // console.log(arr);
// // Splice method
// // console.log(arr.splice(2));
// // console.log(arr);
// // reverse method applys to the original array
// console.log(arr.reverse()); // ['e', 'd', 'c', 'b', 'a']
// console.log(arr);
// // concat method
// const arr2 = arr.concat(['f', 'g', 'h']);
// console.log(arr2); // ['e', 'd', 'c', 'b', 'a', 'f', 'g', 'h']

// // join method
// console.log(arr2.join('-')); // e-d-c-b-a-f-g-h

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked
 5 dog owners about their dog's age, and stored the data into
  an array (one array for each). For now, t
  hey are just interested in knowing whether a dog is an adult or a 
  puppy. A dog is an adult if it is at least 3 years old,
   and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages 
('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the
 LAST TWO dogs actually have cats, not dogs! 
 So create a shallow copy of Julia's array, 
 and remove the cat ages from that copied array 
 (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, 
log to the console whether it's an adult ("Dog number 1 is an adult,
 and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice(1, -2);
//   const dogs = dogsJuliaCorrected.concat(dogsKate);
//   dogs.forEach((dog, i) => {
//     if (dog >= 3) {
//       console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy 🐶`);
//     }
//   });
// };

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
// // convert movements to euros
// const eurToUsd = 1.1;
// // callback function to convert movements to USD
// // modern way of doing it
// const movementsUSD = movements.map(mov => mov * eurToUsd);
// console.log(movementsUSD); // [220, 495, -440, 3300, -715, -143, 77, 1430]

// const deposites = movements.filter(mov => mov > 0);
// console.log(deposites); // [200, 450, 3000, 70, 1300
// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals); // [-400, -650, -130]

//accumulator -> SNOWBALL
// const balance = movements.reduce((acc, cur, i, arr) => acc + cur, 0);
// console.log(balance);

// // Maximum value in the array
// const maxValue = movements.reduce(
//   (acc, cur) => (acc > cur ? acc : cur),
//   movements[0]
// );

// console.log(maxValue); // 3000

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs.
 This time, they want to convert dog ages to human ages
  and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', 
which accepts an arrays of dog's ages ('ages'),
 and does the following things in order:

1. Calculate the dog age in human years using the following formula:
 if the dog is <= 2 years old, humanAge = 2 * dogAge. 
 If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old
 (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs
 (you should already know from other challenges 
 how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(age => (age <= 2 ? age * 2 : 16 + age * 4));
//   const adults = humanAges.filter(age => age >= 18);
//   //const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
//   const average = adults.reduce(
//     (acc, age, i, arr) => acc + age / arr.length,
//     0
//   );
//   return average;
// };

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3])); // 44.333333333333336
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4])); // 40

// //chaining methods
// const eurToUsd = 1.1;

// console.log(
//   movements
//     .filter(mov => mov > 0)
//     .map(mov => mov * eurToUsd)
//     .reduce((acc, mov) => acc + mov, 0)
// );

// console.log(movements); // [200, 450, -400, 3000, -650, -130, 70, 1300]

///////////////////////////////////////
// Coding Challenge #4

/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? 
Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:
*/

const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];

// 1. Store the the average weight of a "Husky" in a variable "huskyWeight"
const huskyWeight = breeds.find(breed => breed.breed === 'Husky').averageWeight;
console.log(huskyWeight); // 26
// 2. Find the name of the only breed that likes both "running" and "fetch"
// ("dogBothActivities" variable)

const dogBothActivities = breeds.find(
  breed =>
    breed.activities.includes('running') && breed.activities.includes('fetch')
).breed;
console.log(dogBothActivities); // Dalmatian

// 3. Create an array "allActivities" of all the activities of all the dog breeds
const allActivities = breeds
  .map(breed => breed.activities)
  .flat()
  .reduce((acc, cur) => acc.concat(cur), []);
const allActivities2 = breeds.flatMap(breed => breed.activities);
console.log(allActivities); // ['fetch', 'swimming', 'running', 'fetch', 'agility', 'swimming', 'digging', 'fetch', 'running', 'agility', 'sleeping', 'agility', 'fetch']
console.log(allActivities2); // ['fetch', 'swimming', 'running', 'fetch', 'agility', 'swimming', 'fetch', 'digging', 'fetch', 'running', 'agility', 'swimming', 'sleeping', 'agility', 'fetch']

// 4. Create an array "uniqueActivities" that contains only the unique activities
//  (no activity repetitions). HINT: Use a technique with a special data structure
// that we studied a few sections ago.

const uniqueActivities = [...new Set(allActivities)];
console.log(uniqueActivities); // ['fetch', 'swimming', 'running', 'agility', 'digging', 'sleeping']

// 5. Many dog breeds like to swim. What other activities do these dogs like?
// Store all the OTHER activities these breeds like to do,
// in a unique array called "swimmingAdjacent".
//
const dogLikeSwiming = breeds
  .filter(breed => breed.activities.includes('swimming'))
  .flatMap(breed => breed.activities);

const swimmingAdjacent = [...new Set(dogLikeSwiming)].filter(
  activity => activity !== 'swimming'
);
console.log(swimmingAdjacent); // ['fetch', 'swimming', 'running', 'agility']

// 6. Do all the breeds have an average weight of 10kg or more?
// Log to the console whether "true" or "false".
const allBreedsHaveWeight = breeds.every(breed => breed.averageWeight >= 10);
console.log(allBreedsHaveWeight); // true
// 7. Are there any breeds that are "active"?
// "Active" means that the dog has 3 or more activities.
// Log to the console whether "true" or "false".
const anyActiveBreeds = breeds.some(breed => breed.activities.length >= 3);
console.log(anyActiveBreeds); // true

// BONUS: What's the average weight of the heaviest breed that likes to fetch?
// HINT: Use the "Math.max" method along with the ... operator.
const heaviestBreed = Math.max(
  ...breeds
    .filter(breed => breed.activities.includes('fetch'))
    .map(breed => breed.averageWeight)
);

console.log(heaviestBreed); // 36
