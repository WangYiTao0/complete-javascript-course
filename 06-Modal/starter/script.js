'use strict';

const modalElement = document.querySelector('.modal');
const closeModalElement = document.querySelector('.close-modal');
const showModalBtns = document.querySelectorAll('.show-modal');
const overlayElement = document.querySelector('.overlay');

// hidden class is used to hide the modal and overlay elements

function showModal() {
  //   modalElement.style.display = 'block';
  //   overlayElement.style.display = 'block';
  modalElement.classList.remove('hidden');
  overlayElement.classList.remove('hidden');
}

function closeModal() {
  //   modalElement.style.display = 'none';
  //   overlayElement.style.display = 'none';
  modalElement.classList.add('hidden');
  overlayElement.classList.add('hidden');
}

showModalBtns.forEach(modal => {
  modal.addEventListener('click', showModal);
});
closeModalElement.addEventListener('click', closeModal);
overlayElement.addEventListener('click', closeModal);
// handle keyboard events
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalElement.classList.contains('hidden')) {
    closeModal();
  }
});
