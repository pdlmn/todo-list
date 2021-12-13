import { eventsHandler } from "../eventsHandler.js";
import { formatDate } from "../utils.js";

const todosList = document.querySelector('#todos');
const addTodoButton = document.querySelector('#add-todo');
const clearDoneButton = document.querySelector('#clear-done');
let listH2 = document.querySelector('.todos-wrapper h2');

(() => {
  eventsHandler.on('allTabSelected', todos => {
    listH2.textContent = 'All';
    todosList.innerHTML = '';
    renderTodos(todos);
  });

  eventsHandler.on('pendingTabSelected', todos => {
    listH2.textContent = 'Pending';
    todosList.innerHTML = '';
    renderTodos(todos);
  });

  eventsHandler.on('todayTabSelected', todos => {
    listH2.textContent = 'Today';
    todosList.innerHTML = '';
    renderTodos(todos);
  });

  eventsHandler.on('completedTabSelected', todos => {
    listH2.textContent = 'Completed';
    todosList.innerHTML = '';
    renderTodos(todos);
  });

  eventsHandler.on('projectTabSelected', project => {
    listH2.textContent = project.name;
    todosList.innerHTML = '';
    renderTodos(project.todos);
  });

  eventsHandler.on('todoAdded', todo => {
    todosList.append(createTodo(todo));
  });

  eventsHandler.on('todoEdited', todo => {
    const oldTodo = document.querySelector(`[data-todo="todo${todo.id}"]`);
    const newTodo = createTodo(todo);
    keepDescriptionVisibility(oldTodo, newTodo);

    oldTodo.after(newTodo);
    oldTodo.remove();
  });

  eventsHandler.on('todoDeleted', todo => {
    document.querySelector(`[data-todo="todo${todo.id}"]`).remove();
  });

  addTodoButton.addEventListener('click', () => {
    eventsHandler.trigger('modalActivated');
  });

  clearDoneButton.addEventListener('click', () =>{
    const doneTodosOnScreen = document.querySelectorAll('.todo-checked');
    const todosIds = [];
    doneTodosOnScreen.forEach(todo => {
      todosIds.push(todo.querySelector('input').id.slice(4));
      todo.parentNode.parentNode.remove();
    });
    eventsHandler.trigger('clearDoneClicked', todosIds); 
  });
})();

function createTodo(todo) {
  const todoWrapper = document.createElement('div');
  todoWrapper.append(createTodoLine(todo), createTodoDetails(todo));
  todoWrapper.classList.add('flex-column');
  todoWrapper.dataset.todo = `todo${todo.id}`;

  return todoWrapper
}

function createTodoLine(todo) {
  const todoLine = document.createElement('div');
  const checkboxWrapper = document.createElement('div');
  const checkbox = document.createElement('input');
  const label = document.createElement('label');

  const buttonsWrapper = document.createElement('div');
  const detailsButton = document.createElement('button');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const detailsIcon = document.createElement('span');
  const editIcon = document.createElement('span');
  const deleteIcon = document.createElement('span');

  if (todo.status === 'completed') {
    checkboxWrapper.classList.add('todo-checked');
    checkbox.checked = true;
  }
  checkboxWrapper.classList.add('no-user-select');
  todoLine.classList.add('todo', `priority-${todo.priority}`);
  buttonsWrapper.classList.add('todo-buttons');
  [detailsButton, editButton, deleteButton]
    .forEach(button => button.classList.add('todo-icon'));
  [detailsIcon, editIcon, deleteIcon]
    .forEach(icon => icon.classList.add('iconify'));

  detailsIcon.dataset.icon = "ic:round-description";
  editIcon.dataset.icon = "bx:bx-edit";
  deleteIcon.dataset.icon = "fluent:delete-24-filled";

  checkbox.addEventListener('change', () => {
    eventsHandler.trigger('todoToggled', todo.id);
    checkboxWrapper.classList.toggle('todo-checked');
  });

  detailsButton.addEventListener('click', () => {
    document.querySelector(`#details${todo.id}`)
      .classList.toggle('invisible');
  });

  editButton.addEventListener('click', () => {
    eventsHandler.trigger('editButtonClicked', todo);
  });

  deleteButton.addEventListener('click', () => {
    eventsHandler.trigger('deleteButtonClicked', todo);
  });

  checkbox.type = 'checkbox';
  label.htmlFor = `todo${todo.id}`;

  checkbox.id = `todo${todo.id}`;

  label.textContent = todo.name;

  detailsButton.append(detailsIcon);
  editButton.append(editIcon);
  deleteButton.append(deleteIcon);
  buttonsWrapper.append(detailsButton, editButton, deleteButton);

  checkboxWrapper.append(checkbox, label);
  todoLine.append(checkboxWrapper, buttonsWrapper);

  return todoLine
}

function createTodoDetails(todo) {
  const detailsWrapper = document.createElement('div');
  const detailsHeader = document.createElement('div');
  const dueDateDiv = document.createElement('div');
  const tagsDiv = document.createElement('div');
  const notesList = document.createElement('ul');

  detailsWrapper.classList.add('details', 'invisible');
  detailsHeader.classList.add('details-header');
  tagsDiv.classList.add('tags');

  dueDateDiv.textContent = `Due date: ${formatDate(todo.dueDate)}`;
  tagsDiv.textContent = formatTags(todo.tags);

  detailsWrapper.id = `details${todo.id}`;

  notesList.append(...formatNotes(todo.notes));
  detailsHeader.append(dueDateDiv, tagsDiv);
  detailsWrapper.append(detailsHeader, notesList);

  return detailsWrapper
}

function formatTags(tags) {
  if (!tags[0]) return

  let formattedTags = '';
  for (let tag of tags) {
    formattedTags += `#${tag} `
  }
  return formattedTags
}

function formatNotes(notes) {
  if (!notes[0]) return `No notes`

  const formattedNotes = [];
  for (let note of notes) {
    const listItem = document.createElement('li');
    listItem.textContent = note;
    formattedNotes.push(listItem);
  }
  return formattedNotes
}

function keepDescriptionVisibility(oldTodo, newTodo) {
  const newDescription = newTodo.querySelector('.details');
  const oldDescription = oldTodo.querySelector('.details');
  if (!oldDescription.classList.contains('invisible')) newDescription.classList.remove('invisible');
}

function renderTodos(todos) {
  for (let todo of todos) {
    todosList.append(createTodo(todo));
  }
}

