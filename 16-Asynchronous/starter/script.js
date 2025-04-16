'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// https://countries-api-836d.onrender.com/countries

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////
const renderCountry = function (data, className = '') {
  const html = `<article class="${className} country">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} People</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// const getCountryDataAndNeighbour = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('Get', `https://restcountries.com/v2/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(request.responseText);
//     console.log(data);
//     renderCountry(data);

//     // get neighbour country
//     const neighbour = data.borders?.[0];
//     if (!neighbour) return;
//     // AJAX call for neighbour country
//     const request2 = new XMLHttpRequest();
//     request2.open('Get', `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(request2.responseText);
//       console.log(data2);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// //getCountryDataAndNeighbour('portugal');
// getCountryDataAndNeighbour('usa');

// promisifying setTimeout
const wait = function (seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      console.log(data);
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      if (!neighbour) throw new Error('No neighbour found!');
      // AJAX call for neighbour country
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Neighbour country not found'
      );
    })
    .then(data => {
      console.log(data);
      renderCountry(data, 'neighbour');
    })
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    });
};

// btn.addEventListener('click', function () {
//   getCountryData('cn');
// });

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates.
 For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng)
 (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}.
The AJAX call will be done to a URL with this format: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=52.508&longitude=13.381. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       console.log(pos.coords);
//       const { lat = pos.coords.latitude, lng = pos.coords.longitude } =
//         pos.coords;
//       return fetch(
//         `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
//       );
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Problem with geocoding ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       const city = data.city;
//       const country = data.countryName;
//       console.log(`You are in ${city}, ${country}`);
//       getCountryData(country);
//     })
//     .catch(err => console.error(`${err} 💥💥`));
// };

navigator.geolocation.getCurrentPosition(
  position => {
    const { latitude: lat, longitude: lng } = position.coords;
    return lat, lng;
  },
  err => {
    console.error(err);
  }
);

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then(pos => {
//   console.log(pos);
// });

//btn.addEventListener('click', whereAmI);

//////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input.
 This function returns a promise which creates a new image (use document.createElement('img')) 
 and sets the .src attribute to the provided image path.
  When the image is done loading, append it to the DOM element with the 'images' class, 
  and resolve the promise. The fulfilled value should be the image element itself. 
  In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image
 (HINT: Use the image element returned by the createImage promise to hide the current image.
  You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path.
 Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/
// const imgContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise((resolve, reject) => {
//     const img = document.createElement('img');
//     img.src = imgPath;
//     img.addEventListener('load', () => {
//       imgContainer.append(img);
//       resolve(img);
//     });
//     img.addEventListener('error', () => {
//       reject(new Error('Image not found'));
//     });
//   });
// };

// createImage('img/img-1.jpg')
//   .then(img => {
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     imgContainer.children[0].style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .catch(err => {
//     console.error(err);
//   });

const whereAmI = async function () {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
    );
    if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
    const data = await res.json();
    console.log(data);
    const city = data.city;
    const countryName = data.countryName;
    console.log(`You are in ${city}, ${countryName}`);
    getCountryData(countryName);
  } catch (err) {
    console.error(`${err} 💥💥`);
    renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
  }
};

btn.addEventListener('click', whereAmI);
