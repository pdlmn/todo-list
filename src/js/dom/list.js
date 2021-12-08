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

eventsHandler.on('todoAdded', data => {
  console.log(`TODO DATA:`);
  console.log(data.todo);
  createTodo(data.todo);
})

addTodoButton.addEventListener('click', () => {
  eventsHandler.trigger('modalActivated');
});

createTodo({name: 'heh', priority: 'm', id: 2});

function createTodo(todo) {
  const todoWrapper = document.createElement('div');


  console.log(createTodoLine(todo));
  todoWrapper.append(createTodoLine(todo));

  todosList.append(todoWrapper);

  todoWrapper.classList.add('flex-column');

  return todoWrapper
}

function createTodoLine(todo) {
  const todoLine = document.createElement('div');
  const checkboxWrapper = document.createElement('div');
  const checkbox = document.createElement('input');
  const label = document.createElement('label');

  const buttonsWrapper = document.createElement('div');
  const descriptionButton = document.createElement('button');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const descriptionIcon = document.createElement('span');
  const editIcon = document.createElement('span');
  const deleteIcon = document.createElement('span');

  todoLine.classList.add('todo', `priority-${todo.priority}`);
  buttonsWrapper.classList.add('todo-buttons');
  [descriptionButton, editButton, deleteButton]
    .forEach(button => button.classList.add('todo-icon'));
  [descriptionIcon, editIcon, deleteIcon]
    .forEach(icon => icon.classList.add('iconify'));

  descriptionIcon.dataset.icon = "ic:round-description";
  editIcon.dataset.icon = "bx:bx-edit";
  deleteIcon.dataset.icon = "fluent:delete-24-filled";

  checkbox.type = 'checkbox';
  label.htmlFor = `todo${todo.id}`;
  
  checkbox.id = `todo${todo.id}`;

  label.textContent = todo.name;

  descriptionButton.append(descriptionIcon);
  editButton.append(editIcon);
  deleteButton.append(deleteIcon);
  buttonsWrapper.append(descriptionButton, editButton, deleteButton);

  checkboxWrapper.append(checkbox, label);
  todoLine.append(checkboxWrapper, buttonsWrapper);

  return todoLine
}

function renderTodos() {

}
