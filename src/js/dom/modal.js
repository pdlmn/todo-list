import { eventsHandler } from "../eventsHandler.js";

const modal = document.querySelector('.modal');
const sendTodoButton = document.querySelector('#send-todo');
const cancelModalButton = document.querySelector('#cancel-modal');
const closeModalButton = document.querySelector('.close-button');

eventsHandler.on('modalActivated', displayModal);
modal.addEventListener('click', e => hideModalIfClickedOutside(e));
closeModalButton.addEventListener('click', hideModal);

sendTodoButton.addEventListener('click', e => {
  e.preventDefault();
  hideModal();
});

cancelModalButton.addEventListener('click', e => {
  e.preventDefault();
  hideModal();
});

function displayModal() {
  modal.classList.remove('invisible');
}

function hideModal() {
  modal.classList.add('invisible');
}

function hideModalIfClickedOutside(e) {
  if (e.target.classList.contains('modal')) {
    hideModal();
  }
}

function gainTodoFromForm() {
  const nameInput = document.querySelector('#name');
  const dueDateInput = document.querySelector('#due-date');
  const tagsInput = document.querySelector('#tags');
  const notesInput = document.querySelector('#notes');
  const priorityInput = document.querySelector('#priority');
}
