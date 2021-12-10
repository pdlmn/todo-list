import { eventsHandler } from "../eventsHandler.js";
import { formatDate } from "../utils.js";

const modal = document.querySelector('.modal');
const sendTodoButton = document.querySelector('#send-todo');
const cancelModalButton = document.querySelector('#cancel-modal');
const closeModalButton = document.querySelector('.close-button');

const nameInput = document.querySelector('#name');
const dueDateInput = document.querySelector('#due-date');
const tagsInput = document.querySelector('#tags');
const notesInput = document.querySelector('#notes');
const priorityInput = document.querySelector('#priority');

modal.addEventListener('click', e => hideModalIfClickedOutside(e));
closeModalButton.addEventListener('click', hideModal);
eventsHandler.on('modalActivated', displayModal);
eventsHandler.on('editButtonClicked', editTodo);

sendTodoButton.addEventListener('click', e => {
  e.preventDefault();
  eventsHandler.trigger('todoInputed', gainTodoDataFromForm());
  // clearInputs();
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

function gainTodoDataFromForm() {
  const name = nameInput.value;
  const dueDate = new Date(dueDateInput.value);
  const tags = tagsInput.value.split(' ');
  const notes = notesInput.value.split('\n');
  const priority = priorityInput.value;

  return { name, dueDate, tags, notes, priority }
}

function clearInputs() {
  nameInput.value = '';
  dueDateInput.value = '';
  tagsInput.value = '';
  notesInput.value = '';
  priorityInput.value = '';
}

function editTodo(todo) {
  displayModal();
  nameInput.value = todo.name;
  dueDateInput.value = formatDate(todo.dueDate); 
  tagsInput.value = todo.tags.join(' ');
  notesInput.value = todo.notes.join('\n');
  priorityInput.value = todo.priority;
}

console.log(gainTodoDataFromForm());
