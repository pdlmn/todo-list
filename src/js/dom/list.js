import { eventsHandler } from "../eventsHandler.js";
import { formatDate } from "../utils.js";


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
  todosList.append(createTodo(data.todo));
});

eventsHandler.on('todoEdited', data => {
  const oldTodo = document.querySelector(`[data-todo="todo${data.todo.id}"]`);
  const newTodo = createTodo(data.todo);
  keepDescriptionVisibility(oldTodo, newTodo);

  oldTodo.after(newTodo);
  oldTodo.remove();
});

addTodoButton.addEventListener('click', () => {
  eventsHandler.trigger('modalActivated');
});

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

  todoLine.classList.add('todo', `priority-${todo.priority}`);
  buttonsWrapper.classList.add('todo-buttons');
  [detailsButton, editButton, deleteButton]
    .forEach(button => button.classList.add('todo-icon'));
  [detailsIcon, editIcon, deleteIcon]
    .forEach(icon => icon.classList.add('iconify'));

  detailsIcon.dataset.icon = "ic:round-description";
  editIcon.dataset.icon = "bx:bx-edit";
  deleteIcon.dataset.icon = "fluent:delete-24-filled";

  detailsButton.addEventListener('click', () => {
    document.querySelector(`#details${todo.id}`)
      .classList.toggle('invisible');
  });

  editButton.addEventListener('click', () => {
    eventsHandler.trigger('editButtonClicked', todo);
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

function renderTodos() {

}
