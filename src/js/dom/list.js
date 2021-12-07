import { eventsHandler } from "../eventsHandler.js";


const addTodoButton = document.querySelector('#add-todo');
const clearDoneButton = document.querySelector('#clear-done');

addTodoButton.addEventListener('click', () => {
  eventsHandler.trigger('modalActivated');
});

function renderTodos() {

}
