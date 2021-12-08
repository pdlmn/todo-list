import { eventsHandler } from "../eventsHandler.js";


const todosList = document.querySelector('#todos');
const addTodoButton = document.querySelector('#add-todo');
const clearDoneButton = document.querySelector('#clear-done');
let listH2 = document.querySelector('.todos-wrapper h2');

eventsHandler.on('homeTabSelected', todos => {
  listH2.textContent = 'Home';
});

eventsHandler.on('todayTabSelected', todos => {
  listH2.textContent = 'Today';
});

eventsHandler.on('completedTabSelected', todos => {
  listH2.textContent = 'Completed';
});

eventsHandler.on('projectTabSelected', project => {
  listH2.textContent = project.name;
});

addTodoButton.addEventListener('click', () => {
  eventsHandler.trigger('modalActivated');
});

function createTodo(todo) {
  const todoWrapper = document.createElement('div');

  const todoLine = document.createElement('div');
  const checkboxWrapper = document.createElement('div');
  const checkbox = document.createElement('input');
  const label = document.createElement('label');

  todoWrapper.classList.add('flex-column');

  todoLine.classList.add('todo', `priority-${todo.priority}`);

  checkbox.type = 'checkbox';
  label.htmlFor = `todo${todo.id}`;
  
  checkbox.id = `todo${todo.id}`;

  label.textContent = todo.name;

  return todoWrapper
}

function renderTodos() {

}
