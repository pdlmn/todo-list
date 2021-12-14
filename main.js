/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./css/style.css":
/*!***********************!*\
  !*** ./css/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./js/dom/list.js":
/*!************************!*\
  !*** ./js/dom/list.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../eventsHandler.js */ "./js/eventsHandler.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./js/utils.js");



const todosList = document.querySelector('#todos');
const addTodoButton = document.querySelector('#add-todo');
const clearDoneButton = document.querySelector('#clear-done');
let listH2 = document.querySelector('.todos-wrapper h2');

(() => {
  _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on('allTabSelected', todos => {
    listH2.textContent = 'All';
    todosList.innerHTML = '';
    renderTodos(todos);
  });

  _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on('pendingTabSelected', todos => {
    listH2.textContent = 'Pending';
    todosList.innerHTML = '';
    renderTodos(todos);
  });

  _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on('todayTabSelected', todos => {
    listH2.textContent = 'Today';
    todosList.innerHTML = '';
    renderTodos(todos);
  });

  _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on('completedTabSelected', todos => {
    listH2.textContent = 'Completed';
    todosList.innerHTML = '';
    renderTodos(todos);
  });

  _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on('projectTabSelected', project => {
    listH2.textContent = project.name;
    todosList.innerHTML = '';
    renderTodos(project.todos);
  });

  _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on('todoAdded', todo => {
    todosList.prepend(createTodo(todo));
  });

  _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on('todoEdited', todo => {
    const oldTodo = document.querySelector(`[data-todo="todo${todo.id}"]`);
    const newTodo = createTodo(todo);
    keepDescriptionVisibility(oldTodo, newTodo);

    oldTodo.after(newTodo);
    oldTodo.remove();
  });

  _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on('todoDeleted', todo => {
    document.querySelector(`[data-todo="todo${todo.id}"]`).remove();
  });

  addTodoButton.addEventListener('click', () => {
    _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('modalActivated');
  });

  clearDoneButton.addEventListener('click', () =>{
    const doneTodosOnScreen = document.querySelectorAll('.todo-checked');
    const todosIds = [];
    doneTodosOnScreen.forEach(todo => {
      todosIds.push(todo.querySelector('input').id.slice(4));
      todo.parentNode.parentNode.remove();
    });
    _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('clearDoneClicked', todosIds); 
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
    _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('todoToggled', todo.id);
    checkboxWrapper.classList.toggle('todo-checked');
  });

  detailsButton.addEventListener('click', () => {
    document.querySelector(`#details${todo.id}`)
      .classList.toggle('invisible');
  });

  editButton.addEventListener('click', () => {
    _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('editButtonClicked', todo);
  });

  deleteButton.addEventListener('click', () => {
    _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('deleteButtonClicked', todo);
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

  dueDateDiv.textContent = `Due date: ${(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.formatDate)(todo.dueDate)}`;
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



/***/ }),

/***/ "./js/dom/modal.js":
/*!*************************!*\
  !*** ./js/dom/modal.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../eventsHandler.js */ "./js/eventsHandler.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./js/utils.js");



const modal = document.querySelector('.modal');
const sendTodoButton = document.querySelector('#send-todo');
const cancelModalButton = document.querySelector('#cancel-modal');
const closeModalButton = document.querySelector('.close-button');

const nameInput = document.querySelector('#name');
const dueDateInput = document.querySelector('#due-date');
const tagsInput = document.querySelector('#tags');
const notesInput = document.querySelector('#notes');
const priorityInput = document.querySelector('#priority');

(() => {
  modal.addEventListener('click', e => hideModalIfClickedOutside(e));
  closeModalButton.addEventListener('click', hideModal);
  _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on('modalActivated', displayModal);
  _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on('editButtonClicked', editTodo);

  sendTodoButton.addEventListener('click', e => {
    e.preventDefault();
    _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('todoInputed', gainTodoDataFromForm());
    // clearInputs();
    hideModal();
  });

  cancelModalButton.addEventListener('click', e => {
    e.preventDefault();
    hideModal();
  });
})();

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
  dueDateInput.value = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.formatDate)(todo.dueDate); 
  tagsInput.value = todo.tags.join(' ');
  notesInput.value = todo.notes.join('\n');
  priorityInput.value = todo.priority;
}

console.log(gainTodoDataFromForm());


/***/ }),

/***/ "./js/dom/sidebar.js":
/*!***************************!*\
  !*** ./js/dom/sidebar.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../eventsHandler.js */ "./js/eventsHandler.js");


const projectsList = document.querySelector('#projects');
const createProjectButton = document.querySelector('#create-project');

const tabs = document.querySelectorAll('.list');
const all = document.querySelector('#all');
const pending = document.querySelector('#pending');
const today = document.querySelector('#today');
const completed = document.querySelector('#completed');

(() => {
  window.addEventListener('click', destroyInputDivIfClickedOutside);
  createProjectButton.addEventListener('click', createProjectInput);

  _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on('projectsParsed', projects => {
    for (let i = 1, l = projects.length; i < l; i++) {
      createProjectTab(projects[i]);
    }
  });

  _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on('projectAdded', createProjectTab);
  _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on('projectDeleted', deleteProjectTab);
  _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on('todosChanged', changeStatusNumber);

  tabs.forEach(project => {
    project.addEventListener('click', selectTab);
  })

  all.addEventListener('click', () => {
    _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('allTabClicked');
  })

  pending.addEventListener('click', () => {
    _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('allTabClicked');
  });

  pending.addEventListener('click', () => {
    _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('pendingTabClicked');
  });

  today.addEventListener('click', () => {
    _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('todayTabClicked');
  });

  completed.addEventListener('click', () => {
    _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('completedTabClicked');
  });
})();


function createProjectTab(project) {
  const liWrapper = document.createElement('li');
  const nameDiv = document.createElement('div');
  const statusDiv = document.createElement('div');
  const deleteButton = document.createElement('button');
  const deleteButtonIcon = document.createElement('span');
  const statusCircleDiv = document.createElement('div');
  const statusNumberDiv = document.createElement('div');

  liWrapper.classList.add('list');
  statusDiv.classList.add('list-status');
  deleteButton.classList.add('delete-project-button');
  deleteButtonIcon.classList.add('iconify');
  statusCircleDiv.classList.add('list-status-circle', 'project');
  statusNumberDiv.classList.add('list-status-number');

  liWrapper.dataset.project = project.id;
  deleteButtonIcon.dataset.icon = "fluent:delete-24-filled";

  nameDiv.textContent = project.name;
  statusNumberDiv.textContent = project.todos.length;

  liWrapper.addEventListener('click', selectTab);
  liWrapper.addEventListener('click', e => {
    if (e.target.classList.contains('delete-project-button')) return
    _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('projectTabClicked', liWrapper.dataset.project);
  });
  deleteButton.addEventListener('click', () => { 
    _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('projectDeleted', project.id)
  });

  deleteButton.append(deleteButtonIcon);
  statusDiv.append(deleteButton, statusCircleDiv, statusNumberDiv);
  liWrapper.append(nameDiv, statusDiv);

  projectsList.append(liWrapper);

  return liWrapper
}

function deleteProjectTab(id) {
  const projectTab = document.querySelector(`[data-project="${id}"]`)
  projectTab.remove();
}

function createProjectInput() {
  const inputDiv = document.createElement('div');
  const input = document.createElement('input');
  const inputButton = document.createElement('button');

  inputDiv.classList.add('flex-row');
  input.classList.add('create-project-input');
  inputButton.classList.add('project-input-button');

  inputDiv.dataset.type = 'input-div';

  inputButton.textContent = '+';
  inputButton.addEventListener('click', () => {
    _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('projectInputed', input.value);
    inputDiv.remove();
  });

  inputDiv.append(input, inputButton);

  createProjectButton.before(inputDiv);
  input.focus();

  return inputDiv
}

function destroyInputDivIfClickedOutside(e) {
  if (e.target.parentNode.dataset.type === 'input-div' ||
      e.target.id === 'create-project') {
    return
  }
  document.querySelectorAll('[data-type=input-div]')
    .forEach(el => el.remove());
}

function selectTab() {
  document.querySelectorAll('.list')
    .forEach(project => project.classList.remove('active'));
  this.classList.add('active');
}

function changeStatusNumber(lengthObject) {
  const projects = document.querySelectorAll('[data-project]');

  all.querySelector('.list-status-number').textContent = lengthObject.allLength;
  pending.querySelector('.list-status-number').textContent = lengthObject.pendingLength;
  today.querySelector('.list-status-number').textContent = lengthObject.todayLength;
  completed.querySelector('.list-status-number').textContent = lengthObject.completedLength;

  projects.forEach(project => {
    project.querySelector('.list-status-number').textContent = lengthObject[project.dataset.project];
  });
}


/***/ }),

/***/ "./js/eventsHandler.js":
/*!*****************************!*\
  !*** ./js/eventsHandler.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eventsHandler": () => (/* binding */ eventsHandler)
/* harmony export */ });
const eventsHandler = (() => {
  let events = {};

  return {

    on(eventName, fn) {
      events[eventName] = events[eventName] || [];
      events[eventName].push(fn);
    },

    off(eventName, removedFn) {
      if (events[eventName]) {
        events[eventName] = events[eventName].filter(fn => fn !== removedFn);
      }
    },

    trigger(eventName, data) {
      if (events[eventName]) {
        events[eventName].forEach(fn => {
          fn(data);
        });
      }
    }

  }
})();


/***/ }),

/***/ "./js/storage.js":
/*!***********************!*\
  !*** ./js/storage.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _eventsHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventsHandler */ "./js/eventsHandler.js");


(() => {
  const parsedProjects = parseLocalStorage('projects') || [];

  _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('appStarted', convertDatesToDateObjects(parsedProjects));

  _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on('todoListChanged', projects => {
    saveToLocalStorage('projects', projects);
    console.log(localStorage.getItem('projects'));
  });
})();

function saveToLocalStorage(key, obj) {
  const stringifiedObject = JSON.stringify(obj);
  localStorage.setItem(key, stringifiedObject);
}

function parseLocalStorage(key) {
  const stringifiedObject = localStorage.getItem(key);
  const parsedObject = JSON.parse(stringifiedObject);
  return parsedObject
}

function convertDatesToDateObjects(parsedProjects) {
  parsedProjects.forEach(project => {
    project.todos.forEach(todo => todo.dueDate = (todo.dueDate) ? new Date(todo.dueDate) : new Date(undefined));
  });
  return parsedProjects
}


/***/ }),

/***/ "./js/todo.js":
/*!********************!*\
  !*** ./js/todo.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _eventsHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventsHandler */ "./js/eventsHandler.js");


const todoList = (() => {
  let projects = [
    {
      name: 'default todo list',
      todos: [],
      id: 1
    }
  ]

  function _giveIdToItem(arr) {
    const arrSortedById = [...arr].sort((item1, item2) => item1.id - item2.id);
    const lastItem = arrSortedById[arrSortedById.length - 1];
    if (lastItem) return lastItem.id + 1
    return 1
  }

  function _findProjectById(id) {
    return projects.find(project => project.id === Number(id));
  }

  function _findTodoById(id) {
    for (const project of projects) {
      for (const todo of project.todos) {
        if (todo.id === id) return todo
      }
    }
  }

  function _pendingOfProject(id) {
    return _sortTodos(
      _findProjectById(id).todos
      .filter(todo => todo.status === 'pending')
    )
  }

  function _findLengthsOfProjects() {
    const projectsLengths = {}
    for (let i = 0, l = projects.length; i < l; ++i) {
      const id = projects[i].id;
      projectsLengths[id] = _findProjectById(id).todos.filter(todo => todo.status === 'pending').length;
    }
    const staticTabsLengths = {
      allLength: todoList.todos.length,
      pendingLength: todoList.pending.length,
      todayLength: todoList.today.length,
      completedLength: todoList.completed.length,
    }
    return Object.assign(
      projectsLengths,
      staticTabsLengths
    )
  }

  function _sortTodos(todos) {
    return [...todos].sort((todo1, todo2) => todo1.dueDate - todo2.dueDate)
      .sort((todo1, todo2) => todo1.priority - todo2.priority)
      .sort((todo1, todo2) => todo1.status === 'completed' ? 1 : -1)
  }

  return {
    addTodo({name, dueDate, tags, notes, priority, projectId = 1}) {
      const status = 'pending';
      const id = _giveIdToItem(todoList.todos);
      const todo =  { name, dueDate, tags, notes, priority, status, id, projectId };
      const project = _findProjectById(projectId);
      if (!project) return 
      project.todos.push(todo);
      return todo
    },

    getTodo(id) {
      return _findTodoById(id)
    },

    removeTodo(id) {
      projects.forEach(project => {
        project.todos = project.todos.filter(todo => todo.id !== Number(id));
      });
    },

    toggleTodo(id) {
      const todo = _findTodoById(id);
      if (!todo) return
      todo.status = (todo.status === 'pending') ? 'completed' : 'pending';
    },

    addProject(name) {
      const todos = [];
      const id = _giveIdToItem(projects);
      const project = { name, todos, id }
      projects.push(project);
      return project
    },

    getProject(id) {
      const project = _findProjectById(id);
      const todos = _sortTodos(project.todos)
      return {...project, todos}
    },

    removeProject(id) {
      // can't remove default project
      if (Number(id) === 1) return
      projects = projects.filter(project => project.id !== Number(id));
    },

    get lengths() {
      return _findLengthsOfProjects()
    },

    get todos() {
      let todos = [];
      for (const project of projects) {
        todos = todos.concat(project.todos);
      }
      return _sortTodos(todos)
    },

    get projects() { return projects },
    set projects(val) { projects = val },

    get pending() {
      return _sortTodos(this.todos.filter(todo => todo.status === 'pending'));
    },

    get completed() {
      return _sortTodos(this.todos.filter(todo => todo.status === 'completed'));
    },

    get today() {
      const today = new Date();
      return _sortTodos(this.todos.filter(todo => {
        return (
          todo.dueDate.getDate() === today.getDate() &&
          todo.dueDate.getMonth() === today.getMonth() &&
          todo.dueDate.getFullYear() === today.getFullYear() &&
          todo.status === 'pending'
        )
      }));
    },

    currentProject: 1,
    editedTodo: -1,
    mode: 'addingTodo'
  }
})();

(() => {
  _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on('appStarted', parsedProjects => {
    if (parsedProjects.length > 0) {
      todoList.projects = parsedProjects;
    } else { 
      createExampleTodos();
    }
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('allTabSelected', todoList.todos);
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('projectsParsed', todoList.projects);
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('todosChanged', todoList.lengths);
  });

  _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on('allTabClicked', () => {
    todoList.currentProject = 1;
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('allTabSelected', todoList.todos);
  });

  _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on('pendingTabClicked', () => {
    todoList.currentProject = 1;
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('pendingTabSelected', todoList.pending);
  });

  _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on('todayTabClicked', () => {
    todoList.currentProject = 1;
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('todayTabSelected', todoList.today);
  });

  _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on('completedTabClicked', () => {
    todoList.currentProject = 1;
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('completedTabSelected', todoList.completed);
  });

  _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on('projectTabClicked', projectId => {
    const project = todoList.getProject(projectId);
    todoList.currentProject = projectId;
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('projectTabSelected', project);
  });

  _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on('projectInputed', name => {
    const project = todoList.addProject(name);
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('projectAdded', project);
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('todoListChanged', todoList.projects);
  });

  _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on('projectDeleted', projectId => {
    todoList.removeProject(projectId);
    if (projectId === todoList.currentProject) {
      _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('allTabSelected');
    } 
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('todoListChanged', todoList.projects);
  });

  _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on('todoInputed', todoData => {
    if (todoList.mode === 'editingTodo') {
      const todo = todoList.getTodo(todoList.editedTodo);
      todo.name = todoData.name;
      todo.dueDate = todoData.dueDate;
      todo.tags = todoData.tags;
      todo.notes = todoData.notes;
      todo.priority = todoData.priority;
      _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('todoEdited', todo);
    }
    if (todoList.mode === 'addingTodo') {
      const todo = todoList.addTodo({...todoData, projectId: todoList.currentProject});
      _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('todoAdded', todo);
    }
    todoList.mode = 'addingTodo';
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('todosChanged', todoList.lengths);
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('todoListChanged', todoList.projects);
  });

  _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on('todoToggled', todoId => {
    todoList.toggleTodo(todoId);
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('todosChanged', todoList.lengths);
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('todoListChanged', todoList.projects);
  });

  _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on('editButtonClicked', todo => {
    todoList.mode = 'editingTodo';
    todoList.editedTodo = todo.id;
  });

  _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on('deleteButtonClicked', todo => {
    todoList.removeTodo(todo.id);
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('todoDeleted', todo);
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('todosChanged', todoList.lengths);
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('todoListChanged', todoList.projects);
  });

  _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on('clearDoneClicked', todosIds => {
    for (const id of todosIds) {
      todoList.removeTodo(id);
    }
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('todosChanged', todoList.lengths);
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('todoListChanged', todoList.projects);
  });

  function createExampleTodos() {
    todoList.addTodo({name: 'Take dog for a walk', dueDate: new Date('2021-12-14'), tags: ['doggo', 'health'], notes: [''], priority: 1});
    todoList.addTodo({name: 'Buy milk', dueDate: new Date(undefined), tags: ['groceries'], notes: [''], priority: 3});
    todoList.addTodo({name: 'Go to cinema with Josh', dueDate: new Date('2021-12-16'), tags: ['josh', 'relax'], notes: ['visit Anne on our way home'], priority: 2});
    todoList.addTodo({name: 'Visit dentist', dueDate: new Date('2021-12-18'), tags: ['health'], notes: ['17:00', 'not eating before going to dentist'], priority: 1});
    todoList.addTodo({name: 'Visit new candy shop', dueDate: new Date(undefined), tags: [''], notes: [''], priority: 3});
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger('todoListChanged', todoList.projects);
  }
})();


/***/ }),

/***/ "./js/utils.js":
/*!*********************!*\
  !*** ./js/utils.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatDate": () => (/* binding */ formatDate)
/* harmony export */ });
function formatDate(date) {
  if (isNaN(date.getTime())) return `No due date`

  const yyyy = date.getFullYear();
  const mm = (date.getMonth() + 1).toString().padStart(2, '0');
  const dd = date.getDate().toString().padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/style.css */ "./css/style.css");
/* harmony import */ var _js_todo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/todo.js */ "./js/todo.js");
/* harmony import */ var _js_eventsHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/eventsHandler */ "./js/eventsHandler.js");
/* harmony import */ var _js_dom_sidebar_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/dom/sidebar.js */ "./js/dom/sidebar.js");
/* harmony import */ var _js_dom_modal_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/dom/modal.js */ "./js/dom/modal.js");
/* harmony import */ var _js_dom_list_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/dom/list.js */ "./js/dom/list.js");
/* harmony import */ var _js_storage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./js/storage */ "./js/storage.js");









})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QXFCO0FBQ3pCLEdBQUc7O0FBRUgsRUFBRSw0REFBZ0I7QUFDbEI7QUFDQTtBQUNBLEdBQUc7O0FBRUgsRUFBRSw0REFBZ0I7QUFDbEI7QUFDQSxJQUFJLGlFQUFxQjtBQUN6QixJQUFJLGlFQUFxQjtBQUN6QixJQUFJLGlFQUFxQjtBQUN6QixHQUFHOztBQUVILEVBQUUsNERBQWdCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLElBQUksaUVBQXFCO0FBQ3pCLElBQUksaUVBQXFCO0FBQ3pCLEdBQUc7O0FBRUg7QUFDQSxzQkFBc0Isa0hBQWtIO0FBQ3hJLHNCQUFzQiw4RkFBOEY7QUFDcEgsc0JBQXNCLDZJQUE2STtBQUNuSyxzQkFBc0IsOElBQThJO0FBQ3BLLHNCQUFzQixpR0FBaUc7QUFDdkgsSUFBSSxpRUFBcUI7QUFDekI7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUM5UEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsWUFBWSxLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUc7QUFDN0I7O0FBSUM7Ozs7Ozs7VUNaRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnlCO0FBQ0g7QUFDTTtBQUNDO0FBQ0Y7QUFDRDtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vY3NzL3N0eWxlLmNzcz85MzA2Iiwid2VicGFjazovLy8uL2pzL2RvbS9saXN0LmpzIiwid2VicGFjazovLy8uL2pzL2RvbS9tb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9kb20vc2lkZWJhci5qcyIsIndlYnBhY2s6Ly8vLi9qcy9ldmVudHNIYW5kbGVyLmpzIiwid2VicGFjazovLy8uL2pzL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vanMvdG9kby5qcyIsIndlYnBhY2s6Ly8vLi9qcy91dGlscy5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgeyBldmVudHNIYW5kbGVyIH0gZnJvbSBcIi4uL2V2ZW50c0hhbmRsZXIuanNcIjtcbmltcG9ydCB7IGZvcm1hdERhdGUgfSBmcm9tIFwiLi4vdXRpbHMuanNcIjtcblxuY29uc3QgdG9kb3NMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZG9zJyk7XG5jb25zdCBhZGRUb2RvQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10b2RvJyk7XG5jb25zdCBjbGVhckRvbmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2xlYXItZG9uZScpO1xubGV0IGxpc3RIMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2Rvcy13cmFwcGVyIGgyJyk7XG5cbigoKSA9PiB7XG4gIGV2ZW50c0hhbmRsZXIub24oJ2FsbFRhYlNlbGVjdGVkJywgdG9kb3MgPT4ge1xuICAgIGxpc3RIMi50ZXh0Q29udGVudCA9ICdBbGwnO1xuICAgIHRvZG9zTGlzdC5pbm5lckhUTUwgPSAnJztcbiAgICByZW5kZXJUb2Rvcyh0b2Rvcyk7XG4gIH0pO1xuXG4gIGV2ZW50c0hhbmRsZXIub24oJ3BlbmRpbmdUYWJTZWxlY3RlZCcsIHRvZG9zID0+IHtcbiAgICBsaXN0SDIudGV4dENvbnRlbnQgPSAnUGVuZGluZyc7XG4gICAgdG9kb3NMaXN0LmlubmVySFRNTCA9ICcnO1xuICAgIHJlbmRlclRvZG9zKHRvZG9zKTtcbiAgfSk7XG5cbiAgZXZlbnRzSGFuZGxlci5vbigndG9kYXlUYWJTZWxlY3RlZCcsIHRvZG9zID0+IHtcbiAgICBsaXN0SDIudGV4dENvbnRlbnQgPSAnVG9kYXknO1xuICAgIHRvZG9zTGlzdC5pbm5lckhUTUwgPSAnJztcbiAgICByZW5kZXJUb2Rvcyh0b2Rvcyk7XG4gIH0pO1xuXG4gIGV2ZW50c0hhbmRsZXIub24oJ2NvbXBsZXRlZFRhYlNlbGVjdGVkJywgdG9kb3MgPT4ge1xuICAgIGxpc3RIMi50ZXh0Q29udGVudCA9ICdDb21wbGV0ZWQnO1xuICAgIHRvZG9zTGlzdC5pbm5lckhUTUwgPSAnJztcbiAgICByZW5kZXJUb2Rvcyh0b2Rvcyk7XG4gIH0pO1xuXG4gIGV2ZW50c0hhbmRsZXIub24oJ3Byb2plY3RUYWJTZWxlY3RlZCcsIHByb2plY3QgPT4ge1xuICAgIGxpc3RIMi50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZTtcbiAgICB0b2Rvc0xpc3QuaW5uZXJIVE1MID0gJyc7XG4gICAgcmVuZGVyVG9kb3MocHJvamVjdC50b2Rvcyk7XG4gIH0pO1xuXG4gIGV2ZW50c0hhbmRsZXIub24oJ3RvZG9BZGRlZCcsIHRvZG8gPT4ge1xuICAgIHRvZG9zTGlzdC5wcmVwZW5kKGNyZWF0ZVRvZG8odG9kbykpO1xuICB9KTtcblxuICBldmVudHNIYW5kbGVyLm9uKCd0b2RvRWRpdGVkJywgdG9kbyA9PiB7XG4gICAgY29uc3Qgb2xkVG9kbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXRvZG89XCJ0b2RvJHt0b2RvLmlkfVwiXWApO1xuICAgIGNvbnN0IG5ld1RvZG8gPSBjcmVhdGVUb2RvKHRvZG8pO1xuICAgIGtlZXBEZXNjcmlwdGlvblZpc2liaWxpdHkob2xkVG9kbywgbmV3VG9kbyk7XG5cbiAgICBvbGRUb2RvLmFmdGVyKG5ld1RvZG8pO1xuICAgIG9sZFRvZG8ucmVtb3ZlKCk7XG4gIH0pO1xuXG4gIGV2ZW50c0hhbmRsZXIub24oJ3RvZG9EZWxldGVkJywgdG9kbyA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtdG9kbz1cInRvZG8ke3RvZG8uaWR9XCJdYCkucmVtb3ZlKCk7XG4gIH0pO1xuXG4gIGFkZFRvZG9CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKCdtb2RhbEFjdGl2YXRlZCcpO1xuICB9KTtcblxuICBjbGVhckRvbmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PntcbiAgICBjb25zdCBkb25lVG9kb3NPblNjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2RvLWNoZWNrZWQnKTtcbiAgICBjb25zdCB0b2Rvc0lkcyA9IFtdO1xuICAgIGRvbmVUb2Rvc09uU2NyZWVuLmZvckVhY2godG9kbyA9PiB7XG4gICAgICB0b2Rvc0lkcy5wdXNoKHRvZG8ucXVlcnlTZWxlY3RvcignaW5wdXQnKS5pZC5zbGljZSg0KSk7XG4gICAgICB0b2RvLnBhcmVudE5vZGUucGFyZW50Tm9kZS5yZW1vdmUoKTtcbiAgICB9KTtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ2NsZWFyRG9uZUNsaWNrZWQnLCB0b2Rvc0lkcyk7IFxuICB9KTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGNyZWF0ZVRvZG8odG9kbykge1xuICBjb25zdCB0b2RvV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB0b2RvV3JhcHBlci5hcHBlbmQoY3JlYXRlVG9kb0xpbmUodG9kbyksIGNyZWF0ZVRvZG9EZXRhaWxzKHRvZG8pKTtcbiAgdG9kb1dyYXBwZXIuY2xhc3NMaXN0LmFkZCgnZmxleC1jb2x1bW4nKTtcbiAgdG9kb1dyYXBwZXIuZGF0YXNldC50b2RvID0gYHRvZG8ke3RvZG8uaWR9YDtcblxuICByZXR1cm4gdG9kb1dyYXBwZXJcbn1cblxuZnVuY3Rpb24gY3JlYXRlVG9kb0xpbmUodG9kbykge1xuICBjb25zdCB0b2RvTGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBjaGVja2JveFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG5cbiAgY29uc3QgYnV0dG9uc1dyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3QgZGV0YWlsc0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBjb25zdCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBjb25zdCBkZXRhaWxzSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgY29uc3QgZWRpdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGNvbnN0IGRlbGV0ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgaWYgKHRvZG8uc3RhdHVzID09PSAnY29tcGxldGVkJykge1xuICAgIGNoZWNrYm94V3JhcHBlci5jbGFzc0xpc3QuYWRkKCd0b2RvLWNoZWNrZWQnKTtcbiAgICBjaGVja2JveC5jaGVja2VkID0gdHJ1ZTtcbiAgfVxuICBjaGVja2JveFdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnbm8tdXNlci1zZWxlY3QnKTtcbiAgdG9kb0xpbmUuY2xhc3NMaXN0LmFkZCgndG9kbycsIGBwcmlvcml0eS0ke3RvZG8ucHJpb3JpdHl9YCk7XG4gIGJ1dHRvbnNXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3RvZG8tYnV0dG9ucycpO1xuICBbZGV0YWlsc0J1dHRvbiwgZWRpdEJ1dHRvbiwgZGVsZXRlQnV0dG9uXVxuICAgIC5mb3JFYWNoKGJ1dHRvbiA9PiBidXR0b24uY2xhc3NMaXN0LmFkZCgndG9kby1pY29uJykpO1xuICBbZGV0YWlsc0ljb24sIGVkaXRJY29uLCBkZWxldGVJY29uXVxuICAgIC5mb3JFYWNoKGljb24gPT4gaWNvbi5jbGFzc0xpc3QuYWRkKCdpY29uaWZ5JykpO1xuXG4gIGRldGFpbHNJY29uLmRhdGFzZXQuaWNvbiA9IFwiaWM6cm91bmQtZGVzY3JpcHRpb25cIjtcbiAgZWRpdEljb24uZGF0YXNldC5pY29uID0gXCJieDpieC1lZGl0XCI7XG4gIGRlbGV0ZUljb24uZGF0YXNldC5pY29uID0gXCJmbHVlbnQ6ZGVsZXRlLTI0LWZpbGxlZFwiO1xuXG4gIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ3RvZG9Ub2dnbGVkJywgdG9kby5pZCk7XG4gICAgY2hlY2tib3hXcmFwcGVyLmNsYXNzTGlzdC50b2dnbGUoJ3RvZG8tY2hlY2tlZCcpO1xuICB9KTtcblxuICBkZXRhaWxzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNkZXRhaWxzJHt0b2RvLmlkfWApXG4gICAgICAuY2xhc3NMaXN0LnRvZ2dsZSgnaW52aXNpYmxlJyk7XG4gIH0pO1xuXG4gIGVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKCdlZGl0QnV0dG9uQ2xpY2tlZCcsIHRvZG8pO1xuICB9KTtcblxuICBkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKCdkZWxldGVCdXR0b25DbGlja2VkJywgdG9kbyk7XG4gIH0pO1xuXG4gIGNoZWNrYm94LnR5cGUgPSAnY2hlY2tib3gnO1xuICBsYWJlbC5odG1sRm9yID0gYHRvZG8ke3RvZG8uaWR9YDtcblxuICBjaGVja2JveC5pZCA9IGB0b2RvJHt0b2RvLmlkfWA7XG5cbiAgbGFiZWwudGV4dENvbnRlbnQgPSB0b2RvLm5hbWU7XG5cbiAgZGV0YWlsc0J1dHRvbi5hcHBlbmQoZGV0YWlsc0ljb24pO1xuICBlZGl0QnV0dG9uLmFwcGVuZChlZGl0SWNvbik7XG4gIGRlbGV0ZUJ1dHRvbi5hcHBlbmQoZGVsZXRlSWNvbik7XG4gIGJ1dHRvbnNXcmFwcGVyLmFwcGVuZChkZXRhaWxzQnV0dG9uLCBlZGl0QnV0dG9uLCBkZWxldGVCdXR0b24pO1xuXG4gIGNoZWNrYm94V3JhcHBlci5hcHBlbmQoY2hlY2tib3gsIGxhYmVsKTtcbiAgdG9kb0xpbmUuYXBwZW5kKGNoZWNrYm94V3JhcHBlciwgYnV0dG9uc1dyYXBwZXIpO1xuXG4gIHJldHVybiB0b2RvTGluZVxufVxuXG5mdW5jdGlvbiBjcmVhdGVUb2RvRGV0YWlscyh0b2RvKSB7XG4gIGNvbnN0IGRldGFpbHNXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IGRldGFpbHNIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3QgZHVlRGF0ZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCB0YWdzRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IG5vdGVzTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG5cbiAgZGV0YWlsc1dyYXBwZXIuY2xhc3NMaXN0LmFkZCgnZGV0YWlscycsICdpbnZpc2libGUnKTtcbiAgZGV0YWlsc0hlYWRlci5jbGFzc0xpc3QuYWRkKCdkZXRhaWxzLWhlYWRlcicpO1xuICB0YWdzRGl2LmNsYXNzTGlzdC5hZGQoJ3RhZ3MnKTtcblxuICBkdWVEYXRlRGl2LnRleHRDb250ZW50ID0gYER1ZSBkYXRlOiAke2Zvcm1hdERhdGUodG9kby5kdWVEYXRlKX1gO1xuICB0YWdzRGl2LnRleHRDb250ZW50ID0gZm9ybWF0VGFncyh0b2RvLnRhZ3MpO1xuXG4gIGRldGFpbHNXcmFwcGVyLmlkID0gYGRldGFpbHMke3RvZG8uaWR9YDtcblxuICBub3Rlc0xpc3QuYXBwZW5kKC4uLmZvcm1hdE5vdGVzKHRvZG8ubm90ZXMpKTtcbiAgZGV0YWlsc0hlYWRlci5hcHBlbmQoZHVlRGF0ZURpdiwgdGFnc0Rpdik7XG4gIGRldGFpbHNXcmFwcGVyLmFwcGVuZChkZXRhaWxzSGVhZGVyLCBub3Rlc0xpc3QpO1xuXG4gIHJldHVybiBkZXRhaWxzV3JhcHBlclxufVxuXG5mdW5jdGlvbiBmb3JtYXRUYWdzKHRhZ3MpIHtcbiAgaWYgKCF0YWdzWzBdKSByZXR1cm5cblxuICBsZXQgZm9ybWF0dGVkVGFncyA9ICcnO1xuICBmb3IgKGxldCB0YWcgb2YgdGFncykge1xuICAgIGZvcm1hdHRlZFRhZ3MgKz0gYCMke3RhZ30gYFxuICB9XG4gIHJldHVybiBmb3JtYXR0ZWRUYWdzXG59XG5cbmZ1bmN0aW9uIGZvcm1hdE5vdGVzKG5vdGVzKSB7XG4gIGlmICghbm90ZXNbMF0pIHJldHVybiBgTm8gbm90ZXNgXG5cbiAgY29uc3QgZm9ybWF0dGVkTm90ZXMgPSBbXTtcbiAgZm9yIChsZXQgbm90ZSBvZiBub3Rlcykge1xuICAgIGNvbnN0IGxpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBsaXN0SXRlbS50ZXh0Q29udGVudCA9IG5vdGU7XG4gICAgZm9ybWF0dGVkTm90ZXMucHVzaChsaXN0SXRlbSk7XG4gIH1cbiAgcmV0dXJuIGZvcm1hdHRlZE5vdGVzXG59XG5cbmZ1bmN0aW9uIGtlZXBEZXNjcmlwdGlvblZpc2liaWxpdHkob2xkVG9kbywgbmV3VG9kbykge1xuICBjb25zdCBuZXdEZXNjcmlwdGlvbiA9IG5ld1RvZG8ucXVlcnlTZWxlY3RvcignLmRldGFpbHMnKTtcbiAgY29uc3Qgb2xkRGVzY3JpcHRpb24gPSBvbGRUb2RvLnF1ZXJ5U2VsZWN0b3IoJy5kZXRhaWxzJyk7XG4gIGlmICghb2xkRGVzY3JpcHRpb24uY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnZpc2libGUnKSkgbmV3RGVzY3JpcHRpb24uY2xhc3NMaXN0LnJlbW92ZSgnaW52aXNpYmxlJyk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclRvZG9zKHRvZG9zKSB7XG4gIGZvciAobGV0IHRvZG8gb2YgdG9kb3MpIHtcbiAgICB0b2Rvc0xpc3QuYXBwZW5kKGNyZWF0ZVRvZG8odG9kbykpO1xuICB9XG59XG5cbiIsImltcG9ydCB7IGV2ZW50c0hhbmRsZXIgfSBmcm9tIFwiLi4vZXZlbnRzSGFuZGxlci5qc1wiO1xuaW1wb3J0IHsgZm9ybWF0RGF0ZSB9IGZyb20gXCIuLi91dGlscy5qc1wiO1xuXG5jb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCcpO1xuY29uc3Qgc2VuZFRvZG9CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VuZC10b2RvJyk7XG5jb25zdCBjYW5jZWxNb2RhbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYW5jZWwtbW9kYWwnKTtcbmNvbnN0IGNsb3NlTW9kYWxCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UtYnV0dG9uJyk7XG5cbmNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuYW1lJyk7XG5jb25zdCBkdWVEYXRlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZHVlLWRhdGUnKTtcbmNvbnN0IHRhZ3NJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YWdzJyk7XG5jb25zdCBub3Rlc0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25vdGVzJyk7XG5jb25zdCBwcmlvcml0eUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByaW9yaXR5Jyk7XG5cbigoKSA9PiB7XG4gIG1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiBoaWRlTW9kYWxJZkNsaWNrZWRPdXRzaWRlKGUpKTtcbiAgY2xvc2VNb2RhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhpZGVNb2RhbCk7XG4gIGV2ZW50c0hhbmRsZXIub24oJ21vZGFsQWN0aXZhdGVkJywgZGlzcGxheU1vZGFsKTtcbiAgZXZlbnRzSGFuZGxlci5vbignZWRpdEJ1dHRvbkNsaWNrZWQnLCBlZGl0VG9kbyk7XG5cbiAgc2VuZFRvZG9CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKCd0b2RvSW5wdXRlZCcsIGdhaW5Ub2RvRGF0YUZyb21Gb3JtKCkpO1xuICAgIC8vIGNsZWFySW5wdXRzKCk7XG4gICAgaGlkZU1vZGFsKCk7XG4gIH0pO1xuXG4gIGNhbmNlbE1vZGFsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGhpZGVNb2RhbCgpO1xuICB9KTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGRpc3BsYXlNb2RhbCgpIHtcbiAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnaW52aXNpYmxlJyk7XG59XG5cbmZ1bmN0aW9uIGhpZGVNb2RhbCgpIHtcbiAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlJyk7XG59XG5cbmZ1bmN0aW9uIGhpZGVNb2RhbElmQ2xpY2tlZE91dHNpZGUoZSkge1xuICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtb2RhbCcpKSB7XG4gICAgaGlkZU1vZGFsKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2FpblRvZG9EYXRhRnJvbUZvcm0oKSB7XG4gIGNvbnN0IG5hbWUgPSBuYW1lSW5wdXQudmFsdWU7XG4gIGNvbnN0IGR1ZURhdGUgPSBuZXcgRGF0ZShkdWVEYXRlSW5wdXQudmFsdWUpO1xuICBjb25zdCB0YWdzID0gdGFnc0lucHV0LnZhbHVlLnNwbGl0KCcgJyk7XG4gIGNvbnN0IG5vdGVzID0gbm90ZXNJbnB1dC52YWx1ZS5zcGxpdCgnXFxuJyk7XG4gIGNvbnN0IHByaW9yaXR5ID0gcHJpb3JpdHlJbnB1dC52YWx1ZTtcblxuICByZXR1cm4geyBuYW1lLCBkdWVEYXRlLCB0YWdzLCBub3RlcywgcHJpb3JpdHkgfVxufVxuXG5mdW5jdGlvbiBjbGVhcklucHV0cygpIHtcbiAgbmFtZUlucHV0LnZhbHVlID0gJyc7XG4gIGR1ZURhdGVJbnB1dC52YWx1ZSA9ICcnO1xuICB0YWdzSW5wdXQudmFsdWUgPSAnJztcbiAgbm90ZXNJbnB1dC52YWx1ZSA9ICcnO1xuICBwcmlvcml0eUlucHV0LnZhbHVlID0gJyc7XG59XG5cbmZ1bmN0aW9uIGVkaXRUb2RvKHRvZG8pIHtcbiAgZGlzcGxheU1vZGFsKCk7XG4gIG5hbWVJbnB1dC52YWx1ZSA9IHRvZG8ubmFtZTtcbiAgZHVlRGF0ZUlucHV0LnZhbHVlID0gZm9ybWF0RGF0ZSh0b2RvLmR1ZURhdGUpOyBcbiAgdGFnc0lucHV0LnZhbHVlID0gdG9kby50YWdzLmpvaW4oJyAnKTtcbiAgbm90ZXNJbnB1dC52YWx1ZSA9IHRvZG8ubm90ZXMuam9pbignXFxuJyk7XG4gIHByaW9yaXR5SW5wdXQudmFsdWUgPSB0b2RvLnByaW9yaXR5O1xufVxuXG5jb25zb2xlLmxvZyhnYWluVG9kb0RhdGFGcm9tRm9ybSgpKTtcbiIsImltcG9ydCB7IGV2ZW50c0hhbmRsZXIgfSBmcm9tIFwiLi4vZXZlbnRzSGFuZGxlci5qc1wiXG5cbmNvbnN0IHByb2plY3RzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0cycpO1xuY29uc3QgY3JlYXRlUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjcmVhdGUtcHJvamVjdCcpO1xuXG5jb25zdCB0YWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpc3QnKTtcbmNvbnN0IGFsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhbGwnKTtcbmNvbnN0IHBlbmRpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGVuZGluZycpO1xuY29uc3QgdG9kYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9kYXknKTtcbmNvbnN0IGNvbXBsZXRlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb21wbGV0ZWQnKTtcblxuKCgpID0+IHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGVzdHJveUlucHV0RGl2SWZDbGlja2VkT3V0c2lkZSk7XG4gIGNyZWF0ZVByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjcmVhdGVQcm9qZWN0SW5wdXQpO1xuXG4gIGV2ZW50c0hhbmRsZXIub24oJ3Byb2plY3RzUGFyc2VkJywgcHJvamVjdHMgPT4ge1xuICAgIGZvciAobGV0IGkgPSAxLCBsID0gcHJvamVjdHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBjcmVhdGVQcm9qZWN0VGFiKHByb2plY3RzW2ldKTtcbiAgICB9XG4gIH0pO1xuXG4gIGV2ZW50c0hhbmRsZXIub24oJ3Byb2plY3RBZGRlZCcsIGNyZWF0ZVByb2plY3RUYWIpO1xuICBldmVudHNIYW5kbGVyLm9uKCdwcm9qZWN0RGVsZXRlZCcsIGRlbGV0ZVByb2plY3RUYWIpO1xuICBldmVudHNIYW5kbGVyLm9uKCd0b2Rvc0NoYW5nZWQnLCBjaGFuZ2VTdGF0dXNOdW1iZXIpO1xuXG4gIHRhYnMuZm9yRWFjaChwcm9qZWN0ID0+IHtcbiAgICBwcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VsZWN0VGFiKTtcbiAgfSlcblxuICBhbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKCdhbGxUYWJDbGlja2VkJyk7XG4gIH0pXG5cbiAgcGVuZGluZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ2FsbFRhYkNsaWNrZWQnKTtcbiAgfSk7XG5cbiAgcGVuZGluZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ3BlbmRpbmdUYWJDbGlja2VkJyk7XG4gIH0pO1xuXG4gIHRvZGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcigndG9kYXlUYWJDbGlja2VkJyk7XG4gIH0pO1xuXG4gIGNvbXBsZXRlZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ2NvbXBsZXRlZFRhYkNsaWNrZWQnKTtcbiAgfSk7XG59KSgpO1xuXG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3RUYWIocHJvamVjdCkge1xuICBjb25zdCBsaVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICBjb25zdCBuYW1lRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IHN0YXR1c0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgY29uc3QgZGVsZXRlQnV0dG9uSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgY29uc3Qgc3RhdHVzQ2lyY2xlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IHN0YXR1c051bWJlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gIGxpV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdsaXN0Jyk7XG4gIHN0YXR1c0Rpdi5jbGFzc0xpc3QuYWRkKCdsaXN0LXN0YXR1cycpO1xuICBkZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZCgnZGVsZXRlLXByb2plY3QtYnV0dG9uJyk7XG4gIGRlbGV0ZUJ1dHRvbkljb24uY2xhc3NMaXN0LmFkZCgnaWNvbmlmeScpO1xuICBzdGF0dXNDaXJjbGVEaXYuY2xhc3NMaXN0LmFkZCgnbGlzdC1zdGF0dXMtY2lyY2xlJywgJ3Byb2plY3QnKTtcbiAgc3RhdHVzTnVtYmVyRGl2LmNsYXNzTGlzdC5hZGQoJ2xpc3Qtc3RhdHVzLW51bWJlcicpO1xuXG4gIGxpV3JhcHBlci5kYXRhc2V0LnByb2plY3QgPSBwcm9qZWN0LmlkO1xuICBkZWxldGVCdXR0b25JY29uLmRhdGFzZXQuaWNvbiA9IFwiZmx1ZW50OmRlbGV0ZS0yNC1maWxsZWRcIjtcblxuICBuYW1lRGl2LnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lO1xuICBzdGF0dXNOdW1iZXJEaXYudGV4dENvbnRlbnQgPSBwcm9qZWN0LnRvZG9zLmxlbmd0aDtcblxuICBsaVdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZWxlY3RUYWIpO1xuICBsaVdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUtcHJvamVjdC1idXR0b24nKSkgcmV0dXJuXG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKCdwcm9qZWN0VGFiQ2xpY2tlZCcsIGxpV3JhcHBlci5kYXRhc2V0LnByb2plY3QpO1xuICB9KTtcbiAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4geyBcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ3Byb2plY3REZWxldGVkJywgcHJvamVjdC5pZClcbiAgfSk7XG5cbiAgZGVsZXRlQnV0dG9uLmFwcGVuZChkZWxldGVCdXR0b25JY29uKTtcbiAgc3RhdHVzRGl2LmFwcGVuZChkZWxldGVCdXR0b24sIHN0YXR1c0NpcmNsZURpdiwgc3RhdHVzTnVtYmVyRGl2KTtcbiAgbGlXcmFwcGVyLmFwcGVuZChuYW1lRGl2LCBzdGF0dXNEaXYpO1xuXG4gIHByb2plY3RzTGlzdC5hcHBlbmQobGlXcmFwcGVyKTtcblxuICByZXR1cm4gbGlXcmFwcGVyXG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3RUYWIoaWQpIHtcbiAgY29uc3QgcHJvamVjdFRhYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXByb2plY3Q9XCIke2lkfVwiXWApXG4gIHByb2plY3RUYWIucmVtb3ZlKCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3RJbnB1dCgpIHtcbiAgY29uc3QgaW5wdXREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBjb25zdCBpbnB1dEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXG4gIGlucHV0RGl2LmNsYXNzTGlzdC5hZGQoJ2ZsZXgtcm93Jyk7XG4gIGlucHV0LmNsYXNzTGlzdC5hZGQoJ2NyZWF0ZS1wcm9qZWN0LWlucHV0Jyk7XG4gIGlucHV0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtaW5wdXQtYnV0dG9uJyk7XG5cbiAgaW5wdXREaXYuZGF0YXNldC50eXBlID0gJ2lucHV0LWRpdic7XG5cbiAgaW5wdXRCdXR0b24udGV4dENvbnRlbnQgPSAnKyc7XG4gIGlucHV0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcigncHJvamVjdElucHV0ZWQnLCBpbnB1dC52YWx1ZSk7XG4gICAgaW5wdXREaXYucmVtb3ZlKCk7XG4gIH0pO1xuXG4gIGlucHV0RGl2LmFwcGVuZChpbnB1dCwgaW5wdXRCdXR0b24pO1xuXG4gIGNyZWF0ZVByb2plY3RCdXR0b24uYmVmb3JlKGlucHV0RGl2KTtcbiAgaW5wdXQuZm9jdXMoKTtcblxuICByZXR1cm4gaW5wdXREaXZcbn1cblxuZnVuY3Rpb24gZGVzdHJveUlucHV0RGl2SWZDbGlja2VkT3V0c2lkZShlKSB7XG4gIGlmIChlLnRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQudHlwZSA9PT0gJ2lucHV0LWRpdicgfHxcbiAgICAgIGUudGFyZ2V0LmlkID09PSAnY3JlYXRlLXByb2plY3QnKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdHlwZT1pbnB1dC1kaXZdJylcbiAgICAuZm9yRWFjaChlbCA9PiBlbC5yZW1vdmUoKSk7XG59XG5cbmZ1bmN0aW9uIHNlbGVjdFRhYigpIHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpc3QnKVxuICAgIC5mb3JFYWNoKHByb2plY3QgPT4gcHJvamVjdC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gIHRoaXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG59XG5cbmZ1bmN0aW9uIGNoYW5nZVN0YXR1c051bWJlcihsZW5ndGhPYmplY3QpIHtcbiAgY29uc3QgcHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wcm9qZWN0XScpO1xuXG4gIGFsbC5xdWVyeVNlbGVjdG9yKCcubGlzdC1zdGF0dXMtbnVtYmVyJykudGV4dENvbnRlbnQgPSBsZW5ndGhPYmplY3QuYWxsTGVuZ3RoO1xuICBwZW5kaW5nLnF1ZXJ5U2VsZWN0b3IoJy5saXN0LXN0YXR1cy1udW1iZXInKS50ZXh0Q29udGVudCA9IGxlbmd0aE9iamVjdC5wZW5kaW5nTGVuZ3RoO1xuICB0b2RheS5xdWVyeVNlbGVjdG9yKCcubGlzdC1zdGF0dXMtbnVtYmVyJykudGV4dENvbnRlbnQgPSBsZW5ndGhPYmplY3QudG9kYXlMZW5ndGg7XG4gIGNvbXBsZXRlZC5xdWVyeVNlbGVjdG9yKCcubGlzdC1zdGF0dXMtbnVtYmVyJykudGV4dENvbnRlbnQgPSBsZW5ndGhPYmplY3QuY29tcGxldGVkTGVuZ3RoO1xuXG4gIHByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgcHJvamVjdC5xdWVyeVNlbGVjdG9yKCcubGlzdC1zdGF0dXMtbnVtYmVyJykudGV4dENvbnRlbnQgPSBsZW5ndGhPYmplY3RbcHJvamVjdC5kYXRhc2V0LnByb2plY3RdO1xuICB9KTtcbn1cbiIsImV4cG9ydCBjb25zdCBldmVudHNIYW5kbGVyID0gKCgpID0+IHtcbiAgbGV0IGV2ZW50cyA9IHt9O1xuXG4gIHJldHVybiB7XG5cbiAgICBvbihldmVudE5hbWUsIGZuKSB7XG4gICAgICBldmVudHNbZXZlbnROYW1lXSA9IGV2ZW50c1tldmVudE5hbWVdIHx8IFtdO1xuICAgICAgZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChmbik7XG4gICAgfSxcblxuICAgIG9mZihldmVudE5hbWUsIHJlbW92ZWRGbikge1xuICAgICAgaWYgKGV2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgICAgIGV2ZW50c1tldmVudE5hbWVdID0gZXZlbnRzW2V2ZW50TmFtZV0uZmlsdGVyKGZuID0+IGZuICE9PSByZW1vdmVkRm4pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB0cmlnZ2VyKGV2ZW50TmFtZSwgZGF0YSkge1xuICAgICAgaWYgKGV2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgICAgIGV2ZW50c1tldmVudE5hbWVdLmZvckVhY2goZm4gPT4ge1xuICAgICAgICAgIGZuKGRhdGEpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxufSkoKTtcbiIsImltcG9ydCB7IGV2ZW50c0hhbmRsZXIgfSBmcm9tICcuL2V2ZW50c0hhbmRsZXInO1xuXG4oKCkgPT4ge1xuICBjb25zdCBwYXJzZWRQcm9qZWN0cyA9IHBhcnNlTG9jYWxTdG9yYWdlKCdwcm9qZWN0cycpIHx8IFtdO1xuXG4gIGV2ZW50c0hhbmRsZXIudHJpZ2dlcignYXBwU3RhcnRlZCcsIGNvbnZlcnREYXRlc1RvRGF0ZU9iamVjdHMocGFyc2VkUHJvamVjdHMpKTtcblxuICBldmVudHNIYW5kbGVyLm9uKCd0b2RvTGlzdENoYW5nZWQnLCBwcm9qZWN0cyA9PiB7XG4gICAgc2F2ZVRvTG9jYWxTdG9yYWdlKCdwcm9qZWN0cycsIHByb2plY3RzKTtcbiAgICBjb25zb2xlLmxvZyhsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSk7XG4gIH0pO1xufSkoKTtcblxuZnVuY3Rpb24gc2F2ZVRvTG9jYWxTdG9yYWdlKGtleSwgb2JqKSB7XG4gIGNvbnN0IHN0cmluZ2lmaWVkT2JqZWN0ID0gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBzdHJpbmdpZmllZE9iamVjdCk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlTG9jYWxTdG9yYWdlKGtleSkge1xuICBjb25zdCBzdHJpbmdpZmllZE9iamVjdCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gIGNvbnN0IHBhcnNlZE9iamVjdCA9IEpTT04ucGFyc2Uoc3RyaW5naWZpZWRPYmplY3QpO1xuICByZXR1cm4gcGFyc2VkT2JqZWN0XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnREYXRlc1RvRGF0ZU9iamVjdHMocGFyc2VkUHJvamVjdHMpIHtcbiAgcGFyc2VkUHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHtcbiAgICBwcm9qZWN0LnRvZG9zLmZvckVhY2godG9kbyA9PiB0b2RvLmR1ZURhdGUgPSAodG9kby5kdWVEYXRlKSA/IG5ldyBEYXRlKHRvZG8uZHVlRGF0ZSkgOiBuZXcgRGF0ZSh1bmRlZmluZWQpKTtcbiAgfSk7XG4gIHJldHVybiBwYXJzZWRQcm9qZWN0c1xufVxuIiwiaW1wb3J0IHsgZXZlbnRzSGFuZGxlciB9IGZyb20gXCIuL2V2ZW50c0hhbmRsZXJcIlxuXG5jb25zdCB0b2RvTGlzdCA9ICgoKSA9PiB7XG4gIGxldCBwcm9qZWN0cyA9IFtcbiAgICB7XG4gICAgICBuYW1lOiAnZGVmYXVsdCB0b2RvIGxpc3QnLFxuICAgICAgdG9kb3M6IFtdLFxuICAgICAgaWQ6IDFcbiAgICB9XG4gIF1cblxuICBmdW5jdGlvbiBfZ2l2ZUlkVG9JdGVtKGFycikge1xuICAgIGNvbnN0IGFyclNvcnRlZEJ5SWQgPSBbLi4uYXJyXS5zb3J0KChpdGVtMSwgaXRlbTIpID0+IGl0ZW0xLmlkIC0gaXRlbTIuaWQpO1xuICAgIGNvbnN0IGxhc3RJdGVtID0gYXJyU29ydGVkQnlJZFthcnJTb3J0ZWRCeUlkLmxlbmd0aCAtIDFdO1xuICAgIGlmIChsYXN0SXRlbSkgcmV0dXJuIGxhc3RJdGVtLmlkICsgMVxuICAgIHJldHVybiAxXG4gIH1cblxuICBmdW5jdGlvbiBfZmluZFByb2plY3RCeUlkKGlkKSB7XG4gICAgcmV0dXJuIHByb2plY3RzLmZpbmQocHJvamVjdCA9PiBwcm9qZWN0LmlkID09PSBOdW1iZXIoaWQpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9maW5kVG9kb0J5SWQoaWQpIHtcbiAgICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgcHJvamVjdHMpIHtcbiAgICAgIGZvciAoY29uc3QgdG9kbyBvZiBwcm9qZWN0LnRvZG9zKSB7XG4gICAgICAgIGlmICh0b2RvLmlkID09PSBpZCkgcmV0dXJuIHRvZG9cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBfcGVuZGluZ09mUHJvamVjdChpZCkge1xuICAgIHJldHVybiBfc29ydFRvZG9zKFxuICAgICAgX2ZpbmRQcm9qZWN0QnlJZChpZCkudG9kb3NcbiAgICAgIC5maWx0ZXIodG9kbyA9PiB0b2RvLnN0YXR1cyA9PT0gJ3BlbmRpbmcnKVxuICAgIClcbiAgfVxuXG4gIGZ1bmN0aW9uIF9maW5kTGVuZ3Roc09mUHJvamVjdHMoKSB7XG4gICAgY29uc3QgcHJvamVjdHNMZW5ndGhzID0ge31cbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHByb2plY3RzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgY29uc3QgaWQgPSBwcm9qZWN0c1tpXS5pZDtcbiAgICAgIHByb2plY3RzTGVuZ3Roc1tpZF0gPSBfZmluZFByb2plY3RCeUlkKGlkKS50b2Rvcy5maWx0ZXIodG9kbyA9PiB0b2RvLnN0YXR1cyA9PT0gJ3BlbmRpbmcnKS5sZW5ndGg7XG4gICAgfVxuICAgIGNvbnN0IHN0YXRpY1RhYnNMZW5ndGhzID0ge1xuICAgICAgYWxsTGVuZ3RoOiB0b2RvTGlzdC50b2Rvcy5sZW5ndGgsXG4gICAgICBwZW5kaW5nTGVuZ3RoOiB0b2RvTGlzdC5wZW5kaW5nLmxlbmd0aCxcbiAgICAgIHRvZGF5TGVuZ3RoOiB0b2RvTGlzdC50b2RheS5sZW5ndGgsXG4gICAgICBjb21wbGV0ZWRMZW5ndGg6IHRvZG9MaXN0LmNvbXBsZXRlZC5sZW5ndGgsXG4gICAgfVxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgICAgcHJvamVjdHNMZW5ndGhzLFxuICAgICAgc3RhdGljVGFic0xlbmd0aHNcbiAgICApXG4gIH1cblxuICBmdW5jdGlvbiBfc29ydFRvZG9zKHRvZG9zKSB7XG4gICAgcmV0dXJuIFsuLi50b2Rvc10uc29ydCgodG9kbzEsIHRvZG8yKSA9PiB0b2RvMS5kdWVEYXRlIC0gdG9kbzIuZHVlRGF0ZSlcbiAgICAgIC5zb3J0KCh0b2RvMSwgdG9kbzIpID0+IHRvZG8xLnByaW9yaXR5IC0gdG9kbzIucHJpb3JpdHkpXG4gICAgICAuc29ydCgodG9kbzEsIHRvZG8yKSA9PiB0b2RvMS5zdGF0dXMgPT09ICdjb21wbGV0ZWQnID8gMSA6IC0xKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBhZGRUb2RvKHtuYW1lLCBkdWVEYXRlLCB0YWdzLCBub3RlcywgcHJpb3JpdHksIHByb2plY3RJZCA9IDF9KSB7XG4gICAgICBjb25zdCBzdGF0dXMgPSAncGVuZGluZyc7XG4gICAgICBjb25zdCBpZCA9IF9naXZlSWRUb0l0ZW0odG9kb0xpc3QudG9kb3MpO1xuICAgICAgY29uc3QgdG9kbyA9ICB7IG5hbWUsIGR1ZURhdGUsIHRhZ3MsIG5vdGVzLCBwcmlvcml0eSwgc3RhdHVzLCBpZCwgcHJvamVjdElkIH07XG4gICAgICBjb25zdCBwcm9qZWN0ID0gX2ZpbmRQcm9qZWN0QnlJZChwcm9qZWN0SWQpO1xuICAgICAgaWYgKCFwcm9qZWN0KSByZXR1cm4gXG4gICAgICBwcm9qZWN0LnRvZG9zLnB1c2godG9kbyk7XG4gICAgICByZXR1cm4gdG9kb1xuICAgIH0sXG5cbiAgICBnZXRUb2RvKGlkKSB7XG4gICAgICByZXR1cm4gX2ZpbmRUb2RvQnlJZChpZClcbiAgICB9LFxuXG4gICAgcmVtb3ZlVG9kbyhpZCkge1xuICAgICAgcHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHtcbiAgICAgICAgcHJvamVjdC50b2RvcyA9IHByb2plY3QudG9kb3MuZmlsdGVyKHRvZG8gPT4gdG9kby5pZCAhPT0gTnVtYmVyKGlkKSk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgdG9nZ2xlVG9kbyhpZCkge1xuICAgICAgY29uc3QgdG9kbyA9IF9maW5kVG9kb0J5SWQoaWQpO1xuICAgICAgaWYgKCF0b2RvKSByZXR1cm5cbiAgICAgIHRvZG8uc3RhdHVzID0gKHRvZG8uc3RhdHVzID09PSAncGVuZGluZycpID8gJ2NvbXBsZXRlZCcgOiAncGVuZGluZyc7XG4gICAgfSxcblxuICAgIGFkZFByb2plY3QobmFtZSkge1xuICAgICAgY29uc3QgdG9kb3MgPSBbXTtcbiAgICAgIGNvbnN0IGlkID0gX2dpdmVJZFRvSXRlbShwcm9qZWN0cyk7XG4gICAgICBjb25zdCBwcm9qZWN0ID0geyBuYW1lLCB0b2RvcywgaWQgfVxuICAgICAgcHJvamVjdHMucHVzaChwcm9qZWN0KTtcbiAgICAgIHJldHVybiBwcm9qZWN0XG4gICAgfSxcblxuICAgIGdldFByb2plY3QoaWQpIHtcbiAgICAgIGNvbnN0IHByb2plY3QgPSBfZmluZFByb2plY3RCeUlkKGlkKTtcbiAgICAgIGNvbnN0IHRvZG9zID0gX3NvcnRUb2Rvcyhwcm9qZWN0LnRvZG9zKVxuICAgICAgcmV0dXJuIHsuLi5wcm9qZWN0LCB0b2Rvc31cbiAgICB9LFxuXG4gICAgcmVtb3ZlUHJvamVjdChpZCkge1xuICAgICAgLy8gY2FuJ3QgcmVtb3ZlIGRlZmF1bHQgcHJvamVjdFxuICAgICAgaWYgKE51bWJlcihpZCkgPT09IDEpIHJldHVyblxuICAgICAgcHJvamVjdHMgPSBwcm9qZWN0cy5maWx0ZXIocHJvamVjdCA9PiBwcm9qZWN0LmlkICE9PSBOdW1iZXIoaWQpKTtcbiAgICB9LFxuXG4gICAgZ2V0IGxlbmd0aHMoKSB7XG4gICAgICByZXR1cm4gX2ZpbmRMZW5ndGhzT2ZQcm9qZWN0cygpXG4gICAgfSxcblxuICAgIGdldCB0b2RvcygpIHtcbiAgICAgIGxldCB0b2RvcyA9IFtdO1xuICAgICAgZm9yIChjb25zdCBwcm9qZWN0IG9mIHByb2plY3RzKSB7XG4gICAgICAgIHRvZG9zID0gdG9kb3MuY29uY2F0KHByb2plY3QudG9kb3MpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIF9zb3J0VG9kb3ModG9kb3MpXG4gICAgfSxcblxuICAgIGdldCBwcm9qZWN0cygpIHsgcmV0dXJuIHByb2plY3RzIH0sXG4gICAgc2V0IHByb2plY3RzKHZhbCkgeyBwcm9qZWN0cyA9IHZhbCB9LFxuXG4gICAgZ2V0IHBlbmRpbmcoKSB7XG4gICAgICByZXR1cm4gX3NvcnRUb2Rvcyh0aGlzLnRvZG9zLmZpbHRlcih0b2RvID0+IHRvZG8uc3RhdHVzID09PSAncGVuZGluZycpKTtcbiAgICB9LFxuXG4gICAgZ2V0IGNvbXBsZXRlZCgpIHtcbiAgICAgIHJldHVybiBfc29ydFRvZG9zKHRoaXMudG9kb3MuZmlsdGVyKHRvZG8gPT4gdG9kby5zdGF0dXMgPT09ICdjb21wbGV0ZWQnKSk7XG4gICAgfSxcblxuICAgIGdldCB0b2RheSgpIHtcbiAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgIHJldHVybiBfc29ydFRvZG9zKHRoaXMudG9kb3MuZmlsdGVyKHRvZG8gPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIHRvZG8uZHVlRGF0ZS5nZXREYXRlKCkgPT09IHRvZGF5LmdldERhdGUoKSAmJlxuICAgICAgICAgIHRvZG8uZHVlRGF0ZS5nZXRNb250aCgpID09PSB0b2RheS5nZXRNb250aCgpICYmXG4gICAgICAgICAgdG9kby5kdWVEYXRlLmdldEZ1bGxZZWFyKCkgPT09IHRvZGF5LmdldEZ1bGxZZWFyKCkgJiZcbiAgICAgICAgICB0b2RvLnN0YXR1cyA9PT0gJ3BlbmRpbmcnXG4gICAgICAgIClcbiAgICAgIH0pKTtcbiAgICB9LFxuXG4gICAgY3VycmVudFByb2plY3Q6IDEsXG4gICAgZWRpdGVkVG9kbzogLTEsXG4gICAgbW9kZTogJ2FkZGluZ1RvZG8nXG4gIH1cbn0pKCk7XG5cbigoKSA9PiB7XG4gIGV2ZW50c0hhbmRsZXIub24oJ2FwcFN0YXJ0ZWQnLCBwYXJzZWRQcm9qZWN0cyA9PiB7XG4gICAgaWYgKHBhcnNlZFByb2plY3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRvZG9MaXN0LnByb2plY3RzID0gcGFyc2VkUHJvamVjdHM7XG4gICAgfSBlbHNlIHsgXG4gICAgICBjcmVhdGVFeGFtcGxlVG9kb3MoKTtcbiAgICB9XG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKCdhbGxUYWJTZWxlY3RlZCcsIHRvZG9MaXN0LnRvZG9zKTtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ3Byb2plY3RzUGFyc2VkJywgdG9kb0xpc3QucHJvamVjdHMpO1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcigndG9kb3NDaGFuZ2VkJywgdG9kb0xpc3QubGVuZ3Rocyk7XG4gIH0pO1xuXG4gIGV2ZW50c0hhbmRsZXIub24oJ2FsbFRhYkNsaWNrZWQnLCAoKSA9PiB7XG4gICAgdG9kb0xpc3QuY3VycmVudFByb2plY3QgPSAxO1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcignYWxsVGFiU2VsZWN0ZWQnLCB0b2RvTGlzdC50b2Rvcyk7XG4gIH0pO1xuXG4gIGV2ZW50c0hhbmRsZXIub24oJ3BlbmRpbmdUYWJDbGlja2VkJywgKCkgPT4ge1xuICAgIHRvZG9MaXN0LmN1cnJlbnRQcm9qZWN0ID0gMTtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ3BlbmRpbmdUYWJTZWxlY3RlZCcsIHRvZG9MaXN0LnBlbmRpbmcpO1xuICB9KTtcblxuICBldmVudHNIYW5kbGVyLm9uKCd0b2RheVRhYkNsaWNrZWQnLCAoKSA9PiB7XG4gICAgdG9kb0xpc3QuY3VycmVudFByb2plY3QgPSAxO1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcigndG9kYXlUYWJTZWxlY3RlZCcsIHRvZG9MaXN0LnRvZGF5KTtcbiAgfSk7XG5cbiAgZXZlbnRzSGFuZGxlci5vbignY29tcGxldGVkVGFiQ2xpY2tlZCcsICgpID0+IHtcbiAgICB0b2RvTGlzdC5jdXJyZW50UHJvamVjdCA9IDE7XG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKCdjb21wbGV0ZWRUYWJTZWxlY3RlZCcsIHRvZG9MaXN0LmNvbXBsZXRlZCk7XG4gIH0pO1xuXG4gIGV2ZW50c0hhbmRsZXIub24oJ3Byb2plY3RUYWJDbGlja2VkJywgcHJvamVjdElkID0+IHtcbiAgICBjb25zdCBwcm9qZWN0ID0gdG9kb0xpc3QuZ2V0UHJvamVjdChwcm9qZWN0SWQpO1xuICAgIHRvZG9MaXN0LmN1cnJlbnRQcm9qZWN0ID0gcHJvamVjdElkO1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcigncHJvamVjdFRhYlNlbGVjdGVkJywgcHJvamVjdCk7XG4gIH0pO1xuXG4gIGV2ZW50c0hhbmRsZXIub24oJ3Byb2plY3RJbnB1dGVkJywgbmFtZSA9PiB7XG4gICAgY29uc3QgcHJvamVjdCA9IHRvZG9MaXN0LmFkZFByb2plY3QobmFtZSk7XG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKCdwcm9qZWN0QWRkZWQnLCBwcm9qZWN0KTtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ3RvZG9MaXN0Q2hhbmdlZCcsIHRvZG9MaXN0LnByb2plY3RzKTtcbiAgfSk7XG5cbiAgZXZlbnRzSGFuZGxlci5vbigncHJvamVjdERlbGV0ZWQnLCBwcm9qZWN0SWQgPT4ge1xuICAgIHRvZG9MaXN0LnJlbW92ZVByb2plY3QocHJvamVjdElkKTtcbiAgICBpZiAocHJvamVjdElkID09PSB0b2RvTGlzdC5jdXJyZW50UHJvamVjdCkge1xuICAgICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKCdhbGxUYWJTZWxlY3RlZCcpO1xuICAgIH0gXG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKCd0b2RvTGlzdENoYW5nZWQnLCB0b2RvTGlzdC5wcm9qZWN0cyk7XG4gIH0pO1xuXG4gIGV2ZW50c0hhbmRsZXIub24oJ3RvZG9JbnB1dGVkJywgdG9kb0RhdGEgPT4ge1xuICAgIGlmICh0b2RvTGlzdC5tb2RlID09PSAnZWRpdGluZ1RvZG8nKSB7XG4gICAgICBjb25zdCB0b2RvID0gdG9kb0xpc3QuZ2V0VG9kbyh0b2RvTGlzdC5lZGl0ZWRUb2RvKTtcbiAgICAgIHRvZG8ubmFtZSA9IHRvZG9EYXRhLm5hbWU7XG4gICAgICB0b2RvLmR1ZURhdGUgPSB0b2RvRGF0YS5kdWVEYXRlO1xuICAgICAgdG9kby50YWdzID0gdG9kb0RhdGEudGFncztcbiAgICAgIHRvZG8ubm90ZXMgPSB0b2RvRGF0YS5ub3RlcztcbiAgICAgIHRvZG8ucHJpb3JpdHkgPSB0b2RvRGF0YS5wcmlvcml0eTtcbiAgICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcigndG9kb0VkaXRlZCcsIHRvZG8pO1xuICAgIH1cbiAgICBpZiAodG9kb0xpc3QubW9kZSA9PT0gJ2FkZGluZ1RvZG8nKSB7XG4gICAgICBjb25zdCB0b2RvID0gdG9kb0xpc3QuYWRkVG9kbyh7Li4udG9kb0RhdGEsIHByb2plY3RJZDogdG9kb0xpc3QuY3VycmVudFByb2plY3R9KTtcbiAgICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcigndG9kb0FkZGVkJywgdG9kbyk7XG4gICAgfVxuICAgIHRvZG9MaXN0Lm1vZGUgPSAnYWRkaW5nVG9kbyc7XG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKCd0b2Rvc0NoYW5nZWQnLCB0b2RvTGlzdC5sZW5ndGhzKTtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ3RvZG9MaXN0Q2hhbmdlZCcsIHRvZG9MaXN0LnByb2plY3RzKTtcbiAgfSk7XG5cbiAgZXZlbnRzSGFuZGxlci5vbigndG9kb1RvZ2dsZWQnLCB0b2RvSWQgPT4ge1xuICAgIHRvZG9MaXN0LnRvZ2dsZVRvZG8odG9kb0lkKTtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ3RvZG9zQ2hhbmdlZCcsIHRvZG9MaXN0Lmxlbmd0aHMpO1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcigndG9kb0xpc3RDaGFuZ2VkJywgdG9kb0xpc3QucHJvamVjdHMpO1xuICB9KTtcblxuICBldmVudHNIYW5kbGVyLm9uKCdlZGl0QnV0dG9uQ2xpY2tlZCcsIHRvZG8gPT4ge1xuICAgIHRvZG9MaXN0Lm1vZGUgPSAnZWRpdGluZ1RvZG8nO1xuICAgIHRvZG9MaXN0LmVkaXRlZFRvZG8gPSB0b2RvLmlkO1xuICB9KTtcblxuICBldmVudHNIYW5kbGVyLm9uKCdkZWxldGVCdXR0b25DbGlja2VkJywgdG9kbyA9PiB7XG4gICAgdG9kb0xpc3QucmVtb3ZlVG9kbyh0b2RvLmlkKTtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ3RvZG9EZWxldGVkJywgdG9kbyk7XG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKCd0b2Rvc0NoYW5nZWQnLCB0b2RvTGlzdC5sZW5ndGhzKTtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ3RvZG9MaXN0Q2hhbmdlZCcsIHRvZG9MaXN0LnByb2plY3RzKTtcbiAgfSk7XG5cbiAgZXZlbnRzSGFuZGxlci5vbignY2xlYXJEb25lQ2xpY2tlZCcsIHRvZG9zSWRzID0+IHtcbiAgICBmb3IgKGNvbnN0IGlkIG9mIHRvZG9zSWRzKSB7XG4gICAgICB0b2RvTGlzdC5yZW1vdmVUb2RvKGlkKTtcbiAgICB9XG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKCd0b2Rvc0NoYW5nZWQnLCB0b2RvTGlzdC5sZW5ndGhzKTtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ3RvZG9MaXN0Q2hhbmdlZCcsIHRvZG9MaXN0LnByb2plY3RzKTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gY3JlYXRlRXhhbXBsZVRvZG9zKCkge1xuICAgIHRvZG9MaXN0LmFkZFRvZG8oe25hbWU6ICdUYWtlIGRvZyBmb3IgYSB3YWxrJywgZHVlRGF0ZTogbmV3IERhdGUoJzIwMjEtMTItMTQnKSwgdGFnczogWydkb2dnbycsICdoZWFsdGgnXSwgbm90ZXM6IFsnJ10sIHByaW9yaXR5OiAxfSk7XG4gICAgdG9kb0xpc3QuYWRkVG9kbyh7bmFtZTogJ0J1eSBtaWxrJywgZHVlRGF0ZTogbmV3IERhdGUodW5kZWZpbmVkKSwgdGFnczogWydncm9jZXJpZXMnXSwgbm90ZXM6IFsnJ10sIHByaW9yaXR5OiAzfSk7XG4gICAgdG9kb0xpc3QuYWRkVG9kbyh7bmFtZTogJ0dvIHRvIGNpbmVtYSB3aXRoIEpvc2gnLCBkdWVEYXRlOiBuZXcgRGF0ZSgnMjAyMS0xMi0xNicpLCB0YWdzOiBbJ2pvc2gnLCAncmVsYXgnXSwgbm90ZXM6IFsndmlzaXQgQW5uZSBvbiBvdXIgd2F5IGhvbWUnXSwgcHJpb3JpdHk6IDJ9KTtcbiAgICB0b2RvTGlzdC5hZGRUb2RvKHtuYW1lOiAnVmlzaXQgZGVudGlzdCcsIGR1ZURhdGU6IG5ldyBEYXRlKCcyMDIxLTEyLTE4JyksIHRhZ3M6IFsnaGVhbHRoJ10sIG5vdGVzOiBbJzE3OjAwJywgJ25vdCBlYXRpbmcgYmVmb3JlIGdvaW5nIHRvIGRlbnRpc3QnXSwgcHJpb3JpdHk6IDF9KTtcbiAgICB0b2RvTGlzdC5hZGRUb2RvKHtuYW1lOiAnVmlzaXQgbmV3IGNhbmR5IHNob3AnLCBkdWVEYXRlOiBuZXcgRGF0ZSh1bmRlZmluZWQpLCB0YWdzOiBbJyddLCBub3RlczogWycnXSwgcHJpb3JpdHk6IDN9KTtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ3RvZG9MaXN0Q2hhbmdlZCcsIHRvZG9MaXN0LnByb2plY3RzKTtcbiAgfVxufSkoKTtcbiIsImZ1bmN0aW9uIGZvcm1hdERhdGUoZGF0ZSkge1xuICBpZiAoaXNOYU4oZGF0ZS5nZXRUaW1lKCkpKSByZXR1cm4gYE5vIGR1ZSBkYXRlYFxuXG4gIGNvbnN0IHl5eXkgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gIGNvbnN0IG1tID0gKGRhdGUuZ2V0TW9udGgoKSArIDEpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcbiAgY29uc3QgZGQgPSBkYXRlLmdldERhdGUoKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7XG5cbiAgcmV0dXJuIGAke3l5eXl9LSR7bW19LSR7ZGR9YFxufVxuXG5leHBvcnQge1xuICBmb3JtYXREYXRlXG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vY3NzL3N0eWxlLmNzc1wiO1xuaW1wb3J0IFwiLi9qcy90b2RvLmpzXCI7XG5pbXBvcnQgXCIuL2pzL2V2ZW50c0hhbmRsZXJcIjtcbmltcG9ydCBcIi4vanMvZG9tL3NpZGViYXIuanNcIjtcbmltcG9ydCBcIi4vanMvZG9tL21vZGFsLmpzXCI7XG5pbXBvcnQgXCIuL2pzL2RvbS9saXN0LmpzXCI7XG5pbXBvcnQgXCIuL2pzL3N0b3JhZ2VcIjtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9