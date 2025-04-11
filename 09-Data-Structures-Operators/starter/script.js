'use strict';

// Data needed for a later exercise
//const flights =
//  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);
// // swiching variables
// [secondary, main] = [main, secondary];
// console.log(main, secondary);

// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// // 1. Create one player array for each team (variables 'players1' and 'players2')
// const [players1, players2] = game.players;
// console.log(players1, players2);
// // 2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1)
// //  create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
// const [gk, ...fieldPlayers] = players1;
// console.log(gk, fieldPlayers);
// // 3. Create an array 'allPlayers' containing all players of both teams (22 players)
// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);
// // 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final')
// // containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
// const players1Final = [...game.players[0], 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);
// // 5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
// const {
//   odds: { team1, x: draw, team2 },
// } = game;
// // 6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array)
// // and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
// const printGoals = function (...playerName) {
//   console.log(playerName);
// };

// printGoals('Thiago', 'Coutinho', 'Perisic');
// // 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win,
// //  WITHOUT using an if/else statement or the ternary operator.

// console.log(team2 > team1 ? 'team2' : 'team1');

// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(menu);

// for (const item of menu) {
//   console.log(item);
// }

// for (const item of menu.entries()) {
//   console.log(item);
// }
// console.log([...menu.entries()]);

// //.?
// // Optional chaining
// restaurant.openingHours.mon?.open ?? 'closed';
// restaurant.openingHours?.mon?.open ?? 'closed';

// //??
// // Nullish coalescing operator
// // console.log(0 || 'Jonas');
// // console.log('' || 'Jonas');
// // console.log(undefined || 'Jonas');
// // console.log(null || 'Jonas');
// // console.log(0 ?? 'Jonas');
// // console.log('' ?? 'Jonas');
// // console.log(false ?? 'Jonas');
// // console.log(null ?? 'Jonas');
// // console.log(undefined ?? 'Jonas');

// const propertues = Object.keys(restaurant.openingHours);
// console.log(propertues);

// for (const day of propertues) {
//   console.log(day);
// }

///////////////////////////////////////
// // Coding Challenge #2

// // Let's continue with our football betting app!

// // 1. Loop over the game.scored array and print each player name to the console,
// // along with the goal number (Example: "Goal 1: Lewandowski")
// for (const [i, player] of game.scored.entries()) {
//   console.log(`Goal ${i + 1}: ${player}`);
// }

// // 2. Use a loop to calculate the average odd and
// // log it to the console (We already studied how to calculate averages,
// // you can go check if you don't remember)

// const odds = Object.values(game.odds);
// console.log(odds);
// const average = odds.reduce((acc, cur) => acc + cur, 0) / odds.length;
// console.log(average);

// // 3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
// //       Odd of victory Bayern Munich: 1.33
// //       Odd of draw: 3.25
// //       Odd of victory Borrussia Dortmund: 6.5
// // Get the team names directly from the game object,
// // don't hardcode them (except for "draw").
// // HINT: Note how the odds and the game objects
// //  have the same property names 😉

// const oddsEntries = Object.entries(game.odds);

// for (const [team, odd] of oddsEntries) {
//   const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
//   console.log(`Odd of ${teamStr}: ${odd}`);
// }

// // BONUS: Create an object called 'scorers'
// //  which contains the names of the players
// //  who scored as properties, and the number of goals
// // as the value. In this game, it will look like this:
// //       {
// //         Gnarby: 1,
// //         Hummels: 1,
// //         Lewandowski: 2
// //       }

// const scorers = {};
// for (const player of game.scored) {
//   scorers[player] = scorers[player] ? scorers[player] + 1 : 1;
// }
// // GOOD LUCK 😀

// const orderSet = new Set([
//   'pasta',
//   'gnocchi',
//   'tomatoes',
//   'olive oil',
//   'garlic',
//   'basil',
//   'pasta',
// ]);

// console.log(orderSet);
// console.log(new Set('Jonas'));
// // set onlu stores unique values

// // set methods  集合的方法

// const commonFoods = italianFoods.intersection(mexicanFoods);
// console.log(commonFoods);

// //combine values of two sets, removes duplicates
// const italianFoodsAndMexicanFoods = italianFoods.union(mexicanFoods);
// console.log(italianFoodsAndMexicanFoods);

// // find the difference between two sets
// const italianFoodsNotMexicanFoods = italianFoods.difference(mexicanFoods);
// console.log(italianFoodsNotMexicanFoods);

// // find the difference between two sets
// const mexicanFoodsNotItalianFoods = mexicanFoods.difference(italianFoods);
// console.log(mexicanFoodsNotItalianFoods);

// // find the symmetric difference between two sets
// const symmetricDifference = italianFoods.symmetricDifference(mexicanFoods);
// console.log(symmetricDifference);

//console.log(italianFoods.isDisJoinFrom(mexicanFoods)); // false

//Map key can be any value, including objects, functions, and arrays

// const rest = new Map();
// rest.set('name', 'Classico Italiano');
//set method return updated map object, so we can chain methods
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// // 1. Create an array 'events' of the different game events that happened (no duplicates)
// const events = [...new Set(gameEvents.values())];
// console.log(events);
// // 2. After the game has finished, is was found that the yellow card from minute 64 was unfair.
// // So remove this event from the game events log.
// gameEvents.delete(64);
// console.log(gameEvents);
// // 3. Print the following string to the console: "An event happened,
// //  on average, every 9 minutes" (keep in mind that a game has 90 minutes)
// const times = [...gameEvents.values()].length;
// console.log(times);

// const time = [...gameEvents.keys()].pop(); // get the last key
// console.log(time);

// const average = time / times;
// console.log(`An event happened, on average, every ${average} minutes`);

// // 4. Loop over the events and log them to the console,
// // marking whether it's in the first half or second half (after 45 min) of the game, like this:
// //       [FIRST HALF] 17: ⚽️ GOAL

// for (const [min, event] of gameEvents) {
//   const half = min <= 45 ? 'FIRST HALF' : 'SECOND HALF';
//   console.log(`[${half}] ${min}: ${event}`);
// }

// const airline = 'TAP Air Portugal';

// console.log(airline.slice(4));
// console.log(airline.slice(4, 7));

// // log first str
// console.log(airline.indexOf(' ')); // 3
// console.log(airline.slice(0, airline.indexOf(' '))); // TAP
// //log Last  of str
// console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // Air Portugal

// console.log(airline.slice(-2)); // al
// console.log(airline.slice(1, -1)); // AP Air Portuga

// const email = 'hello@jonas.io';
// const loginEmail = '   Hello@Jonas.Io \n';

// const lowerEmail = loginEmail.toLowerCase();
// console.log(lowerEmail);
// // remove white space
// const trimmedEmail = lowerEmail.trim();
// console.log(trimmedEmail);
// // replace
// const announcement =
//   'All passengers come to boarding door 23. Boarding door 23!';
// const announcement2 = announcement.replace('door', 'gate');
// console.log(announcement2);
// console.log(announcement.replace(/door/g, 'gate')); // replace all
// // replace all
// console.log(announcement.replaceAll('door', 'gate')); // replace all, case insensitive

///////////////////////////////////////
// String Methods Practice

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll(
    '_',
    ' '
  )} from ${getCode(from)} to ${getCode(to)} (${time.replace(
    ':',
    'h'
  )})`.padStart(36);
  console.log(output);
}

/*
///////////////////////////////////////
// Coding Challenge #4


Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

function convertToCamelCase(str) {
  const [first, second] = str.toLowerCase().trim().split('_');
  return first + second[0].toUpperCase() + second.slice(1);
}

function convertStrListToCamelCase() {
  const textArea = document.querySelector('textarea');
  const text = textArea.value;
  const strArray = text.split('\n');
  console.log(strArray);
  for (const str of strArray) {
    const camelCaseStr = convertToCamelCase(str);

    console.log(
      camelCaseStr.padEnd(20, ' ') + '✅'.repeat(strArray.indexOf(str) + 1)
    );
  }
}

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const button = document.querySelector('button');
const buttonText = button.innerText;
button.innerText = 'Convert';

button.addEventListener('click', convertStrListToCamelCase);
