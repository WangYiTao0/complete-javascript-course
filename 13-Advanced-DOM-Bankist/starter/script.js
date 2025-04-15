'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function (e) {
  e.preventDefault(); // Prevent default action of the button
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//page navigation
// const navLinks = document.querySelectorAll('.nav__link');
// console.log(navLinks); // log the nav links
// navLinks.forEach(el => {
//   el.addEventListener('click', e => {
//     e.preventDefault(); // Prevent default action of the link
//     const href = this.el.getAttribute('href'); // get the href attribute of the link
//     console.log(href); // log the href attribute of the link
//     const section = document.querySelector(href);
//     section.scrollIntoView({ behavior: 'smooth' }); // get the section element
//   });
// });

const nav = document.querySelector('.nav'); // get the nav element
// add event listener to the nav links
const navLinks = document.querySelector('.nav__links'); // get the nav element
navLinks.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent default action of the link
  console.log(e.target); // log the target element of the event
  if (!e.target.classList.contains('nav__link')) return; // check if the target element is a link
  const href = e.target.getAttribute('href'); // get the href attribute of the link
  const section = document.querySelector(href); // get the section element
  section.scrollIntoView({ behavior: 'smooth' }); // scroll to the section smoothly
}); // add event listener to the nav element

//Tabbed component
const operations_tabs = document.querySelector('.operations__tab-container'); // get the operations element
const operations_content = document.querySelectorAll('.operations__content'); // get the operations content element
const showContent = function (data_tab) {
  operations_content.forEach(c => {
    c.classList.remove('operations__content--active');
  }); // get the child element count of the operations content element
  const activeContent = document.querySelector(
    `.operations__content--${data_tab}`
  ); // get the active content element
  activeContent.classList.add('operations__content--active'); // add the active class to the active content element
};

operations_tabs.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent default action of the link
  const clicked = e.target.closest('.operations__tab'); // get the closest element with the class operations__tab
  if (!clicked) return; // check if the clicked element is a tab
  console.log(clicked); // log the clicked element
  operations_tabs.querySelectorAll('.operations__tab').forEach(t => {
    t.classList.remove('operations__tab--active'); // remove the active class from all other tabs
  });
  clicked.classList.add('operations__tab--active'); // add the active class to the clicked element

  console.log(clicked.dataset); // log the dataset of the clicked element
  console.log(clicked.dataset.tab); // log the tab of the clicked element
  showContent(clicked.dataset.tab); // show the content of the tab
  // log the target element of the event
});

btnScollTo.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent default action of the button
  const s1coords = section1.getBoundingClientRect(); // get the coordinates of the section
  // console.log(s1coords); // log the coordinates of the section
  // console.log(e.target.getBoundingClientRect()); // log the coordinates of the button
  // console.log('Current scroll (X/Y)', window.scrollX, window.scrollY); // log the current scroll position
  // console.log(
  //   'height/width of viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // ); // log the height and width of the viewport
  // Scrolling smoothly to the section
  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset); // scroll to the section
  //old walll
  //
  // modern way to scroll to the section
  section1.scrollIntoView({ behavior: 'smooth' }); // scroll to the section smoothly
});

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target; // get the target element of the event
    const siblings = link.closest('.nav').querySelectorAll('.nav__link'); // get the closest element with the class nav
    const logo = link.closest('.nav').querySelector('img'); // get the logo element
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this; // set the opacity of the siblings to 0.5
    });
    logo.style.opacity = this; // set the opacity of the logo to 0.5
  }
};

navLinks.addEventListener('mouseover', handleHover.bind(0.5));
navLinks.addEventListener('mouseout', handleHover.bind(1)); // set the opacity of the logo to 1

// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords); // get the coordinates of the section
// // sticky navigation
// window.addEventListener('scroll', function (e) {
//   const scrollY = window.scrollY;
//   if (scrollY > initialCoords.top) {
//     nav.classList.add('sticky'); // add the sticky class to the header
//   } else {
//     nav.classList.remove('sticky'); // remove the sticky class from the header
//   }
//   // get the current scroll position
//   console.log(scrollY); // log the current scroll position
// }); // add event listener to the window element

// Intersection Observer API
const stickyNav = function (entries, observer) {
  const [entry] = entries; // get the first entry of the entries array
  //console.log(entry); // log the entry
  if (!entry.isIntersecting) {
    nav.classList.add('sticky'); // add the sticky class to the header
  } else {
    nav.classList.remove('sticky'); // remove the sticky class from the header
  }
};

const navHeight = nav.getBoundingClientRect().height; // get the height of the nav element

const obsOptions = {
  root: null, // use the viewport as the root element
  threshold: 1, // when 0% or 20% of the target is visible
  rootMargin: navHeight, // set the root margin to 0px
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, // when 0% of the target is visible
  rootMargin: `-${navHeight}px`, // set the root margin to the height of the nav element
}); // create a new intersection observer

headerObserver.observe(header); // observe the section element

// reveal sections on scroll

const allSections = document.querySelectorAll('.section'); // get all the sections
const revealSection = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return; // check if the entry is not intersecting
    entry.target.classList.remove('section--hidden'); // remove the hidden class from the section element
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, // use the viewport as the root element
  threshold: 0.15, // when 15% of the target is visible
}); // create a new intersection observer

allSections.forEach(function (section) {
  sectionObserver.observe(section); // observe the section element
  section.classList.add('section--hidden'); // add the hidden class to the section element
}); //observe the section element

// lazy loading images

const allFeatureImages = document.querySelectorAll('.features__img');

const loadImg = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return; // check if the entry is not intersecting
    //dataset  data-src is used to get the data-src attribute of the image element
    entry.target.src = entry.target.dataset.src; // set the src attribute of the image element to the data-src attribute
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img'); // remove the lazy-img class from the image element
    });
    observer.unobserve(entry.target); // unobserve the image element
  });
};

const featureObserver = new IntersectionObserver(loadImg, {
  root: null, // use the viewport as the root element
  threshold: 0, // when 0% of the target is visible
  rootMargin: '200px', // set the root margin to 200px
});

allFeatureImages.forEach(function (img) {
  featureObserver.observe(img); // observe the image element
}); // observe the image element

const silder = document.querySelector('.slider'); // get the slider element
// translate slider
const sliderbtnleft = document.querySelector('.slider__btn--left'); // get all the slides
const sliderbtnright = document.querySelector('.slider__btn--right'); // get all the slides
const allSlide = document.querySelectorAll('.slide'); // get the slider element

let currentSlide = 0; // set the current slide to 0
const maxSlide = allSlide.length;

//dot
const dotContainer = document.querySelector('.dots'); // get the dots element

const createDots = function () {
  allSlide.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    ); // create a new button element and insert it into the dots element
  });
};
const updateDot = function (silder) {
  const dots = document.querySelectorAll('.dots__dot'); // get all the dots
  dots.forEach(dot => dot.classList.remove('dots__dot--active')); // remove the active class from all other dots
  dots[silder].classList.add('dots__dot--active'); // add the active class to the clicked element
};
createDots();
goToSlide(0);
updateDot(0); // set the active dot to the first dot
const MoveSlide = function () {
  if (this === 1) {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0; // set the current slide to 0
    } else {
      currentSlide += this; // increment the current slide by 1
    }
  } else if (this === -1) {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1; // set the current slide to the last slide
    } else {
      currentSlide += this; // decrement the current slide by 1
    }
  }
  updateDot(currentSlide); // set the active dot
  goToSlide(currentSlide);
};

sliderbtnleft.addEventListener('click', MoveSlide.bind(1)); // add event listener to the left button

sliderbtnright.addEventListener('click', MoveSlide.bind(-1));

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') {
    MoveSlide.call(1); // call the MoveSlide function with the value of 1
  } else if (e.key === 'ArrowLeft') {
    MoveSlide.call(-1); // call the MoveSlide function with the value of -1
  }
}); // add event listener to the document element

function goToSlide(slide) {
  allSlide.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%) `;
  });
}

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset; // get the dataset of the target element
    console.log(slide); // log the slide number
    updateDot(slide); // set the active dot
    goToSlide(slide); // go to the slide
  }
});
///test

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML =
//   'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
// console.log(header); // log the message element
// header.prepend(message); // prepend to the header
// header.append(message);

// remove element after 3 seconds
// setTimeout(() => {
//   message.remove();
// }, 3000);

//styles

// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// console.log(getComputedStyle(message).height); // get the height of the message element

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height) + 40 + 'px'; // get the height of the message element and add 30px to it

// document.documentElement.style.setProperty('--color-primary', 'orangered'); // set the primary color to orangered

// //attribute

// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt); // log the alt attribute of the logo element
// console.log(logo.src); // log the src attribute of the logo element
// console.log(logo.className);
