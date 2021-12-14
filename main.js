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
    clearInputs();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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R0FBRzs7QUFFSCxFQUFFLDREQUFnQjtBQUNsQjtBQUNBO0FBQ0EsR0FBRzs7QUFFSCxFQUFFLDREQUFnQjtBQUNsQjtBQUNBLElBQUksaUVBQXFCO0FBQ3pCLElBQUksaUVBQXFCO0FBQ3pCLElBQUksaUVBQXFCO0FBQ3pCLEdBQUc7O0FBRUgsRUFBRSw0REFBZ0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsSUFBSSxpRUFBcUI7QUFDekIsSUFBSSxpRUFBcUI7QUFDekIsR0FBRzs7QUFFSDtBQUNBLHNCQUFzQixrSEFBa0g7QUFDeEksc0JBQXNCLDhGQUE4RjtBQUNwSCxzQkFBc0IsNklBQTZJO0FBQ25LLHNCQUFzQiw4SUFBOEk7QUFDcEssc0JBQXNCLGlHQUFpRztBQUN2SCxJQUFJLGlFQUFxQjtBQUN6QjtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzlQRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxZQUFZLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRztBQUM3Qjs7QUFJQzs7Ozs7OztVQ1pEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOeUI7QUFDSDtBQUNNO0FBQ0M7QUFDRjtBQUNEO0FBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jc3Mvc3R5bGUuY3NzPzkzMDYiLCJ3ZWJwYWNrOi8vLy4vanMvZG9tL2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vanMvZG9tL21vZGFsLmpzIiwid2VicGFjazovLy8uL2pzL2RvbS9zaWRlYmFyLmpzIiwid2VicGFjazovLy8uL2pzL2V2ZW50c0hhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9qcy90b2RvLmpzIiwid2VicGFjazovLy8uL2pzL3V0aWxzLmpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCB7IGV2ZW50c0hhbmRsZXIgfSBmcm9tIFwiLi4vZXZlbnRzSGFuZGxlci5qc1wiO1xuaW1wb3J0IHsgZm9ybWF0RGF0ZSB9IGZyb20gXCIuLi91dGlscy5qc1wiO1xuXG5jb25zdCB0b2Rvc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9kb3MnKTtcbmNvbnN0IGFkZFRvZG9CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXRvZG8nKTtcbmNvbnN0IGNsZWFyRG9uZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjbGVhci1kb25lJyk7XG5sZXQgbGlzdEgyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG9zLXdyYXBwZXIgaDInKTtcblxuKCgpID0+IHtcbiAgZXZlbnRzSGFuZGxlci5vbignYWxsVGFiU2VsZWN0ZWQnLCB0b2RvcyA9PiB7XG4gICAgbGlzdEgyLnRleHRDb250ZW50ID0gJ0FsbCc7XG4gICAgdG9kb3NMaXN0LmlubmVySFRNTCA9ICcnO1xuICAgIHJlbmRlclRvZG9zKHRvZG9zKTtcbiAgfSk7XG5cbiAgZXZlbnRzSGFuZGxlci5vbigncGVuZGluZ1RhYlNlbGVjdGVkJywgdG9kb3MgPT4ge1xuICAgIGxpc3RIMi50ZXh0Q29udGVudCA9ICdQZW5kaW5nJztcbiAgICB0b2Rvc0xpc3QuaW5uZXJIVE1MID0gJyc7XG4gICAgcmVuZGVyVG9kb3ModG9kb3MpO1xuICB9KTtcblxuICBldmVudHNIYW5kbGVyLm9uKCd0b2RheVRhYlNlbGVjdGVkJywgdG9kb3MgPT4ge1xuICAgIGxpc3RIMi50ZXh0Q29udGVudCA9ICdUb2RheSc7XG4gICAgdG9kb3NMaXN0LmlubmVySFRNTCA9ICcnO1xuICAgIHJlbmRlclRvZG9zKHRvZG9zKTtcbiAgfSk7XG5cbiAgZXZlbnRzSGFuZGxlci5vbignY29tcGxldGVkVGFiU2VsZWN0ZWQnLCB0b2RvcyA9PiB7XG4gICAgbGlzdEgyLnRleHRDb250ZW50ID0gJ0NvbXBsZXRlZCc7XG4gICAgdG9kb3NMaXN0LmlubmVySFRNTCA9ICcnO1xuICAgIHJlbmRlclRvZG9zKHRvZG9zKTtcbiAgfSk7XG5cbiAgZXZlbnRzSGFuZGxlci5vbigncHJvamVjdFRhYlNlbGVjdGVkJywgcHJvamVjdCA9PiB7XG4gICAgbGlzdEgyLnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lO1xuICAgIHRvZG9zTGlzdC5pbm5lckhUTUwgPSAnJztcbiAgICByZW5kZXJUb2Rvcyhwcm9qZWN0LnRvZG9zKTtcbiAgfSk7XG5cbiAgZXZlbnRzSGFuZGxlci5vbigndG9kb0FkZGVkJywgdG9kbyA9PiB7XG4gICAgdG9kb3NMaXN0LnByZXBlbmQoY3JlYXRlVG9kbyh0b2RvKSk7XG4gIH0pO1xuXG4gIGV2ZW50c0hhbmRsZXIub24oJ3RvZG9FZGl0ZWQnLCB0b2RvID0+IHtcbiAgICBjb25zdCBvbGRUb2RvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtdG9kbz1cInRvZG8ke3RvZG8uaWR9XCJdYCk7XG4gICAgY29uc3QgbmV3VG9kbyA9IGNyZWF0ZVRvZG8odG9kbyk7XG4gICAga2VlcERlc2NyaXB0aW9uVmlzaWJpbGl0eShvbGRUb2RvLCBuZXdUb2RvKTtcblxuICAgIG9sZFRvZG8uYWZ0ZXIobmV3VG9kbyk7XG4gICAgb2xkVG9kby5yZW1vdmUoKTtcbiAgfSk7XG5cbiAgZXZlbnRzSGFuZGxlci5vbigndG9kb0RlbGV0ZWQnLCB0b2RvID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS10b2RvPVwidG9kbyR7dG9kby5pZH1cIl1gKS5yZW1vdmUoKTtcbiAgfSk7XG5cbiAgYWRkVG9kb0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ21vZGFsQWN0aXZhdGVkJyk7XG4gIH0pO1xuXG4gIGNsZWFyRG9uZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+e1xuICAgIGNvbnN0IGRvbmVUb2Rvc09uU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8tY2hlY2tlZCcpO1xuICAgIGNvbnN0IHRvZG9zSWRzID0gW107XG4gICAgZG9uZVRvZG9zT25TY3JlZW4uZm9yRWFjaCh0b2RvID0+IHtcbiAgICAgIHRvZG9zSWRzLnB1c2godG9kby5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLmlkLnNsaWNlKDQpKTtcbiAgICAgIHRvZG8ucGFyZW50Tm9kZS5wYXJlbnROb2RlLnJlbW92ZSgpO1xuICAgIH0pO1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcignY2xlYXJEb25lQ2xpY2tlZCcsIHRvZG9zSWRzKTsgXG4gIH0pO1xufSkoKTtcblxuZnVuY3Rpb24gY3JlYXRlVG9kbyh0b2RvKSB7XG4gIGNvbnN0IHRvZG9XcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRvZG9XcmFwcGVyLmFwcGVuZChjcmVhdGVUb2RvTGluZSh0b2RvKSwgY3JlYXRlVG9kb0RldGFpbHModG9kbykpO1xuICB0b2RvV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdmbGV4LWNvbHVtbicpO1xuICB0b2RvV3JhcHBlci5kYXRhc2V0LnRvZG8gPSBgdG9kbyR7dG9kby5pZH1gO1xuXG4gIHJldHVybiB0b2RvV3JhcHBlclxufVxuXG5mdW5jdGlvbiBjcmVhdGVUb2RvTGluZSh0b2RvKSB7XG4gIGNvbnN0IHRvZG9MaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IGNoZWNrYm94V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcblxuICBjb25zdCBidXR0b25zV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBkZXRhaWxzQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIGNvbnN0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgY29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIGNvbnN0IGRldGFpbHNJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBjb25zdCBlZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgY29uc3QgZGVsZXRlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICBpZiAodG9kby5zdGF0dXMgPT09ICdjb21wbGV0ZWQnKSB7XG4gICAgY2hlY2tib3hXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3RvZG8tY2hlY2tlZCcpO1xuICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0cnVlO1xuICB9XG4gIGNoZWNrYm94V3JhcHBlci5jbGFzc0xpc3QuYWRkKCduby11c2VyLXNlbGVjdCcpO1xuICB0b2RvTGluZS5jbGFzc0xpc3QuYWRkKCd0b2RvJywgYHByaW9yaXR5LSR7dG9kby5wcmlvcml0eX1gKTtcbiAgYnV0dG9uc1dyYXBwZXIuY2xhc3NMaXN0LmFkZCgndG9kby1idXR0b25zJyk7XG4gIFtkZXRhaWxzQnV0dG9uLCBlZGl0QnV0dG9uLCBkZWxldGVCdXR0b25dXG4gICAgLmZvckVhY2goYnV0dG9uID0+IGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCd0b2RvLWljb24nKSk7XG4gIFtkZXRhaWxzSWNvbiwgZWRpdEljb24sIGRlbGV0ZUljb25dXG4gICAgLmZvckVhY2goaWNvbiA9PiBpY29uLmNsYXNzTGlzdC5hZGQoJ2ljb25pZnknKSk7XG5cbiAgZGV0YWlsc0ljb24uZGF0YXNldC5pY29uID0gXCJpYzpyb3VuZC1kZXNjcmlwdGlvblwiO1xuICBlZGl0SWNvbi5kYXRhc2V0Lmljb24gPSBcImJ4OmJ4LWVkaXRcIjtcbiAgZGVsZXRlSWNvbi5kYXRhc2V0Lmljb24gPSBcImZsdWVudDpkZWxldGUtMjQtZmlsbGVkXCI7XG5cbiAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcigndG9kb1RvZ2dsZWQnLCB0b2RvLmlkKTtcbiAgICBjaGVja2JveFdyYXBwZXIuY2xhc3NMaXN0LnRvZ2dsZSgndG9kby1jaGVja2VkJyk7XG4gIH0pO1xuXG4gIGRldGFpbHNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2RldGFpbHMke3RvZG8uaWR9YClcbiAgICAgIC5jbGFzc0xpc3QudG9nZ2xlKCdpbnZpc2libGUnKTtcbiAgfSk7XG5cbiAgZWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ2VkaXRCdXR0b25DbGlja2VkJywgdG9kbyk7XG4gIH0pO1xuXG4gIGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ2RlbGV0ZUJ1dHRvbkNsaWNrZWQnLCB0b2RvKTtcbiAgfSk7XG5cbiAgY2hlY2tib3gudHlwZSA9ICdjaGVja2JveCc7XG4gIGxhYmVsLmh0bWxGb3IgPSBgdG9kbyR7dG9kby5pZH1gO1xuXG4gIGNoZWNrYm94LmlkID0gYHRvZG8ke3RvZG8uaWR9YDtcblxuICBsYWJlbC50ZXh0Q29udGVudCA9IHRvZG8ubmFtZTtcblxuICBkZXRhaWxzQnV0dG9uLmFwcGVuZChkZXRhaWxzSWNvbik7XG4gIGVkaXRCdXR0b24uYXBwZW5kKGVkaXRJY29uKTtcbiAgZGVsZXRlQnV0dG9uLmFwcGVuZChkZWxldGVJY29uKTtcbiAgYnV0dG9uc1dyYXBwZXIuYXBwZW5kKGRldGFpbHNCdXR0b24sIGVkaXRCdXR0b24sIGRlbGV0ZUJ1dHRvbik7XG5cbiAgY2hlY2tib3hXcmFwcGVyLmFwcGVuZChjaGVja2JveCwgbGFiZWwpO1xuICB0b2RvTGluZS5hcHBlbmQoY2hlY2tib3hXcmFwcGVyLCBidXR0b25zV3JhcHBlcik7XG5cbiAgcmV0dXJuIHRvZG9MaW5lXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRvZG9EZXRhaWxzKHRvZG8pIHtcbiAgY29uc3QgZGV0YWlsc1dyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3QgZGV0YWlsc0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBkdWVEYXRlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IHRhZ3NEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3Qgbm90ZXNMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcblxuICBkZXRhaWxzV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdkZXRhaWxzJywgJ2ludmlzaWJsZScpO1xuICBkZXRhaWxzSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2RldGFpbHMtaGVhZGVyJyk7XG4gIHRhZ3NEaXYuY2xhc3NMaXN0LmFkZCgndGFncycpO1xuXG4gIGR1ZURhdGVEaXYudGV4dENvbnRlbnQgPSBgRHVlIGRhdGU6ICR7Zm9ybWF0RGF0ZSh0b2RvLmR1ZURhdGUpfWA7XG4gIHRhZ3NEaXYudGV4dENvbnRlbnQgPSBmb3JtYXRUYWdzKHRvZG8udGFncyk7XG5cbiAgZGV0YWlsc1dyYXBwZXIuaWQgPSBgZGV0YWlscyR7dG9kby5pZH1gO1xuXG4gIG5vdGVzTGlzdC5hcHBlbmQoLi4uZm9ybWF0Tm90ZXModG9kby5ub3RlcykpO1xuICBkZXRhaWxzSGVhZGVyLmFwcGVuZChkdWVEYXRlRGl2LCB0YWdzRGl2KTtcbiAgZGV0YWlsc1dyYXBwZXIuYXBwZW5kKGRldGFpbHNIZWFkZXIsIG5vdGVzTGlzdCk7XG5cbiAgcmV0dXJuIGRldGFpbHNXcmFwcGVyXG59XG5cbmZ1bmN0aW9uIGZvcm1hdFRhZ3ModGFncykge1xuICBpZiAoIXRhZ3NbMF0pIHJldHVyblxuXG4gIGxldCBmb3JtYXR0ZWRUYWdzID0gJyc7XG4gIGZvciAobGV0IHRhZyBvZiB0YWdzKSB7XG4gICAgZm9ybWF0dGVkVGFncyArPSBgIyR7dGFnfSBgXG4gIH1cbiAgcmV0dXJuIGZvcm1hdHRlZFRhZ3Ncbn1cblxuZnVuY3Rpb24gZm9ybWF0Tm90ZXMobm90ZXMpIHtcbiAgaWYgKCFub3Rlc1swXSkgcmV0dXJuIGBObyBub3Rlc2BcblxuICBjb25zdCBmb3JtYXR0ZWROb3RlcyA9IFtdO1xuICBmb3IgKGxldCBub3RlIG9mIG5vdGVzKSB7XG4gICAgY29uc3QgbGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGxpc3RJdGVtLnRleHRDb250ZW50ID0gbm90ZTtcbiAgICBmb3JtYXR0ZWROb3Rlcy5wdXNoKGxpc3RJdGVtKTtcbiAgfVxuICByZXR1cm4gZm9ybWF0dGVkTm90ZXNcbn1cblxuZnVuY3Rpb24ga2VlcERlc2NyaXB0aW9uVmlzaWJpbGl0eShvbGRUb2RvLCBuZXdUb2RvKSB7XG4gIGNvbnN0IG5ld0Rlc2NyaXB0aW9uID0gbmV3VG9kby5xdWVyeVNlbGVjdG9yKCcuZGV0YWlscycpO1xuICBjb25zdCBvbGREZXNjcmlwdGlvbiA9IG9sZFRvZG8ucXVlcnlTZWxlY3RvcignLmRldGFpbHMnKTtcbiAgaWYgKCFvbGREZXNjcmlwdGlvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2ludmlzaWJsZScpKSBuZXdEZXNjcmlwdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyVG9kb3ModG9kb3MpIHtcbiAgZm9yIChsZXQgdG9kbyBvZiB0b2Rvcykge1xuICAgIHRvZG9zTGlzdC5hcHBlbmQoY3JlYXRlVG9kbyh0b2RvKSk7XG4gIH1cbn1cblxuIiwiaW1wb3J0IHsgZXZlbnRzSGFuZGxlciB9IGZyb20gXCIuLi9ldmVudHNIYW5kbGVyLmpzXCI7XG5pbXBvcnQgeyBmb3JtYXREYXRlIH0gZnJvbSBcIi4uL3V0aWxzLmpzXCI7XG5cbmNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsJyk7XG5jb25zdCBzZW5kVG9kb0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZW5kLXRvZG8nKTtcbmNvbnN0IGNhbmNlbE1vZGFsQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhbmNlbC1tb2RhbCcpO1xuY29uc3QgY2xvc2VNb2RhbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1idXR0b24nKTtcblxuY29uc3QgbmFtZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25hbWUnKTtcbmNvbnN0IGR1ZURhdGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkdWUtZGF0ZScpO1xuY29uc3QgdGFnc0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RhZ3MnKTtcbmNvbnN0IG5vdGVzSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbm90ZXMnKTtcbmNvbnN0IHByaW9yaXR5SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJpb3JpdHknKTtcblxuKCgpID0+IHtcbiAgbW9kYWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IGhpZGVNb2RhbElmQ2xpY2tlZE91dHNpZGUoZSkpO1xuICBjbG9zZU1vZGFsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGlkZU1vZGFsKTtcbiAgZXZlbnRzSGFuZGxlci5vbignbW9kYWxBY3RpdmF0ZWQnLCBkaXNwbGF5TW9kYWwpO1xuICBldmVudHNIYW5kbGVyLm9uKCdlZGl0QnV0dG9uQ2xpY2tlZCcsIGVkaXRUb2RvKTtcblxuICBzZW5kVG9kb0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ3RvZG9JbnB1dGVkJywgZ2FpblRvZG9EYXRhRnJvbUZvcm0oKSk7XG4gICAgY2xlYXJJbnB1dHMoKTtcbiAgICBoaWRlTW9kYWwoKTtcbiAgfSk7XG5cbiAgY2FuY2VsTW9kYWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaGlkZU1vZGFsKCk7XG4gIH0pO1xufSkoKTtcblxuZnVuY3Rpb24gZGlzcGxheU1vZGFsKCkge1xuICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcbn1cblxuZnVuY3Rpb24gaGlkZU1vZGFsKCkge1xuICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUnKTtcbn1cblxuZnVuY3Rpb24gaGlkZU1vZGFsSWZDbGlja2VkT3V0c2lkZShlKSB7XG4gIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21vZGFsJykpIHtcbiAgICBoaWRlTW9kYWwoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnYWluVG9kb0RhdGFGcm9tRm9ybSgpIHtcbiAgY29uc3QgbmFtZSA9IG5hbWVJbnB1dC52YWx1ZTtcbiAgY29uc3QgZHVlRGF0ZSA9IG5ldyBEYXRlKGR1ZURhdGVJbnB1dC52YWx1ZSk7XG4gIGNvbnN0IHRhZ3MgPSB0YWdzSW5wdXQudmFsdWUuc3BsaXQoJyAnKTtcbiAgY29uc3Qgbm90ZXMgPSBub3Rlc0lucHV0LnZhbHVlLnNwbGl0KCdcXG4nKTtcbiAgY29uc3QgcHJpb3JpdHkgPSBwcmlvcml0eUlucHV0LnZhbHVlO1xuXG4gIHJldHVybiB7IG5hbWUsIGR1ZURhdGUsIHRhZ3MsIG5vdGVzLCBwcmlvcml0eSB9XG59XG5cbmZ1bmN0aW9uIGNsZWFySW5wdXRzKCkge1xuICBuYW1lSW5wdXQudmFsdWUgPSAnJztcbiAgZHVlRGF0ZUlucHV0LnZhbHVlID0gJyc7XG4gIHRhZ3NJbnB1dC52YWx1ZSA9ICcnO1xuICBub3Rlc0lucHV0LnZhbHVlID0gJyc7XG4gIHByaW9yaXR5SW5wdXQudmFsdWUgPSAnJztcbn1cblxuZnVuY3Rpb24gZWRpdFRvZG8odG9kbykge1xuICBkaXNwbGF5TW9kYWwoKTtcbiAgbmFtZUlucHV0LnZhbHVlID0gdG9kby5uYW1lO1xuICBkdWVEYXRlSW5wdXQudmFsdWUgPSBmb3JtYXREYXRlKHRvZG8uZHVlRGF0ZSk7IFxuICB0YWdzSW5wdXQudmFsdWUgPSB0b2RvLnRhZ3Muam9pbignICcpO1xuICBub3Rlc0lucHV0LnZhbHVlID0gdG9kby5ub3Rlcy5qb2luKCdcXG4nKTtcbiAgcHJpb3JpdHlJbnB1dC52YWx1ZSA9IHRvZG8ucHJpb3JpdHk7XG59XG5cbiIsImltcG9ydCB7IGV2ZW50c0hhbmRsZXIgfSBmcm9tIFwiLi4vZXZlbnRzSGFuZGxlci5qc1wiXG5cbmNvbnN0IHByb2plY3RzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0cycpO1xuY29uc3QgY3JlYXRlUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjcmVhdGUtcHJvamVjdCcpO1xuXG5jb25zdCB0YWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpc3QnKTtcbmNvbnN0IGFsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhbGwnKTtcbmNvbnN0IHBlbmRpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGVuZGluZycpO1xuY29uc3QgdG9kYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9kYXknKTtcbmNvbnN0IGNvbXBsZXRlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb21wbGV0ZWQnKTtcblxuKCgpID0+IHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGVzdHJveUlucHV0RGl2SWZDbGlja2VkT3V0c2lkZSk7XG4gIGNyZWF0ZVByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjcmVhdGVQcm9qZWN0SW5wdXQpO1xuXG4gIGV2ZW50c0hhbmRsZXIub24oJ3Byb2plY3RzUGFyc2VkJywgcHJvamVjdHMgPT4ge1xuICAgIGZvciAobGV0IGkgPSAxLCBsID0gcHJvamVjdHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBjcmVhdGVQcm9qZWN0VGFiKHByb2plY3RzW2ldKTtcbiAgICB9XG4gIH0pO1xuXG4gIGV2ZW50c0hhbmRsZXIub24oJ3Byb2plY3RBZGRlZCcsIGNyZWF0ZVByb2plY3RUYWIpO1xuICBldmVudHNIYW5kbGVyLm9uKCdwcm9qZWN0RGVsZXRlZCcsIGRlbGV0ZVByb2plY3RUYWIpO1xuICBldmVudHNIYW5kbGVyLm9uKCd0b2Rvc0NoYW5nZWQnLCBjaGFuZ2VTdGF0dXNOdW1iZXIpO1xuXG4gIHRhYnMuZm9yRWFjaChwcm9qZWN0ID0+IHtcbiAgICBwcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VsZWN0VGFiKTtcbiAgfSlcblxuICBhbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKCdhbGxUYWJDbGlja2VkJyk7XG4gIH0pXG5cbiAgcGVuZGluZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ2FsbFRhYkNsaWNrZWQnKTtcbiAgfSk7XG5cbiAgcGVuZGluZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ3BlbmRpbmdUYWJDbGlja2VkJyk7XG4gIH0pO1xuXG4gIHRvZGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcigndG9kYXlUYWJDbGlja2VkJyk7XG4gIH0pO1xuXG4gIGNvbXBsZXRlZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ2NvbXBsZXRlZFRhYkNsaWNrZWQnKTtcbiAgfSk7XG59KSgpO1xuXG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3RUYWIocHJvamVjdCkge1xuICBjb25zdCBsaVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICBjb25zdCBuYW1lRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IHN0YXR1c0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgY29uc3QgZGVsZXRlQnV0dG9uSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgY29uc3Qgc3RhdHVzQ2lyY2xlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IHN0YXR1c051bWJlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gIGxpV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdsaXN0Jyk7XG4gIHN0YXR1c0Rpdi5jbGFzc0xpc3QuYWRkKCdsaXN0LXN0YXR1cycpO1xuICBkZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZCgnZGVsZXRlLXByb2plY3QtYnV0dG9uJyk7XG4gIGRlbGV0ZUJ1dHRvbkljb24uY2xhc3NMaXN0LmFkZCgnaWNvbmlmeScpO1xuICBzdGF0dXNDaXJjbGVEaXYuY2xhc3NMaXN0LmFkZCgnbGlzdC1zdGF0dXMtY2lyY2xlJywgJ3Byb2plY3QnKTtcbiAgc3RhdHVzTnVtYmVyRGl2LmNsYXNzTGlzdC5hZGQoJ2xpc3Qtc3RhdHVzLW51bWJlcicpO1xuXG4gIGxpV3JhcHBlci5kYXRhc2V0LnByb2plY3QgPSBwcm9qZWN0LmlkO1xuICBkZWxldGVCdXR0b25JY29uLmRhdGFzZXQuaWNvbiA9IFwiZmx1ZW50OmRlbGV0ZS0yNC1maWxsZWRcIjtcblxuICBuYW1lRGl2LnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lO1xuICBzdGF0dXNOdW1iZXJEaXYudGV4dENvbnRlbnQgPSBwcm9qZWN0LnRvZG9zLmxlbmd0aDtcblxuICBsaVdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZWxlY3RUYWIpO1xuICBsaVdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUtcHJvamVjdC1idXR0b24nKSkgcmV0dXJuXG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKCdwcm9qZWN0VGFiQ2xpY2tlZCcsIGxpV3JhcHBlci5kYXRhc2V0LnByb2plY3QpO1xuICB9KTtcbiAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4geyBcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ3Byb2plY3REZWxldGVkJywgcHJvamVjdC5pZClcbiAgfSk7XG5cbiAgZGVsZXRlQnV0dG9uLmFwcGVuZChkZWxldGVCdXR0b25JY29uKTtcbiAgc3RhdHVzRGl2LmFwcGVuZChkZWxldGVCdXR0b24sIHN0YXR1c0NpcmNsZURpdiwgc3RhdHVzTnVtYmVyRGl2KTtcbiAgbGlXcmFwcGVyLmFwcGVuZChuYW1lRGl2LCBzdGF0dXNEaXYpO1xuXG4gIHByb2plY3RzTGlzdC5hcHBlbmQobGlXcmFwcGVyKTtcblxuICByZXR1cm4gbGlXcmFwcGVyXG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3RUYWIoaWQpIHtcbiAgY29uc3QgcHJvamVjdFRhYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXByb2plY3Q9XCIke2lkfVwiXWApXG4gIHByb2plY3RUYWIucmVtb3ZlKCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3RJbnB1dCgpIHtcbiAgY29uc3QgaW5wdXREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBjb25zdCBpbnB1dEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXG4gIGlucHV0RGl2LmNsYXNzTGlzdC5hZGQoJ2ZsZXgtcm93Jyk7XG4gIGlucHV0LmNsYXNzTGlzdC5hZGQoJ2NyZWF0ZS1wcm9qZWN0LWlucHV0Jyk7XG4gIGlucHV0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtaW5wdXQtYnV0dG9uJyk7XG5cbiAgaW5wdXREaXYuZGF0YXNldC50eXBlID0gJ2lucHV0LWRpdic7XG5cbiAgaW5wdXRCdXR0b24udGV4dENvbnRlbnQgPSAnKyc7XG4gIGlucHV0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcigncHJvamVjdElucHV0ZWQnLCBpbnB1dC52YWx1ZSk7XG4gICAgaW5wdXREaXYucmVtb3ZlKCk7XG4gIH0pO1xuXG4gIGlucHV0RGl2LmFwcGVuZChpbnB1dCwgaW5wdXRCdXR0b24pO1xuXG4gIGNyZWF0ZVByb2plY3RCdXR0b24uYmVmb3JlKGlucHV0RGl2KTtcbiAgaW5wdXQuZm9jdXMoKTtcblxuICByZXR1cm4gaW5wdXREaXZcbn1cblxuZnVuY3Rpb24gZGVzdHJveUlucHV0RGl2SWZDbGlja2VkT3V0c2lkZShlKSB7XG4gIGlmIChlLnRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQudHlwZSA9PT0gJ2lucHV0LWRpdicgfHxcbiAgICAgIGUudGFyZ2V0LmlkID09PSAnY3JlYXRlLXByb2plY3QnKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdHlwZT1pbnB1dC1kaXZdJylcbiAgICAuZm9yRWFjaChlbCA9PiBlbC5yZW1vdmUoKSk7XG59XG5cbmZ1bmN0aW9uIHNlbGVjdFRhYigpIHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpc3QnKVxuICAgIC5mb3JFYWNoKHByb2plY3QgPT4gcHJvamVjdC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gIHRoaXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG59XG5cbmZ1bmN0aW9uIGNoYW5nZVN0YXR1c051bWJlcihsZW5ndGhPYmplY3QpIHtcbiAgY29uc3QgcHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wcm9qZWN0XScpO1xuXG4gIGFsbC5xdWVyeVNlbGVjdG9yKCcubGlzdC1zdGF0dXMtbnVtYmVyJykudGV4dENvbnRlbnQgPSBsZW5ndGhPYmplY3QuYWxsTGVuZ3RoO1xuICBwZW5kaW5nLnF1ZXJ5U2VsZWN0b3IoJy5saXN0LXN0YXR1cy1udW1iZXInKS50ZXh0Q29udGVudCA9IGxlbmd0aE9iamVjdC5wZW5kaW5nTGVuZ3RoO1xuICB0b2RheS5xdWVyeVNlbGVjdG9yKCcubGlzdC1zdGF0dXMtbnVtYmVyJykudGV4dENvbnRlbnQgPSBsZW5ndGhPYmplY3QudG9kYXlMZW5ndGg7XG4gIGNvbXBsZXRlZC5xdWVyeVNlbGVjdG9yKCcubGlzdC1zdGF0dXMtbnVtYmVyJykudGV4dENvbnRlbnQgPSBsZW5ndGhPYmplY3QuY29tcGxldGVkTGVuZ3RoO1xuXG4gIHByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgcHJvamVjdC5xdWVyeVNlbGVjdG9yKCcubGlzdC1zdGF0dXMtbnVtYmVyJykudGV4dENvbnRlbnQgPSBsZW5ndGhPYmplY3RbcHJvamVjdC5kYXRhc2V0LnByb2plY3RdO1xuICB9KTtcbn1cbiIsImV4cG9ydCBjb25zdCBldmVudHNIYW5kbGVyID0gKCgpID0+IHtcbiAgbGV0IGV2ZW50cyA9IHt9O1xuXG4gIHJldHVybiB7XG5cbiAgICBvbihldmVudE5hbWUsIGZuKSB7XG4gICAgICBldmVudHNbZXZlbnROYW1lXSA9IGV2ZW50c1tldmVudE5hbWVdIHx8IFtdO1xuICAgICAgZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChmbik7XG4gICAgfSxcblxuICAgIG9mZihldmVudE5hbWUsIHJlbW92ZWRGbikge1xuICAgICAgaWYgKGV2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgICAgIGV2ZW50c1tldmVudE5hbWVdID0gZXZlbnRzW2V2ZW50TmFtZV0uZmlsdGVyKGZuID0+IGZuICE9PSByZW1vdmVkRm4pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB0cmlnZ2VyKGV2ZW50TmFtZSwgZGF0YSkge1xuICAgICAgaWYgKGV2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgICAgIGV2ZW50c1tldmVudE5hbWVdLmZvckVhY2goZm4gPT4ge1xuICAgICAgICAgIGZuKGRhdGEpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxufSkoKTtcbiIsImltcG9ydCB7IGV2ZW50c0hhbmRsZXIgfSBmcm9tICcuL2V2ZW50c0hhbmRsZXInO1xuXG4oKCkgPT4ge1xuICBjb25zdCBwYXJzZWRQcm9qZWN0cyA9IHBhcnNlTG9jYWxTdG9yYWdlKCdwcm9qZWN0cycpIHx8IFtdO1xuXG4gIGV2ZW50c0hhbmRsZXIudHJpZ2dlcignYXBwU3RhcnRlZCcsIGNvbnZlcnREYXRlc1RvRGF0ZU9iamVjdHMocGFyc2VkUHJvamVjdHMpKTtcblxuICBldmVudHNIYW5kbGVyLm9uKCd0b2RvTGlzdENoYW5nZWQnLCBwcm9qZWN0cyA9PiB7XG4gICAgc2F2ZVRvTG9jYWxTdG9yYWdlKCdwcm9qZWN0cycsIHByb2plY3RzKTtcbiAgfSk7XG59KSgpO1xuXG5mdW5jdGlvbiBzYXZlVG9Mb2NhbFN0b3JhZ2Uoa2V5LCBvYmopIHtcbiAgY29uc3Qgc3RyaW5naWZpZWRPYmplY3QgPSBKU09OLnN0cmluZ2lmeShvYmopO1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHN0cmluZ2lmaWVkT2JqZWN0KTtcbn1cblxuZnVuY3Rpb24gcGFyc2VMb2NhbFN0b3JhZ2Uoa2V5KSB7XG4gIGNvbnN0IHN0cmluZ2lmaWVkT2JqZWN0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgY29uc3QgcGFyc2VkT2JqZWN0ID0gSlNPTi5wYXJzZShzdHJpbmdpZmllZE9iamVjdCk7XG4gIHJldHVybiBwYXJzZWRPYmplY3Rcbn1cblxuZnVuY3Rpb24gY29udmVydERhdGVzVG9EYXRlT2JqZWN0cyhwYXJzZWRQcm9qZWN0cykge1xuICBwYXJzZWRQcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgIHByb2plY3QudG9kb3MuZm9yRWFjaCh0b2RvID0+IHRvZG8uZHVlRGF0ZSA9ICh0b2RvLmR1ZURhdGUpID8gbmV3IERhdGUodG9kby5kdWVEYXRlKSA6IG5ldyBEYXRlKHVuZGVmaW5lZCkpO1xuICB9KTtcbiAgcmV0dXJuIHBhcnNlZFByb2plY3RzXG59XG4iLCJpbXBvcnQgeyBldmVudHNIYW5kbGVyIH0gZnJvbSBcIi4vZXZlbnRzSGFuZGxlclwiXG5cbmNvbnN0IHRvZG9MaXN0ID0gKCgpID0+IHtcbiAgbGV0IHByb2plY3RzID0gW1xuICAgIHtcbiAgICAgIG5hbWU6ICdkZWZhdWx0IHRvZG8gbGlzdCcsXG4gICAgICB0b2RvczogW10sXG4gICAgICBpZDogMVxuICAgIH1cbiAgXVxuXG4gIGZ1bmN0aW9uIF9naXZlSWRUb0l0ZW0oYXJyKSB7XG4gICAgY29uc3QgYXJyU29ydGVkQnlJZCA9IFsuLi5hcnJdLnNvcnQoKGl0ZW0xLCBpdGVtMikgPT4gaXRlbTEuaWQgLSBpdGVtMi5pZCk7XG4gICAgY29uc3QgbGFzdEl0ZW0gPSBhcnJTb3J0ZWRCeUlkW2FyclNvcnRlZEJ5SWQubGVuZ3RoIC0gMV07XG4gICAgaWYgKGxhc3RJdGVtKSByZXR1cm4gbGFzdEl0ZW0uaWQgKyAxXG4gICAgcmV0dXJuIDFcbiAgfVxuXG4gIGZ1bmN0aW9uIF9maW5kUHJvamVjdEJ5SWQoaWQpIHtcbiAgICByZXR1cm4gcHJvamVjdHMuZmluZChwcm9qZWN0ID0+IHByb2plY3QuaWQgPT09IE51bWJlcihpZCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gX2ZpbmRUb2RvQnlJZChpZCkge1xuICAgIGZvciAoY29uc3QgcHJvamVjdCBvZiBwcm9qZWN0cykge1xuICAgICAgZm9yIChjb25zdCB0b2RvIG9mIHByb2plY3QudG9kb3MpIHtcbiAgICAgICAgaWYgKHRvZG8uaWQgPT09IGlkKSByZXR1cm4gdG9kb1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF9wZW5kaW5nT2ZQcm9qZWN0KGlkKSB7XG4gICAgcmV0dXJuIF9zb3J0VG9kb3MoXG4gICAgICBfZmluZFByb2plY3RCeUlkKGlkKS50b2Rvc1xuICAgICAgLmZpbHRlcih0b2RvID0+IHRvZG8uc3RhdHVzID09PSAncGVuZGluZycpXG4gICAgKVxuICB9XG5cbiAgZnVuY3Rpb24gX2ZpbmRMZW5ndGhzT2ZQcm9qZWN0cygpIHtcbiAgICBjb25zdCBwcm9qZWN0c0xlbmd0aHMgPSB7fVxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gcHJvamVjdHMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICBjb25zdCBpZCA9IHByb2plY3RzW2ldLmlkO1xuICAgICAgcHJvamVjdHNMZW5ndGhzW2lkXSA9IF9maW5kUHJvamVjdEJ5SWQoaWQpLnRvZG9zLmZpbHRlcih0b2RvID0+IHRvZG8uc3RhdHVzID09PSAncGVuZGluZycpLmxlbmd0aDtcbiAgICB9XG4gICAgY29uc3Qgc3RhdGljVGFic0xlbmd0aHMgPSB7XG4gICAgICBhbGxMZW5ndGg6IHRvZG9MaXN0LnRvZG9zLmxlbmd0aCxcbiAgICAgIHBlbmRpbmdMZW5ndGg6IHRvZG9MaXN0LnBlbmRpbmcubGVuZ3RoLFxuICAgICAgdG9kYXlMZW5ndGg6IHRvZG9MaXN0LnRvZGF5Lmxlbmd0aCxcbiAgICAgIGNvbXBsZXRlZExlbmd0aDogdG9kb0xpc3QuY29tcGxldGVkLmxlbmd0aCxcbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXG4gICAgICBwcm9qZWN0c0xlbmd0aHMsXG4gICAgICBzdGF0aWNUYWJzTGVuZ3Roc1xuICAgIClcbiAgfVxuXG4gIGZ1bmN0aW9uIF9zb3J0VG9kb3ModG9kb3MpIHtcbiAgICByZXR1cm4gWy4uLnRvZG9zXS5zb3J0KCh0b2RvMSwgdG9kbzIpID0+IHRvZG8xLmR1ZURhdGUgLSB0b2RvMi5kdWVEYXRlKVxuICAgICAgLnNvcnQoKHRvZG8xLCB0b2RvMikgPT4gdG9kbzEucHJpb3JpdHkgLSB0b2RvMi5wcmlvcml0eSlcbiAgICAgIC5zb3J0KCh0b2RvMSwgdG9kbzIpID0+IHRvZG8xLnN0YXR1cyA9PT0gJ2NvbXBsZXRlZCcgPyAxIDogLTEpXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGFkZFRvZG8oe25hbWUsIGR1ZURhdGUsIHRhZ3MsIG5vdGVzLCBwcmlvcml0eSwgcHJvamVjdElkID0gMX0pIHtcbiAgICAgIGNvbnN0IHN0YXR1cyA9ICdwZW5kaW5nJztcbiAgICAgIGNvbnN0IGlkID0gX2dpdmVJZFRvSXRlbSh0b2RvTGlzdC50b2Rvcyk7XG4gICAgICBjb25zdCB0b2RvID0gIHsgbmFtZSwgZHVlRGF0ZSwgdGFncywgbm90ZXMsIHByaW9yaXR5LCBzdGF0dXMsIGlkLCBwcm9qZWN0SWQgfTtcbiAgICAgIGNvbnN0IHByb2plY3QgPSBfZmluZFByb2plY3RCeUlkKHByb2plY3RJZCk7XG4gICAgICBpZiAoIXByb2plY3QpIHJldHVybiBcbiAgICAgIHByb2plY3QudG9kb3MucHVzaCh0b2RvKTtcbiAgICAgIHJldHVybiB0b2RvXG4gICAgfSxcblxuICAgIGdldFRvZG8oaWQpIHtcbiAgICAgIHJldHVybiBfZmluZFRvZG9CeUlkKGlkKVxuICAgIH0sXG5cbiAgICByZW1vdmVUb2RvKGlkKSB7XG4gICAgICBwcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICBwcm9qZWN0LnRvZG9zID0gcHJvamVjdC50b2Rvcy5maWx0ZXIodG9kbyA9PiB0b2RvLmlkICE9PSBOdW1iZXIoaWQpKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICB0b2dnbGVUb2RvKGlkKSB7XG4gICAgICBjb25zdCB0b2RvID0gX2ZpbmRUb2RvQnlJZChpZCk7XG4gICAgICBpZiAoIXRvZG8pIHJldHVyblxuICAgICAgdG9kby5zdGF0dXMgPSAodG9kby5zdGF0dXMgPT09ICdwZW5kaW5nJykgPyAnY29tcGxldGVkJyA6ICdwZW5kaW5nJztcbiAgICB9LFxuXG4gICAgYWRkUHJvamVjdChuYW1lKSB7XG4gICAgICBjb25zdCB0b2RvcyA9IFtdO1xuICAgICAgY29uc3QgaWQgPSBfZ2l2ZUlkVG9JdGVtKHByb2plY3RzKTtcbiAgICAgIGNvbnN0IHByb2plY3QgPSB7IG5hbWUsIHRvZG9zLCBpZCB9XG4gICAgICBwcm9qZWN0cy5wdXNoKHByb2plY3QpO1xuICAgICAgcmV0dXJuIHByb2plY3RcbiAgICB9LFxuXG4gICAgZ2V0UHJvamVjdChpZCkge1xuICAgICAgY29uc3QgcHJvamVjdCA9IF9maW5kUHJvamVjdEJ5SWQoaWQpO1xuICAgICAgY29uc3QgdG9kb3MgPSBfc29ydFRvZG9zKHByb2plY3QudG9kb3MpXG4gICAgICByZXR1cm4gey4uLnByb2plY3QsIHRvZG9zfVxuICAgIH0sXG5cbiAgICByZW1vdmVQcm9qZWN0KGlkKSB7XG4gICAgICAvLyBjYW4ndCByZW1vdmUgZGVmYXVsdCBwcm9qZWN0XG4gICAgICBpZiAoTnVtYmVyKGlkKSA9PT0gMSkgcmV0dXJuXG4gICAgICBwcm9qZWN0cyA9IHByb2plY3RzLmZpbHRlcihwcm9qZWN0ID0+IHByb2plY3QuaWQgIT09IE51bWJlcihpZCkpO1xuICAgIH0sXG5cbiAgICBnZXQgbGVuZ3RocygpIHtcbiAgICAgIHJldHVybiBfZmluZExlbmd0aHNPZlByb2plY3RzKClcbiAgICB9LFxuXG4gICAgZ2V0IHRvZG9zKCkge1xuICAgICAgbGV0IHRvZG9zID0gW107XG4gICAgICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgcHJvamVjdHMpIHtcbiAgICAgICAgdG9kb3MgPSB0b2Rvcy5jb25jYXQocHJvamVjdC50b2Rvcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gX3NvcnRUb2Rvcyh0b2RvcylcbiAgICB9LFxuXG4gICAgZ2V0IHByb2plY3RzKCkgeyByZXR1cm4gcHJvamVjdHMgfSxcbiAgICBzZXQgcHJvamVjdHModmFsKSB7IHByb2plY3RzID0gdmFsIH0sXG5cbiAgICBnZXQgcGVuZGluZygpIHtcbiAgICAgIHJldHVybiBfc29ydFRvZG9zKHRoaXMudG9kb3MuZmlsdGVyKHRvZG8gPT4gdG9kby5zdGF0dXMgPT09ICdwZW5kaW5nJykpO1xuICAgIH0sXG5cbiAgICBnZXQgY29tcGxldGVkKCkge1xuICAgICAgcmV0dXJuIF9zb3J0VG9kb3ModGhpcy50b2Rvcy5maWx0ZXIodG9kbyA9PiB0b2RvLnN0YXR1cyA9PT0gJ2NvbXBsZXRlZCcpKTtcbiAgICB9LFxuXG4gICAgZ2V0IHRvZGF5KCkge1xuICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgcmV0dXJuIF9zb3J0VG9kb3ModGhpcy50b2Rvcy5maWx0ZXIodG9kbyA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgdG9kby5kdWVEYXRlLmdldERhdGUoKSA9PT0gdG9kYXkuZ2V0RGF0ZSgpICYmXG4gICAgICAgICAgdG9kby5kdWVEYXRlLmdldE1vbnRoKCkgPT09IHRvZGF5LmdldE1vbnRoKCkgJiZcbiAgICAgICAgICB0b2RvLmR1ZURhdGUuZ2V0RnVsbFllYXIoKSA9PT0gdG9kYXkuZ2V0RnVsbFllYXIoKSAmJlxuICAgICAgICAgIHRvZG8uc3RhdHVzID09PSAncGVuZGluZydcbiAgICAgICAgKVxuICAgICAgfSkpO1xuICAgIH0sXG5cbiAgICBjdXJyZW50UHJvamVjdDogMSxcbiAgICBlZGl0ZWRUb2RvOiAtMSxcbiAgICBtb2RlOiAnYWRkaW5nVG9kbydcbiAgfVxufSkoKTtcblxuKCgpID0+IHtcbiAgZXZlbnRzSGFuZGxlci5vbignYXBwU3RhcnRlZCcsIHBhcnNlZFByb2plY3RzID0+IHtcbiAgICBpZiAocGFyc2VkUHJvamVjdHMubGVuZ3RoID4gMCkge1xuICAgICAgdG9kb0xpc3QucHJvamVjdHMgPSBwYXJzZWRQcm9qZWN0cztcbiAgICB9IGVsc2UgeyBcbiAgICAgIGNyZWF0ZUV4YW1wbGVUb2RvcygpO1xuICAgIH1cbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ2FsbFRhYlNlbGVjdGVkJywgdG9kb0xpc3QudG9kb3MpO1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcigncHJvamVjdHNQYXJzZWQnLCB0b2RvTGlzdC5wcm9qZWN0cyk7XG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKCd0b2Rvc0NoYW5nZWQnLCB0b2RvTGlzdC5sZW5ndGhzKTtcbiAgfSk7XG5cbiAgZXZlbnRzSGFuZGxlci5vbignYWxsVGFiQ2xpY2tlZCcsICgpID0+IHtcbiAgICB0b2RvTGlzdC5jdXJyZW50UHJvamVjdCA9IDE7XG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKCdhbGxUYWJTZWxlY3RlZCcsIHRvZG9MaXN0LnRvZG9zKTtcbiAgfSk7XG5cbiAgZXZlbnRzSGFuZGxlci5vbigncGVuZGluZ1RhYkNsaWNrZWQnLCAoKSA9PiB7XG4gICAgdG9kb0xpc3QuY3VycmVudFByb2plY3QgPSAxO1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcigncGVuZGluZ1RhYlNlbGVjdGVkJywgdG9kb0xpc3QucGVuZGluZyk7XG4gIH0pO1xuXG4gIGV2ZW50c0hhbmRsZXIub24oJ3RvZGF5VGFiQ2xpY2tlZCcsICgpID0+IHtcbiAgICB0b2RvTGlzdC5jdXJyZW50UHJvamVjdCA9IDE7XG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKCd0b2RheVRhYlNlbGVjdGVkJywgdG9kb0xpc3QudG9kYXkpO1xuICB9KTtcblxuICBldmVudHNIYW5kbGVyLm9uKCdjb21wbGV0ZWRUYWJDbGlja2VkJywgKCkgPT4ge1xuICAgIHRvZG9MaXN0LmN1cnJlbnRQcm9qZWN0ID0gMTtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ2NvbXBsZXRlZFRhYlNlbGVjdGVkJywgdG9kb0xpc3QuY29tcGxldGVkKTtcbiAgfSk7XG5cbiAgZXZlbnRzSGFuZGxlci5vbigncHJvamVjdFRhYkNsaWNrZWQnLCBwcm9qZWN0SWQgPT4ge1xuICAgIGNvbnN0IHByb2plY3QgPSB0b2RvTGlzdC5nZXRQcm9qZWN0KHByb2plY3RJZCk7XG4gICAgdG9kb0xpc3QuY3VycmVudFByb2plY3QgPSBwcm9qZWN0SWQ7XG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKCdwcm9qZWN0VGFiU2VsZWN0ZWQnLCBwcm9qZWN0KTtcbiAgfSk7XG5cbiAgZXZlbnRzSGFuZGxlci5vbigncHJvamVjdElucHV0ZWQnLCBuYW1lID0+IHtcbiAgICBjb25zdCBwcm9qZWN0ID0gdG9kb0xpc3QuYWRkUHJvamVjdChuYW1lKTtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ3Byb2plY3RBZGRlZCcsIHByb2plY3QpO1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcigndG9kb0xpc3RDaGFuZ2VkJywgdG9kb0xpc3QucHJvamVjdHMpO1xuICB9KTtcblxuICBldmVudHNIYW5kbGVyLm9uKCdwcm9qZWN0RGVsZXRlZCcsIHByb2plY3RJZCA9PiB7XG4gICAgdG9kb0xpc3QucmVtb3ZlUHJvamVjdChwcm9qZWN0SWQpO1xuICAgIGlmIChwcm9qZWN0SWQgPT09IHRvZG9MaXN0LmN1cnJlbnRQcm9qZWN0KSB7XG4gICAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ2FsbFRhYlNlbGVjdGVkJyk7XG4gICAgfSBcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ3RvZG9MaXN0Q2hhbmdlZCcsIHRvZG9MaXN0LnByb2plY3RzKTtcbiAgfSk7XG5cbiAgZXZlbnRzSGFuZGxlci5vbigndG9kb0lucHV0ZWQnLCB0b2RvRGF0YSA9PiB7XG4gICAgaWYgKHRvZG9MaXN0Lm1vZGUgPT09ICdlZGl0aW5nVG9kbycpIHtcbiAgICAgIGNvbnN0IHRvZG8gPSB0b2RvTGlzdC5nZXRUb2RvKHRvZG9MaXN0LmVkaXRlZFRvZG8pO1xuICAgICAgdG9kby5uYW1lID0gdG9kb0RhdGEubmFtZTtcbiAgICAgIHRvZG8uZHVlRGF0ZSA9IHRvZG9EYXRhLmR1ZURhdGU7XG4gICAgICB0b2RvLnRhZ3MgPSB0b2RvRGF0YS50YWdzO1xuICAgICAgdG9kby5ub3RlcyA9IHRvZG9EYXRhLm5vdGVzO1xuICAgICAgdG9kby5wcmlvcml0eSA9IHRvZG9EYXRhLnByaW9yaXR5O1xuICAgICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKCd0b2RvRWRpdGVkJywgdG9kbyk7XG4gICAgfVxuICAgIGlmICh0b2RvTGlzdC5tb2RlID09PSAnYWRkaW5nVG9kbycpIHtcbiAgICAgIGNvbnN0IHRvZG8gPSB0b2RvTGlzdC5hZGRUb2RvKHsuLi50b2RvRGF0YSwgcHJvamVjdElkOiB0b2RvTGlzdC5jdXJyZW50UHJvamVjdH0pO1xuICAgICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKCd0b2RvQWRkZWQnLCB0b2RvKTtcbiAgICB9XG4gICAgdG9kb0xpc3QubW9kZSA9ICdhZGRpbmdUb2RvJztcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ3RvZG9zQ2hhbmdlZCcsIHRvZG9MaXN0Lmxlbmd0aHMpO1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcigndG9kb0xpc3RDaGFuZ2VkJywgdG9kb0xpc3QucHJvamVjdHMpO1xuICB9KTtcblxuICBldmVudHNIYW5kbGVyLm9uKCd0b2RvVG9nZ2xlZCcsIHRvZG9JZCA9PiB7XG4gICAgdG9kb0xpc3QudG9nZ2xlVG9kbyh0b2RvSWQpO1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcigndG9kb3NDaGFuZ2VkJywgdG9kb0xpc3QubGVuZ3Rocyk7XG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKCd0b2RvTGlzdENoYW5nZWQnLCB0b2RvTGlzdC5wcm9qZWN0cyk7XG4gIH0pO1xuXG4gIGV2ZW50c0hhbmRsZXIub24oJ2VkaXRCdXR0b25DbGlja2VkJywgdG9kbyA9PiB7XG4gICAgdG9kb0xpc3QubW9kZSA9ICdlZGl0aW5nVG9kbyc7XG4gICAgdG9kb0xpc3QuZWRpdGVkVG9kbyA9IHRvZG8uaWQ7XG4gIH0pO1xuXG4gIGV2ZW50c0hhbmRsZXIub24oJ2RlbGV0ZUJ1dHRvbkNsaWNrZWQnLCB0b2RvID0+IHtcbiAgICB0b2RvTGlzdC5yZW1vdmVUb2RvKHRvZG8uaWQpO1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcigndG9kb0RlbGV0ZWQnLCB0b2RvKTtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ3RvZG9zQ2hhbmdlZCcsIHRvZG9MaXN0Lmxlbmd0aHMpO1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcigndG9kb0xpc3RDaGFuZ2VkJywgdG9kb0xpc3QucHJvamVjdHMpO1xuICB9KTtcblxuICBldmVudHNIYW5kbGVyLm9uKCdjbGVhckRvbmVDbGlja2VkJywgdG9kb3NJZHMgPT4ge1xuICAgIGZvciAoY29uc3QgaWQgb2YgdG9kb3NJZHMpIHtcbiAgICAgIHRvZG9MaXN0LnJlbW92ZVRvZG8oaWQpO1xuICAgIH1cbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ3RvZG9zQ2hhbmdlZCcsIHRvZG9MaXN0Lmxlbmd0aHMpO1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcigndG9kb0xpc3RDaGFuZ2VkJywgdG9kb0xpc3QucHJvamVjdHMpO1xuICB9KTtcblxuICBmdW5jdGlvbiBjcmVhdGVFeGFtcGxlVG9kb3MoKSB7XG4gICAgdG9kb0xpc3QuYWRkVG9kbyh7bmFtZTogJ1Rha2UgZG9nIGZvciBhIHdhbGsnLCBkdWVEYXRlOiBuZXcgRGF0ZSgnMjAyMS0xMi0xNCcpLCB0YWdzOiBbJ2RvZ2dvJywgJ2hlYWx0aCddLCBub3RlczogWycnXSwgcHJpb3JpdHk6IDF9KTtcbiAgICB0b2RvTGlzdC5hZGRUb2RvKHtuYW1lOiAnQnV5IG1pbGsnLCBkdWVEYXRlOiBuZXcgRGF0ZSh1bmRlZmluZWQpLCB0YWdzOiBbJ2dyb2NlcmllcyddLCBub3RlczogWycnXSwgcHJpb3JpdHk6IDN9KTtcbiAgICB0b2RvTGlzdC5hZGRUb2RvKHtuYW1lOiAnR28gdG8gY2luZW1hIHdpdGggSm9zaCcsIGR1ZURhdGU6IG5ldyBEYXRlKCcyMDIxLTEyLTE2JyksIHRhZ3M6IFsnam9zaCcsICdyZWxheCddLCBub3RlczogWyd2aXNpdCBBbm5lIG9uIG91ciB3YXkgaG9tZSddLCBwcmlvcml0eTogMn0pO1xuICAgIHRvZG9MaXN0LmFkZFRvZG8oe25hbWU6ICdWaXNpdCBkZW50aXN0JywgZHVlRGF0ZTogbmV3IERhdGUoJzIwMjEtMTItMTgnKSwgdGFnczogWydoZWFsdGgnXSwgbm90ZXM6IFsnMTc6MDAnLCAnbm90IGVhdGluZyBiZWZvcmUgZ29pbmcgdG8gZGVudGlzdCddLCBwcmlvcml0eTogMX0pO1xuICAgIHRvZG9MaXN0LmFkZFRvZG8oe25hbWU6ICdWaXNpdCBuZXcgY2FuZHkgc2hvcCcsIGR1ZURhdGU6IG5ldyBEYXRlKHVuZGVmaW5lZCksIHRhZ3M6IFsnJ10sIG5vdGVzOiBbJyddLCBwcmlvcml0eTogM30pO1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcigndG9kb0xpc3RDaGFuZ2VkJywgdG9kb0xpc3QucHJvamVjdHMpO1xuICB9XG59KSgpO1xuIiwiZnVuY3Rpb24gZm9ybWF0RGF0ZShkYXRlKSB7XG4gIGlmIChpc05hTihkYXRlLmdldFRpbWUoKSkpIHJldHVybiBgTm8gZHVlIGRhdGVgXG5cbiAgY29uc3QgeXl5eSA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgY29uc3QgbW0gPSAoZGF0ZS5nZXRNb250aCgpICsgMSkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xuICBjb25zdCBkZCA9IGRhdGUuZ2V0RGF0ZSgpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcblxuICByZXR1cm4gYCR7eXl5eX0tJHttbX0tJHtkZH1gXG59XG5cbmV4cG9ydCB7XG4gIGZvcm1hdERhdGVcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9jc3Mvc3R5bGUuY3NzXCI7XG5pbXBvcnQgXCIuL2pzL3RvZG8uanNcIjtcbmltcG9ydCBcIi4vanMvZXZlbnRzSGFuZGxlclwiO1xuaW1wb3J0IFwiLi9qcy9kb20vc2lkZWJhci5qc1wiO1xuaW1wb3J0IFwiLi9qcy9kb20vbW9kYWwuanNcIjtcbmltcG9ydCBcIi4vanMvZG9tL2xpc3QuanNcIjtcbmltcG9ydCBcIi4vanMvc3RvcmFnZVwiO1xuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=