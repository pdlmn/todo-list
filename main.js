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



const todosList = document.querySelector("#todos");
const addTodoButton = document.querySelector("#add-todo");
const clearDoneButton = document.querySelector("#clear-done");
let listH2 = document.querySelector(".todos-wrapper h2");

(() => {
  _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on("allTabSelected", (todos) => {
    listH2.textContent = "All";
    todosList.innerHTML = "";
    renderTodos(todos);
  });

  _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on("pendingTabSelected", (todos) => {
    listH2.textContent = "Pending";
    todosList.innerHTML = "";
    renderTodos(todos);
  });

  _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on("todayTabSelected", (todos) => {
    listH2.textContent = "Today";
    todosList.innerHTML = "";
    renderTodos(todos);
  });

  _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on("completedTabSelected", (todos) => {
    listH2.textContent = "Completed";
    todosList.innerHTML = "";
    renderTodos(todos);
  });

  _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on("projectTabSelected", (project) => {
    listH2.textContent = project.name;
    todosList.innerHTML = "";
    renderTodos(project.todos);
  });

  _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on("todoAdded", (todo) => {
    todosList.prepend(createTodo(todo));
  });

  _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on("todoEdited", (todo) => {
    const oldTodo = document.querySelector(`[data-todo="todo${todo.id}"]`);
    const newTodo = createTodo(todo);
    keepDescriptionVisibility(oldTodo, newTodo);

    oldTodo.after(newTodo);
    oldTodo.remove();
  });

  _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on("todoDeleted", (todo) => {
    document.querySelector(`[data-todo="todo${todo.id}"]`).remove();
  });

  addTodoButton.addEventListener("click", () => {
    _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger("modalActivated");
  });

  clearDoneButton.addEventListener("click", () => {
    const doneTodosOnScreen = document.querySelectorAll(".todo-checked");
    const todosIds = [];
    doneTodosOnScreen.forEach((todo) => {
      todosIds.push(todo.querySelector("input").id.slice(4));
      todo.parentNode.parentNode.remove();
    });
    _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger("clearDoneClicked", todosIds);
  });
})();

function createTodo(todo) {
  const todoWrapper = document.createElement("div");
  todoWrapper.append(createTodoLine(todo), createTodoDetails(todo));
  todoWrapper.classList.add("flex-column");
  todoWrapper.dataset.todo = `todo${todo.id}`;

  return todoWrapper;
}

function createTodoLine(todo) {
  const todoLine = document.createElement("div");
  const checkboxWrapper = document.createElement("div");
  const checkbox = document.createElement("input");
  const label = document.createElement("label");

  const buttonsWrapper = document.createElement("div");
  const detailsButton = document.createElement("button");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const detailsIcon = document.createElement("span");
  const editIcon = document.createElement("span");
  const deleteIcon = document.createElement("span");

  if (todo.status === "completed") {
    checkboxWrapper.classList.add("todo-checked");
    checkbox.checked = true;
  }
  checkboxWrapper.classList.add("no-user-select");
  todoLine.classList.add("todo", `priority-${todo.priority}`);
  buttonsWrapper.classList.add("todo-buttons");
  [detailsButton, editButton, deleteButton].forEach((button) =>
    button.classList.add("todo-icon")
  );
  [detailsIcon, editIcon, deleteIcon].forEach((icon) =>
    icon.classList.add("iconify")
  );

  detailsIcon.dataset.icon = "ic:round-description";
  editIcon.dataset.icon = "bx:bx-edit";
  deleteIcon.dataset.icon = "fluent:delete-24-filled";

  checkbox.addEventListener("change", () => {
    _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger("todoToggled", todo.id);
    checkboxWrapper.classList.toggle("todo-checked");
  });

  detailsButton.addEventListener("click", () => {
    document.querySelector(`#details${todo.id}`).classList.toggle("invisible");
  });

  editButton.addEventListener("click", () => {
    _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger("editButtonClicked", todo);
  });

  deleteButton.addEventListener("click", () => {
    _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger("deleteButtonClicked", todo);
  });

  checkbox.type = "checkbox";
  label.htmlFor = `todo${todo.id}`;

  checkbox.id = `todo${todo.id}`;

  label.textContent = todo.name;

  detailsButton.append(detailsIcon);
  editButton.append(editIcon);
  deleteButton.append(deleteIcon);
  buttonsWrapper.append(detailsButton, editButton, deleteButton);

  checkboxWrapper.append(checkbox, label);
  todoLine.append(checkboxWrapper, buttonsWrapper);

  return todoLine;
}

function createTodoDetails(todo) {
  const detailsWrapper = document.createElement("div");
  const detailsHeader = document.createElement("div");
  const dueDateDiv = document.createElement("div");
  const tagsDiv = document.createElement("div");
  const notesList = document.createElement("ul");

  detailsWrapper.classList.add("details", "invisible");
  detailsHeader.classList.add("details-header");
  tagsDiv.classList.add("tags");

  dueDateDiv.textContent = `Due date: ${(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.formatDate)(todo.dueDate)}`;
  tagsDiv.textContent = formatTags(todo.tags);

  detailsWrapper.id = `details${todo.id}`;

  notesList.append(...formatNotes(todo.notes));
  detailsHeader.append(dueDateDiv, tagsDiv);
  detailsWrapper.append(detailsHeader, notesList);

  return detailsWrapper;
}

function formatTags(tags) {
  if (!tags[0]) return;

  let formattedTags = "";
  for (let tag of tags) {
    formattedTags += `#${tag} `;
  }
  return formattedTags;
}

function formatNotes(notes) {
  if (!notes[0]) return `No notes`;

  const formattedNotes = [];
  for (let note of notes) {
    const listItem = document.createElement("li");
    listItem.textContent = note;
    formattedNotes.push(listItem);
  }
  return formattedNotes;
}

function keepDescriptionVisibility(oldTodo, newTodo) {
  const newDescription = newTodo.querySelector(".details");
  const oldDescription = oldTodo.querySelector(".details");
  if (!oldDescription.classList.contains("invisible"))
    newDescription.classList.remove("invisible");
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



const modal = document.querySelector(".modal");
const sendTodoButton = document.querySelector("#send-todo");
const cancelModalButton = document.querySelector("#cancel-modal");
const closeModalButton = document.querySelector(".close-button");

const nameInput = document.querySelector("#name");
const dueDateInput = document.querySelector("#due-date");
const tagsInput = document.querySelector("#tags");
const notesInput = document.querySelector("#notes");
const priorityInput = document.querySelector("#priority");

(() => {
  modal.addEventListener("click", (e) => hideModalIfClickedOutside(e));
  closeModalButton.addEventListener("click", hideModal);
  _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on("modalActivated", displayModal);
  _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on("editButtonClicked", editTodo);

  sendTodoButton.addEventListener("click", (e) => {
    e.preventDefault();
    _eventsHandler_js__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger("todoInputed", gainTodoDataFromForm());
    clearInputs();
    hideModal();
  });

  cancelModalButton.addEventListener("click", (e) => {
    e.preventDefault();
    hideModal();
  });
})();

function displayModal() {
  modal.classList.remove("invisible");
}

function hideModal() {
  modal.classList.add("invisible");
}

function hideModalIfClickedOutside(e) {
  if (e.target.classList.contains("modal")) {
    hideModal();
  }
}

function gainTodoDataFromForm() {
  const name = nameInput.value;
  const dueDate = new Date(dueDateInput.value);
  const tags = tagsInput.value.split(" ");
  const notes = notesInput.value.split("\n");
  const priority = priorityInput.value;

  return { name, dueDate, tags, notes, priority };
}

function clearInputs() {
  nameInput.value = "";
  dueDateInput.value = "";
  tagsInput.value = "";
  notesInput.value = "";
  priorityInput.value = "";
}

function editTodo(todo) {
  displayModal();
  nameInput.value = todo.name;
  dueDateInput.value = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.formatDate)(todo.dueDate);
  tagsInput.value = todo.tags.join(" ");
  notesInput.value = todo.notes.join("\n");
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
        events[eventName] = events[eventName].filter((fn) => fn !== removedFn);
      }
    },

    trigger(eventName, data) {
      if (events[eventName]) {
        events[eventName].forEach((fn) => {
          fn(data);
        });
      }
    },
  };
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
      name: "default todo list",
      todos: [],
      id: 1,
    },
  ];

  function _giveIdToItem(arr) {
    const arrSortedById = [...arr].sort((item1, item2) => item1.id - item2.id);
    const lastItem = arrSortedById[arrSortedById.length - 1];
    if (lastItem) return lastItem.id + 1;
    return 1;
  }

  function _findProjectById(id) {
    return projects.find((project) => project.id === Number(id));
  }

  function _findTodoById(id) {
    for (const project of projects) {
      for (const todo of project.todos) {
        if (todo.id === id) return todo;
      }
    }
  }

  function _pendingOfProject(id) {
    return _sortTodos(
      _findProjectById(id).todos.filter((todo) => todo.status === "pending")
    );
  }

  function _findLengthsOfProjects() {
    const projectsLengths = {};
    for (let i = 0, l = projects.length; i < l; ++i) {
      const id = projects[i].id;
      projectsLengths[id] = _findProjectById(id).todos.filter(
        (todo) => todo.status === "pending"
      ).length;
    }
    const staticTabsLengths = {
      allLength: todoList.todos.length,
      pendingLength: todoList.pending.length,
      todayLength: todoList.today.length,
      completedLength: todoList.completed.length,
    };
    return Object.assign(projectsLengths, staticTabsLengths);
  }

  function _sortTodos(todos) {
    return [...todos]
      .sort((todo1, todo2) => todo1.dueDate - todo2.dueDate)
      .sort((todo1, todo2) => todo1.priority - todo2.priority)
      .sort((todo1, todo2) => (todo1.status === "completed" ? 1 : -1));
  }

  return {
    addTodo({ name, dueDate, tags, notes, priority, projectId = 1 }) {
      const status = "pending";
      const id = _giveIdToItem(todoList.todos);
      const todo = {
        name,
        dueDate,
        tags,
        notes,
        priority,
        status,
        id,
        projectId,
      };
      const project = _findProjectById(projectId);
      if (!project) return;
      project.todos.push(todo);
      return todo;
    },

    getTodo(id) {
      return _findTodoById(id);
    },

    removeTodo(id) {
      projects.forEach((project) => {
        project.todos = project.todos.filter((todo) => todo.id !== Number(id));
      });
    },

    toggleTodo(id) {
      const todo = _findTodoById(id);
      if (!todo) return;
      todo.status = todo.status === "pending" ? "completed" : "pending";
    },

    addProject(name) {
      const todos = [];
      const id = _giveIdToItem(projects);
      const project = { name, todos, id };
      projects.push(project);
      return project;
    },

    getProject(id) {
      const project = _findProjectById(id);
      const todos = _sortTodos(project.todos);
      return { ...project, todos };
    },

    removeProject(id) {
      // can't remove default project
      if (Number(id) === 1) return;
      projects = projects.filter((project) => project.id !== Number(id));
    },

    get lengths() {
      return _findLengthsOfProjects();
    },

    get todos() {
      let todos = [];
      for (const project of projects) {
        todos = todos.concat(project.todos);
      }
      return _sortTodos(todos);
    },

    get projects() {
      return projects;
    },
    set projects(val) {
      projects = val;
    },

    get pending() {
      return _sortTodos(this.todos.filter((todo) => todo.status === "pending"));
    },

    get completed() {
      return _sortTodos(
        this.todos.filter((todo) => todo.status === "completed")
      );
    },

    get today() {
      const today = new Date();
      return _sortTodos(
        this.todos.filter((todo) => {
          return (
            todo.dueDate.getDate() === today.getDate() &&
            todo.dueDate.getMonth() === today.getMonth() &&
            todo.dueDate.getFullYear() === today.getFullYear() &&
            todo.status === "pending"
          );
        })
      );
    },

    currentProject: 1,
    editedTodo: -1,
    mode: "addingTodo",
  };
})();

(() => {
  _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on("appStarted", (parsedProjects) => {
    if (parsedProjects.length > 0) {
      todoList.projects = parsedProjects;
    } else {
      createExampleTodos();
    }
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger("allTabSelected", todoList.todos);
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger("projectsParsed", todoList.projects);
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger("todosChanged", todoList.lengths);
  });

  _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on("allTabClicked", () => {
    todoList.currentProject = 1;
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger("allTabSelected", todoList.todos);
  });

  _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on("pendingTabClicked", () => {
    todoList.currentProject = 1;
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger("pendingTabSelected", todoList.pending);
  });

  _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on("todayTabClicked", () => {
    todoList.currentProject = 1;
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger("todayTabSelected", todoList.today);
  });

  _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on("completedTabClicked", () => {
    todoList.currentProject = 1;
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger("completedTabSelected", todoList.completed);
  });

  _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on("projectTabClicked", (projectId) => {
    const project = todoList.getProject(projectId);
    todoList.currentProject = projectId;
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger("projectTabSelected", project);
  });

  _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on("projectInputed", (name) => {
    const project = todoList.addProject(name);
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger("projectAdded", project);
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger("todoListChanged", todoList.projects);
  });

  _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on("projectDeleted", (projectId) => {
    todoList.removeProject(projectId);
    if (projectId === todoList.currentProject) {
      _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger("allTabSelected");
    }
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger("todoListChanged", todoList.projects);
  });

  _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on("todoInputed", (todoData) => {
    if (todoList.mode === "editingTodo") {
      const todo = todoList.getTodo(todoList.editedTodo);
      todo.name = todoData.name;
      todo.dueDate = todoData.dueDate;
      todo.tags = todoData.tags;
      todo.notes = todoData.notes;
      todo.priority = todoData.priority;
      _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger("todoEdited", todo);
    }
    if (todoList.mode === "addingTodo") {
      const todo = todoList.addTodo({
        ...todoData,
        projectId: todoList.currentProject,
      });
      _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger("todoAdded", todo);
    }
    todoList.mode = "addingTodo";
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger("todosChanged", todoList.lengths);
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger("todoListChanged", todoList.projects);
  });

  _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on("todoToggled", (todoId) => {
    todoList.toggleTodo(todoId);
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger("todosChanged", todoList.lengths);
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger("todoListChanged", todoList.projects);
  });

  _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on("editButtonClicked", (todo) => {
    todoList.mode = "editingTodo";
    todoList.editedTodo = todo.id;
  });

  _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on("deleteButtonClicked", (todo) => {
    todoList.removeTodo(todo.id);
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger("todoDeleted", todo);
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger("todosChanged", todoList.lengths);
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger("todoListChanged", todoList.projects);
  });

  _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.on("clearDoneClicked", (todosIds) => {
    for (const id of todosIds) {
      todoList.removeTodo(id);
    }
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger("todosChanged", todoList.lengths);
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger("todoListChanged", todoList.projects);
  });

  function createExampleTodos() {
    todoList.addTodo({
      name: "Take dog for a walk",
      dueDate: new Date("2021-12-14"),
      tags: ["doggo", "health"],
      notes: [""],
      priority: 1,
    });
    todoList.addTodo({
      name: "Buy milk",
      dueDate: new Date(undefined),
      tags: ["groceries"],
      notes: [""],
      priority: 3,
    });
    todoList.addTodo({
      name: "Go to cinema with Josh",
      dueDate: new Date("2021-12-16"),
      tags: ["josh", "relax"],
      notes: ["visit Anne on our way home"],
      priority: 2,
    });
    todoList.addTodo({
      name: "Visit dentist",
      dueDate: new Date("2021-12-18"),
      tags: ["health"],
      notes: ["17:00", "not eating before going to dentist"],
      priority: 1,
    });
    todoList.addTodo({
      name: "Visit new candy shop",
      dueDate: new Date(undefined),
      tags: [""],
      notes: [""],
      priority: 3,
    });
    _eventsHandler__WEBPACK_IMPORTED_MODULE_0__.eventsHandler.trigger("todoListChanged", todoList.projects);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7OztBQ0FvRDtBQUNYOztBQUV6QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUUsK0RBQWdCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUgsRUFBRSwrREFBZ0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSCxFQUFFLCtEQUFnQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVILEVBQUUsK0RBQWdCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUgsRUFBRSwrREFBZ0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSCxFQUFFLCtEQUFnQjtBQUNsQjtBQUNBLEdBQUc7O0FBRUgsRUFBRSwrREFBZ0I7QUFDbEIsOERBQThELFFBQVE7QUFDdEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSCxFQUFFLCtEQUFnQjtBQUNsQiw4Q0FBOEMsUUFBUTtBQUN0RCxHQUFHOztBQUVIO0FBQ0EsSUFBSSxvRUFBcUI7QUFDekIsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSSxvRUFBcUI7QUFDekIsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsUUFBUTs7QUFFNUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsY0FBYztBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLG9FQUFxQjtBQUN6QjtBQUNBLEdBQUc7O0FBRUg7QUFDQSxzQ0FBc0MsUUFBUTtBQUM5QyxHQUFHOztBQUVIO0FBQ0EsSUFBSSxvRUFBcUI7QUFDekIsR0FBRzs7QUFFSDtBQUNBLElBQUksb0VBQXFCO0FBQ3pCLEdBQUc7O0FBRUg7QUFDQSx5QkFBeUIsUUFBUTs7QUFFakMsdUJBQXVCLFFBQVE7O0FBRS9COztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdDQUF3QyxxREFBVSxlQUFlO0FBQ2pFOztBQUVBLGdDQUFnQyxRQUFROztBQUV4QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5QkFBeUIsS0FBSztBQUM5QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzNNb0Q7QUFDWDs7QUFFekM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLCtEQUFnQjtBQUNsQixFQUFFLCtEQUFnQjs7QUFFbEI7QUFDQTtBQUNBLElBQUksb0VBQXFCO0FBQ3pCO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixxREFBVTtBQUNqQztBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3hFbUQ7O0FBRW5EO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsRUFBRSwrREFBZ0I7QUFDbEIseUNBQXlDLE9BQU87QUFDaEQ7QUFDQTtBQUNBLEdBQUc7O0FBRUgsRUFBRSwrREFBZ0I7QUFDbEIsRUFBRSwrREFBZ0I7QUFDbEIsRUFBRSwrREFBZ0I7O0FBRWxCO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsSUFBSSxvRUFBcUI7QUFDekIsR0FBRzs7QUFFSDtBQUNBLElBQUksb0VBQXFCO0FBQ3pCLEdBQUc7O0FBRUg7QUFDQSxJQUFJLG9FQUFxQjtBQUN6QixHQUFHOztBQUVIO0FBQ0EsSUFBSSxvRUFBcUI7QUFDekIsR0FBRzs7QUFFSDtBQUNBLElBQUksb0VBQXFCO0FBQ3pCLEdBQUc7QUFDSCxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSxvRUFBcUI7QUFDekIsR0FBRztBQUNIO0FBQ0EsSUFBSSxvRUFBcUI7QUFDekIsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDhEQUE4RCxHQUFHO0FBQ2pFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxJQUFJLG9FQUFxQjtBQUN6QjtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7OztBQ25KTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDdkIrQzs7QUFFaEQ7QUFDQTs7QUFFQSxFQUFFLGlFQUFxQjs7QUFFdkIsRUFBRSw0REFBZ0I7QUFDbEI7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOzs7Ozs7Ozs7Ozs7O0FDNUJnRDs7QUFFaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUNBQXlDLE9BQU87QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBYyxxREFBcUQ7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLEVBQUUsNERBQWdCO0FBQ2xCO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLElBQUksaUVBQXFCO0FBQ3pCLElBQUksaUVBQXFCO0FBQ3pCLElBQUksaUVBQXFCO0FBQ3pCLEdBQUc7O0FBRUgsRUFBRSw0REFBZ0I7QUFDbEI7QUFDQSxJQUFJLGlFQUFxQjtBQUN6QixHQUFHOztBQUVILEVBQUUsNERBQWdCO0FBQ2xCO0FBQ0EsSUFBSSxpRUFBcUI7QUFDekIsR0FBRzs7QUFFSCxFQUFFLDREQUFnQjtBQUNsQjtBQUNBLElBQUksaUVBQXFCO0FBQ3pCLEdBQUc7O0FBRUgsRUFBRSw0REFBZ0I7QUFDbEI7QUFDQSxJQUFJLGlFQUFxQjtBQUN6QixHQUFHOztBQUVILEVBQUUsNERBQWdCO0FBQ2xCO0FBQ0E7QUFDQSxJQUFJLGlFQUFxQjtBQUN6QixHQUFHOztBQUVILEVBQUUsNERBQWdCO0FBQ2xCO0FBQ0EsSUFBSSxpRUFBcUI7QUFDekIsSUFBSSxpRUFBcUI7QUFDekIsR0FBRzs7QUFFSCxFQUFFLDREQUFnQjtBQUNsQjtBQUNBO0FBQ0EsTUFBTSxpRUFBcUI7QUFDM0I7QUFDQSxJQUFJLGlFQUFxQjtBQUN6QixHQUFHOztBQUVILEVBQUUsNERBQWdCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxpRUFBcUI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNLGlFQUFxQjtBQUMzQjtBQUNBO0FBQ0EsSUFBSSxpRUFBcUI7QUFDekIsSUFBSSxpRUFBcUI7QUFDekIsR0FBRzs7QUFFSCxFQUFFLDREQUFnQjtBQUNsQjtBQUNBLElBQUksaUVBQXFCO0FBQ3pCLElBQUksaUVBQXFCO0FBQ3pCLEdBQUc7O0FBRUgsRUFBRSw0REFBZ0I7QUFDbEI7QUFDQTtBQUNBLEdBQUc7O0FBRUgsRUFBRSw0REFBZ0I7QUFDbEI7QUFDQSxJQUFJLGlFQUFxQjtBQUN6QixJQUFJLGlFQUFxQjtBQUN6QixJQUFJLGlFQUFxQjtBQUN6QixHQUFHOztBQUVILEVBQUUsNERBQWdCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLElBQUksaUVBQXFCO0FBQ3pCLElBQUksaUVBQXFCO0FBQ3pCLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUksaUVBQXFCO0FBQ3pCO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDL1NEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFlBQVksS0FBSyxHQUFHLEdBQUcsR0FBRyxHQUFHO0FBQzdCOztBQUlDOzs7Ozs7O1VDWkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ055QjtBQUNIO0FBQ007QUFDQztBQUNGO0FBQ0Q7QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Nzcy9zdHlsZS5jc3M/OTMwNiIsIndlYnBhY2s6Ly8vLi9qcy9kb20vbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9kb20vbW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vanMvZG9tL3NpZGViYXIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvZXZlbnRzSGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9qcy9zdG9yYWdlLmpzIiwid2VicGFjazovLy8uL2pzL3RvZG8uanMiLCJ3ZWJwYWNrOi8vLy4vanMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHsgZXZlbnRzSGFuZGxlciB9IGZyb20gXCIuLi9ldmVudHNIYW5kbGVyLmpzXCI7XG5pbXBvcnQgeyBmb3JtYXREYXRlIH0gZnJvbSBcIi4uL3V0aWxzLmpzXCI7XG5cbmNvbnN0IHRvZG9zTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdG9kb3NcIik7XG5jb25zdCBhZGRUb2RvQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtdG9kb1wiKTtcbmNvbnN0IGNsZWFyRG9uZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2xlYXItZG9uZVwiKTtcbmxldCBsaXN0SDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG9zLXdyYXBwZXIgaDJcIik7XG5cbigoKSA9PiB7XG4gIGV2ZW50c0hhbmRsZXIub24oXCJhbGxUYWJTZWxlY3RlZFwiLCAodG9kb3MpID0+IHtcbiAgICBsaXN0SDIudGV4dENvbnRlbnQgPSBcIkFsbFwiO1xuICAgIHRvZG9zTGlzdC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIHJlbmRlclRvZG9zKHRvZG9zKTtcbiAgfSk7XG5cbiAgZXZlbnRzSGFuZGxlci5vbihcInBlbmRpbmdUYWJTZWxlY3RlZFwiLCAodG9kb3MpID0+IHtcbiAgICBsaXN0SDIudGV4dENvbnRlbnQgPSBcIlBlbmRpbmdcIjtcbiAgICB0b2Rvc0xpc3QuaW5uZXJIVE1MID0gXCJcIjtcbiAgICByZW5kZXJUb2Rvcyh0b2Rvcyk7XG4gIH0pO1xuXG4gIGV2ZW50c0hhbmRsZXIub24oXCJ0b2RheVRhYlNlbGVjdGVkXCIsICh0b2RvcykgPT4ge1xuICAgIGxpc3RIMi50ZXh0Q29udGVudCA9IFwiVG9kYXlcIjtcbiAgICB0b2Rvc0xpc3QuaW5uZXJIVE1MID0gXCJcIjtcbiAgICByZW5kZXJUb2Rvcyh0b2Rvcyk7XG4gIH0pO1xuXG4gIGV2ZW50c0hhbmRsZXIub24oXCJjb21wbGV0ZWRUYWJTZWxlY3RlZFwiLCAodG9kb3MpID0+IHtcbiAgICBsaXN0SDIudGV4dENvbnRlbnQgPSBcIkNvbXBsZXRlZFwiO1xuICAgIHRvZG9zTGlzdC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIHJlbmRlclRvZG9zKHRvZG9zKTtcbiAgfSk7XG5cbiAgZXZlbnRzSGFuZGxlci5vbihcInByb2plY3RUYWJTZWxlY3RlZFwiLCAocHJvamVjdCkgPT4ge1xuICAgIGxpc3RIMi50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZTtcbiAgICB0b2Rvc0xpc3QuaW5uZXJIVE1MID0gXCJcIjtcbiAgICByZW5kZXJUb2Rvcyhwcm9qZWN0LnRvZG9zKTtcbiAgfSk7XG5cbiAgZXZlbnRzSGFuZGxlci5vbihcInRvZG9BZGRlZFwiLCAodG9kbykgPT4ge1xuICAgIHRvZG9zTGlzdC5wcmVwZW5kKGNyZWF0ZVRvZG8odG9kbykpO1xuICB9KTtcblxuICBldmVudHNIYW5kbGVyLm9uKFwidG9kb0VkaXRlZFwiLCAodG9kbykgPT4ge1xuICAgIGNvbnN0IG9sZFRvZG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS10b2RvPVwidG9kbyR7dG9kby5pZH1cIl1gKTtcbiAgICBjb25zdCBuZXdUb2RvID0gY3JlYXRlVG9kbyh0b2RvKTtcbiAgICBrZWVwRGVzY3JpcHRpb25WaXNpYmlsaXR5KG9sZFRvZG8sIG5ld1RvZG8pO1xuXG4gICAgb2xkVG9kby5hZnRlcihuZXdUb2RvKTtcbiAgICBvbGRUb2RvLnJlbW92ZSgpO1xuICB9KTtcblxuICBldmVudHNIYW5kbGVyLm9uKFwidG9kb0RlbGV0ZWRcIiwgKHRvZG8pID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS10b2RvPVwidG9kbyR7dG9kby5pZH1cIl1gKS5yZW1vdmUoKTtcbiAgfSk7XG5cbiAgYWRkVG9kb0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihcIm1vZGFsQWN0aXZhdGVkXCIpO1xuICB9KTtcblxuICBjbGVhckRvbmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjb25zdCBkb25lVG9kb3NPblNjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudG9kby1jaGVja2VkXCIpO1xuICAgIGNvbnN0IHRvZG9zSWRzID0gW107XG4gICAgZG9uZVRvZG9zT25TY3JlZW4uZm9yRWFjaCgodG9kbykgPT4ge1xuICAgICAgdG9kb3NJZHMucHVzaCh0b2RvLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKS5pZC5zbGljZSg0KSk7XG4gICAgICB0b2RvLnBhcmVudE5vZGUucGFyZW50Tm9kZS5yZW1vdmUoKTtcbiAgICB9KTtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoXCJjbGVhckRvbmVDbGlja2VkXCIsIHRvZG9zSWRzKTtcbiAgfSk7XG59KSgpO1xuXG5mdW5jdGlvbiBjcmVhdGVUb2RvKHRvZG8pIHtcbiAgY29uc3QgdG9kb1dyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB0b2RvV3JhcHBlci5hcHBlbmQoY3JlYXRlVG9kb0xpbmUodG9kbyksIGNyZWF0ZVRvZG9EZXRhaWxzKHRvZG8pKTtcbiAgdG9kb1dyYXBwZXIuY2xhc3NMaXN0LmFkZChcImZsZXgtY29sdW1uXCIpO1xuICB0b2RvV3JhcHBlci5kYXRhc2V0LnRvZG8gPSBgdG9kbyR7dG9kby5pZH1gO1xuXG4gIHJldHVybiB0b2RvV3JhcHBlcjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVG9kb0xpbmUodG9kbykge1xuICBjb25zdCB0b2RvTGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGNoZWNrYm94V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcblxuICBjb25zdCBidXR0b25zV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGRldGFpbHNCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBjb25zdCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgY29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgY29uc3QgZGV0YWlsc0ljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgY29uc3QgZWRpdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgY29uc3QgZGVsZXRlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXG4gIGlmICh0b2RvLnN0YXR1cyA9PT0gXCJjb21wbGV0ZWRcIikge1xuICAgIGNoZWNrYm94V3JhcHBlci5jbGFzc0xpc3QuYWRkKFwidG9kby1jaGVja2VkXCIpO1xuICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0cnVlO1xuICB9XG4gIGNoZWNrYm94V3JhcHBlci5jbGFzc0xpc3QuYWRkKFwibm8tdXNlci1zZWxlY3RcIik7XG4gIHRvZG9MaW5lLmNsYXNzTGlzdC5hZGQoXCJ0b2RvXCIsIGBwcmlvcml0eS0ke3RvZG8ucHJpb3JpdHl9YCk7XG4gIGJ1dHRvbnNXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWJ1dHRvbnNcIik7XG4gIFtkZXRhaWxzQnV0dG9uLCBlZGl0QnV0dG9uLCBkZWxldGVCdXR0b25dLmZvckVhY2goKGJ1dHRvbikgPT5cbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcInRvZG8taWNvblwiKVxuICApO1xuICBbZGV0YWlsc0ljb24sIGVkaXRJY29uLCBkZWxldGVJY29uXS5mb3JFYWNoKChpY29uKSA9PlxuICAgIGljb24uY2xhc3NMaXN0LmFkZChcImljb25pZnlcIilcbiAgKTtcblxuICBkZXRhaWxzSWNvbi5kYXRhc2V0Lmljb24gPSBcImljOnJvdW5kLWRlc2NyaXB0aW9uXCI7XG4gIGVkaXRJY29uLmRhdGFzZXQuaWNvbiA9IFwiYng6YngtZWRpdFwiO1xuICBkZWxldGVJY29uLmRhdGFzZXQuaWNvbiA9IFwiZmx1ZW50OmRlbGV0ZS0yNC1maWxsZWRcIjtcblxuICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoXCJ0b2RvVG9nZ2xlZFwiLCB0b2RvLmlkKTtcbiAgICBjaGVja2JveFdyYXBwZXIuY2xhc3NMaXN0LnRvZ2dsZShcInRvZG8tY2hlY2tlZFwiKTtcbiAgfSk7XG5cbiAgZGV0YWlsc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNkZXRhaWxzJHt0b2RvLmlkfWApLmNsYXNzTGlzdC50b2dnbGUoXCJpbnZpc2libGVcIik7XG4gIH0pO1xuXG4gIGVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoXCJlZGl0QnV0dG9uQ2xpY2tlZFwiLCB0b2RvKTtcbiAgfSk7XG5cbiAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKFwiZGVsZXRlQnV0dG9uQ2xpY2tlZFwiLCB0b2RvKTtcbiAgfSk7XG5cbiAgY2hlY2tib3gudHlwZSA9IFwiY2hlY2tib3hcIjtcbiAgbGFiZWwuaHRtbEZvciA9IGB0b2RvJHt0b2RvLmlkfWA7XG5cbiAgY2hlY2tib3guaWQgPSBgdG9kbyR7dG9kby5pZH1gO1xuXG4gIGxhYmVsLnRleHRDb250ZW50ID0gdG9kby5uYW1lO1xuXG4gIGRldGFpbHNCdXR0b24uYXBwZW5kKGRldGFpbHNJY29uKTtcbiAgZWRpdEJ1dHRvbi5hcHBlbmQoZWRpdEljb24pO1xuICBkZWxldGVCdXR0b24uYXBwZW5kKGRlbGV0ZUljb24pO1xuICBidXR0b25zV3JhcHBlci5hcHBlbmQoZGV0YWlsc0J1dHRvbiwgZWRpdEJ1dHRvbiwgZGVsZXRlQnV0dG9uKTtcblxuICBjaGVja2JveFdyYXBwZXIuYXBwZW5kKGNoZWNrYm94LCBsYWJlbCk7XG4gIHRvZG9MaW5lLmFwcGVuZChjaGVja2JveFdyYXBwZXIsIGJ1dHRvbnNXcmFwcGVyKTtcblxuICByZXR1cm4gdG9kb0xpbmU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRvZG9EZXRhaWxzKHRvZG8pIHtcbiAgY29uc3QgZGV0YWlsc1dyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBkZXRhaWxzSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgZHVlRGF0ZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IHRhZ3NEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBub3Rlc0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG5cbiAgZGV0YWlsc1dyYXBwZXIuY2xhc3NMaXN0LmFkZChcImRldGFpbHNcIiwgXCJpbnZpc2libGVcIik7XG4gIGRldGFpbHNIZWFkZXIuY2xhc3NMaXN0LmFkZChcImRldGFpbHMtaGVhZGVyXCIpO1xuICB0YWdzRGl2LmNsYXNzTGlzdC5hZGQoXCJ0YWdzXCIpO1xuXG4gIGR1ZURhdGVEaXYudGV4dENvbnRlbnQgPSBgRHVlIGRhdGU6ICR7Zm9ybWF0RGF0ZSh0b2RvLmR1ZURhdGUpfWA7XG4gIHRhZ3NEaXYudGV4dENvbnRlbnQgPSBmb3JtYXRUYWdzKHRvZG8udGFncyk7XG5cbiAgZGV0YWlsc1dyYXBwZXIuaWQgPSBgZGV0YWlscyR7dG9kby5pZH1gO1xuXG4gIG5vdGVzTGlzdC5hcHBlbmQoLi4uZm9ybWF0Tm90ZXModG9kby5ub3RlcykpO1xuICBkZXRhaWxzSGVhZGVyLmFwcGVuZChkdWVEYXRlRGl2LCB0YWdzRGl2KTtcbiAgZGV0YWlsc1dyYXBwZXIuYXBwZW5kKGRldGFpbHNIZWFkZXIsIG5vdGVzTGlzdCk7XG5cbiAgcmV0dXJuIGRldGFpbHNXcmFwcGVyO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRUYWdzKHRhZ3MpIHtcbiAgaWYgKCF0YWdzWzBdKSByZXR1cm47XG5cbiAgbGV0IGZvcm1hdHRlZFRhZ3MgPSBcIlwiO1xuICBmb3IgKGxldCB0YWcgb2YgdGFncykge1xuICAgIGZvcm1hdHRlZFRhZ3MgKz0gYCMke3RhZ30gYDtcbiAgfVxuICByZXR1cm4gZm9ybWF0dGVkVGFncztcbn1cblxuZnVuY3Rpb24gZm9ybWF0Tm90ZXMobm90ZXMpIHtcbiAgaWYgKCFub3Rlc1swXSkgcmV0dXJuIGBObyBub3Rlc2A7XG5cbiAgY29uc3QgZm9ybWF0dGVkTm90ZXMgPSBbXTtcbiAgZm9yIChsZXQgbm90ZSBvZiBub3Rlcykge1xuICAgIGNvbnN0IGxpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgIGxpc3RJdGVtLnRleHRDb250ZW50ID0gbm90ZTtcbiAgICBmb3JtYXR0ZWROb3Rlcy5wdXNoKGxpc3RJdGVtKTtcbiAgfVxuICByZXR1cm4gZm9ybWF0dGVkTm90ZXM7XG59XG5cbmZ1bmN0aW9uIGtlZXBEZXNjcmlwdGlvblZpc2liaWxpdHkob2xkVG9kbywgbmV3VG9kbykge1xuICBjb25zdCBuZXdEZXNjcmlwdGlvbiA9IG5ld1RvZG8ucXVlcnlTZWxlY3RvcihcIi5kZXRhaWxzXCIpO1xuICBjb25zdCBvbGREZXNjcmlwdGlvbiA9IG9sZFRvZG8ucXVlcnlTZWxlY3RvcihcIi5kZXRhaWxzXCIpO1xuICBpZiAoIW9sZERlc2NyaXB0aW9uLmNsYXNzTGlzdC5jb250YWlucyhcImludmlzaWJsZVwiKSlcbiAgICBuZXdEZXNjcmlwdGlvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaW52aXNpYmxlXCIpO1xufVxuXG5mdW5jdGlvbiByZW5kZXJUb2Rvcyh0b2Rvcykge1xuICBmb3IgKGxldCB0b2RvIG9mIHRvZG9zKSB7XG4gICAgdG9kb3NMaXN0LmFwcGVuZChjcmVhdGVUb2RvKHRvZG8pKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgZXZlbnRzSGFuZGxlciB9IGZyb20gXCIuLi9ldmVudHNIYW5kbGVyLmpzXCI7XG5pbXBvcnQgeyBmb3JtYXREYXRlIH0gZnJvbSBcIi4uL3V0aWxzLmpzXCI7XG5cbmNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbFwiKTtcbmNvbnN0IHNlbmRUb2RvQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZW5kLXRvZG9cIik7XG5jb25zdCBjYW5jZWxNb2RhbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FuY2VsLW1vZGFsXCIpO1xuY29uc3QgY2xvc2VNb2RhbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2xvc2UtYnV0dG9uXCIpO1xuXG5jb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25hbWVcIik7XG5jb25zdCBkdWVEYXRlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2R1ZS1kYXRlXCIpO1xuY29uc3QgdGFnc0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YWdzXCIpO1xuY29uc3Qgbm90ZXNJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbm90ZXNcIik7XG5jb25zdCBwcmlvcml0eUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcmlvcml0eVwiKTtcblxuKCgpID0+IHtcbiAgbW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiBoaWRlTW9kYWxJZkNsaWNrZWRPdXRzaWRlKGUpKTtcbiAgY2xvc2VNb2RhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGlkZU1vZGFsKTtcbiAgZXZlbnRzSGFuZGxlci5vbihcIm1vZGFsQWN0aXZhdGVkXCIsIGRpc3BsYXlNb2RhbCk7XG4gIGV2ZW50c0hhbmRsZXIub24oXCJlZGl0QnV0dG9uQ2xpY2tlZFwiLCBlZGl0VG9kbyk7XG5cbiAgc2VuZFRvZG9CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihcInRvZG9JbnB1dGVkXCIsIGdhaW5Ub2RvRGF0YUZyb21Gb3JtKCkpO1xuICAgIGNsZWFySW5wdXRzKCk7XG4gICAgaGlkZU1vZGFsKCk7XG4gIH0pO1xuXG4gIGNhbmNlbE1vZGFsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBoaWRlTW9kYWwoKTtcbiAgfSk7XG59KSgpO1xuXG5mdW5jdGlvbiBkaXNwbGF5TW9kYWwoKSB7XG4gIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZpc2libGVcIik7XG59XG5cbmZ1bmN0aW9uIGhpZGVNb2RhbCgpIHtcbiAgbW9kYWwuY2xhc3NMaXN0LmFkZChcImludmlzaWJsZVwiKTtcbn1cblxuZnVuY3Rpb24gaGlkZU1vZGFsSWZDbGlja2VkT3V0c2lkZShlKSB7XG4gIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbFwiKSkge1xuICAgIGhpZGVNb2RhbCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdhaW5Ub2RvRGF0YUZyb21Gb3JtKCkge1xuICBjb25zdCBuYW1lID0gbmFtZUlucHV0LnZhbHVlO1xuICBjb25zdCBkdWVEYXRlID0gbmV3IERhdGUoZHVlRGF0ZUlucHV0LnZhbHVlKTtcbiAgY29uc3QgdGFncyA9IHRhZ3NJbnB1dC52YWx1ZS5zcGxpdChcIiBcIik7XG4gIGNvbnN0IG5vdGVzID0gbm90ZXNJbnB1dC52YWx1ZS5zcGxpdChcIlxcblwiKTtcbiAgY29uc3QgcHJpb3JpdHkgPSBwcmlvcml0eUlucHV0LnZhbHVlO1xuXG4gIHJldHVybiB7IG5hbWUsIGR1ZURhdGUsIHRhZ3MsIG5vdGVzLCBwcmlvcml0eSB9O1xufVxuXG5mdW5jdGlvbiBjbGVhcklucHV0cygpIHtcbiAgbmFtZUlucHV0LnZhbHVlID0gXCJcIjtcbiAgZHVlRGF0ZUlucHV0LnZhbHVlID0gXCJcIjtcbiAgdGFnc0lucHV0LnZhbHVlID0gXCJcIjtcbiAgbm90ZXNJbnB1dC52YWx1ZSA9IFwiXCI7XG4gIHByaW9yaXR5SW5wdXQudmFsdWUgPSBcIlwiO1xufVxuXG5mdW5jdGlvbiBlZGl0VG9kbyh0b2RvKSB7XG4gIGRpc3BsYXlNb2RhbCgpO1xuICBuYW1lSW5wdXQudmFsdWUgPSB0b2RvLm5hbWU7XG4gIGR1ZURhdGVJbnB1dC52YWx1ZSA9IGZvcm1hdERhdGUodG9kby5kdWVEYXRlKTtcbiAgdGFnc0lucHV0LnZhbHVlID0gdG9kby50YWdzLmpvaW4oXCIgXCIpO1xuICBub3Rlc0lucHV0LnZhbHVlID0gdG9kby5ub3Rlcy5qb2luKFwiXFxuXCIpO1xuICBwcmlvcml0eUlucHV0LnZhbHVlID0gdG9kby5wcmlvcml0eTtcbn1cbiIsImltcG9ydCB7IGV2ZW50c0hhbmRsZXIgfSBmcm9tIFwiLi4vZXZlbnRzSGFuZGxlci5qc1wiXG5cbmNvbnN0IHByb2plY3RzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0cycpO1xuY29uc3QgY3JlYXRlUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjcmVhdGUtcHJvamVjdCcpO1xuXG5jb25zdCB0YWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpc3QnKTtcbmNvbnN0IGFsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhbGwnKTtcbmNvbnN0IHBlbmRpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGVuZGluZycpO1xuY29uc3QgdG9kYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9kYXknKTtcbmNvbnN0IGNvbXBsZXRlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb21wbGV0ZWQnKTtcblxuKCgpID0+IHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGVzdHJveUlucHV0RGl2SWZDbGlja2VkT3V0c2lkZSk7XG4gIGNyZWF0ZVByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjcmVhdGVQcm9qZWN0SW5wdXQpO1xuXG4gIGV2ZW50c0hhbmRsZXIub24oJ3Byb2plY3RzUGFyc2VkJywgcHJvamVjdHMgPT4ge1xuICAgIGZvciAobGV0IGkgPSAxLCBsID0gcHJvamVjdHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBjcmVhdGVQcm9qZWN0VGFiKHByb2plY3RzW2ldKTtcbiAgICB9XG4gIH0pO1xuXG4gIGV2ZW50c0hhbmRsZXIub24oJ3Byb2plY3RBZGRlZCcsIGNyZWF0ZVByb2plY3RUYWIpO1xuICBldmVudHNIYW5kbGVyLm9uKCdwcm9qZWN0RGVsZXRlZCcsIGRlbGV0ZVByb2plY3RUYWIpO1xuICBldmVudHNIYW5kbGVyLm9uKCd0b2Rvc0NoYW5nZWQnLCBjaGFuZ2VTdGF0dXNOdW1iZXIpO1xuXG4gIHRhYnMuZm9yRWFjaChwcm9qZWN0ID0+IHtcbiAgICBwcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VsZWN0VGFiKTtcbiAgfSlcblxuICBhbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKCdhbGxUYWJDbGlja2VkJyk7XG4gIH0pXG5cbiAgcGVuZGluZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ2FsbFRhYkNsaWNrZWQnKTtcbiAgfSk7XG5cbiAgcGVuZGluZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ3BlbmRpbmdUYWJDbGlja2VkJyk7XG4gIH0pO1xuXG4gIHRvZGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcigndG9kYXlUYWJDbGlja2VkJyk7XG4gIH0pO1xuXG4gIGNvbXBsZXRlZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ2NvbXBsZXRlZFRhYkNsaWNrZWQnKTtcbiAgfSk7XG59KSgpO1xuXG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3RUYWIocHJvamVjdCkge1xuICBjb25zdCBsaVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICBjb25zdCBuYW1lRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IHN0YXR1c0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgY29uc3QgZGVsZXRlQnV0dG9uSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgY29uc3Qgc3RhdHVzQ2lyY2xlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IHN0YXR1c051bWJlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gIGxpV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdsaXN0Jyk7XG4gIHN0YXR1c0Rpdi5jbGFzc0xpc3QuYWRkKCdsaXN0LXN0YXR1cycpO1xuICBkZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZCgnZGVsZXRlLXByb2plY3QtYnV0dG9uJyk7XG4gIGRlbGV0ZUJ1dHRvbkljb24uY2xhc3NMaXN0LmFkZCgnaWNvbmlmeScpO1xuICBzdGF0dXNDaXJjbGVEaXYuY2xhc3NMaXN0LmFkZCgnbGlzdC1zdGF0dXMtY2lyY2xlJywgJ3Byb2plY3QnKTtcbiAgc3RhdHVzTnVtYmVyRGl2LmNsYXNzTGlzdC5hZGQoJ2xpc3Qtc3RhdHVzLW51bWJlcicpO1xuXG4gIGxpV3JhcHBlci5kYXRhc2V0LnByb2plY3QgPSBwcm9qZWN0LmlkO1xuICBkZWxldGVCdXR0b25JY29uLmRhdGFzZXQuaWNvbiA9IFwiZmx1ZW50OmRlbGV0ZS0yNC1maWxsZWRcIjtcblxuICBuYW1lRGl2LnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lO1xuICBzdGF0dXNOdW1iZXJEaXYudGV4dENvbnRlbnQgPSBwcm9qZWN0LnRvZG9zLmxlbmd0aDtcblxuICBsaVdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZWxlY3RUYWIpO1xuICBsaVdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUtcHJvamVjdC1idXR0b24nKSkgcmV0dXJuXG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKCdwcm9qZWN0VGFiQ2xpY2tlZCcsIGxpV3JhcHBlci5kYXRhc2V0LnByb2plY3QpO1xuICB9KTtcbiAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4geyBcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoJ3Byb2plY3REZWxldGVkJywgcHJvamVjdC5pZClcbiAgfSk7XG5cbiAgZGVsZXRlQnV0dG9uLmFwcGVuZChkZWxldGVCdXR0b25JY29uKTtcbiAgc3RhdHVzRGl2LmFwcGVuZChkZWxldGVCdXR0b24sIHN0YXR1c0NpcmNsZURpdiwgc3RhdHVzTnVtYmVyRGl2KTtcbiAgbGlXcmFwcGVyLmFwcGVuZChuYW1lRGl2LCBzdGF0dXNEaXYpO1xuXG4gIHByb2plY3RzTGlzdC5hcHBlbmQobGlXcmFwcGVyKTtcblxuICByZXR1cm4gbGlXcmFwcGVyXG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3RUYWIoaWQpIHtcbiAgY29uc3QgcHJvamVjdFRhYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXByb2plY3Q9XCIke2lkfVwiXWApXG4gIHByb2plY3RUYWIucmVtb3ZlKCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3RJbnB1dCgpIHtcbiAgY29uc3QgaW5wdXREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBjb25zdCBpbnB1dEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXG4gIGlucHV0RGl2LmNsYXNzTGlzdC5hZGQoJ2ZsZXgtcm93Jyk7XG4gIGlucHV0LmNsYXNzTGlzdC5hZGQoJ2NyZWF0ZS1wcm9qZWN0LWlucHV0Jyk7XG4gIGlucHV0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtaW5wdXQtYnV0dG9uJyk7XG5cbiAgaW5wdXREaXYuZGF0YXNldC50eXBlID0gJ2lucHV0LWRpdic7XG5cbiAgaW5wdXRCdXR0b24udGV4dENvbnRlbnQgPSAnKyc7XG4gIGlucHV0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcigncHJvamVjdElucHV0ZWQnLCBpbnB1dC52YWx1ZSk7XG4gICAgaW5wdXREaXYucmVtb3ZlKCk7XG4gIH0pO1xuXG4gIGlucHV0RGl2LmFwcGVuZChpbnB1dCwgaW5wdXRCdXR0b24pO1xuXG4gIGNyZWF0ZVByb2plY3RCdXR0b24uYmVmb3JlKGlucHV0RGl2KTtcbiAgaW5wdXQuZm9jdXMoKTtcblxuICByZXR1cm4gaW5wdXREaXZcbn1cblxuZnVuY3Rpb24gZGVzdHJveUlucHV0RGl2SWZDbGlja2VkT3V0c2lkZShlKSB7XG4gIGlmIChlLnRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQudHlwZSA9PT0gJ2lucHV0LWRpdicgfHxcbiAgICAgIGUudGFyZ2V0LmlkID09PSAnY3JlYXRlLXByb2plY3QnKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdHlwZT1pbnB1dC1kaXZdJylcbiAgICAuZm9yRWFjaChlbCA9PiBlbC5yZW1vdmUoKSk7XG59XG5cbmZ1bmN0aW9uIHNlbGVjdFRhYigpIHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpc3QnKVxuICAgIC5mb3JFYWNoKHByb2plY3QgPT4gcHJvamVjdC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gIHRoaXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG59XG5cbmZ1bmN0aW9uIGNoYW5nZVN0YXR1c051bWJlcihsZW5ndGhPYmplY3QpIHtcbiAgY29uc3QgcHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wcm9qZWN0XScpO1xuXG4gIGFsbC5xdWVyeVNlbGVjdG9yKCcubGlzdC1zdGF0dXMtbnVtYmVyJykudGV4dENvbnRlbnQgPSBsZW5ndGhPYmplY3QuYWxsTGVuZ3RoO1xuICBwZW5kaW5nLnF1ZXJ5U2VsZWN0b3IoJy5saXN0LXN0YXR1cy1udW1iZXInKS50ZXh0Q29udGVudCA9IGxlbmd0aE9iamVjdC5wZW5kaW5nTGVuZ3RoO1xuICB0b2RheS5xdWVyeVNlbGVjdG9yKCcubGlzdC1zdGF0dXMtbnVtYmVyJykudGV4dENvbnRlbnQgPSBsZW5ndGhPYmplY3QudG9kYXlMZW5ndGg7XG4gIGNvbXBsZXRlZC5xdWVyeVNlbGVjdG9yKCcubGlzdC1zdGF0dXMtbnVtYmVyJykudGV4dENvbnRlbnQgPSBsZW5ndGhPYmplY3QuY29tcGxldGVkTGVuZ3RoO1xuXG4gIHByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgcHJvamVjdC5xdWVyeVNlbGVjdG9yKCcubGlzdC1zdGF0dXMtbnVtYmVyJykudGV4dENvbnRlbnQgPSBsZW5ndGhPYmplY3RbcHJvamVjdC5kYXRhc2V0LnByb2plY3RdO1xuICB9KTtcbn1cbiIsImV4cG9ydCBjb25zdCBldmVudHNIYW5kbGVyID0gKCgpID0+IHtcbiAgbGV0IGV2ZW50cyA9IHt9O1xuXG4gIHJldHVybiB7XG4gICAgb24oZXZlbnROYW1lLCBmbikge1xuICAgICAgZXZlbnRzW2V2ZW50TmFtZV0gPSBldmVudHNbZXZlbnROYW1lXSB8fCBbXTtcbiAgICAgIGV2ZW50c1tldmVudE5hbWVdLnB1c2goZm4pO1xuICAgIH0sXG5cbiAgICBvZmYoZXZlbnROYW1lLCByZW1vdmVkRm4pIHtcbiAgICAgIGlmIChldmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgICBldmVudHNbZXZlbnROYW1lXSA9IGV2ZW50c1tldmVudE5hbWVdLmZpbHRlcigoZm4pID0+IGZuICE9PSByZW1vdmVkRm4pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB0cmlnZ2VyKGV2ZW50TmFtZSwgZGF0YSkge1xuICAgICAgaWYgKGV2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgICAgIGV2ZW50c1tldmVudE5hbWVdLmZvckVhY2goKGZuKSA9PiB7XG4gICAgICAgICAgZm4oZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gIH07XG59KSgpO1xuIiwiaW1wb3J0IHsgZXZlbnRzSGFuZGxlciB9IGZyb20gJy4vZXZlbnRzSGFuZGxlcic7XG5cbigoKSA9PiB7XG4gIGNvbnN0IHBhcnNlZFByb2plY3RzID0gcGFyc2VMb2NhbFN0b3JhZ2UoJ3Byb2plY3RzJykgfHwgW107XG5cbiAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKCdhcHBTdGFydGVkJywgY29udmVydERhdGVzVG9EYXRlT2JqZWN0cyhwYXJzZWRQcm9qZWN0cykpO1xuXG4gIGV2ZW50c0hhbmRsZXIub24oJ3RvZG9MaXN0Q2hhbmdlZCcsIHByb2plY3RzID0+IHtcbiAgICBzYXZlVG9Mb2NhbFN0b3JhZ2UoJ3Byb2plY3RzJywgcHJvamVjdHMpO1xuICB9KTtcbn0pKCk7XG5cbmZ1bmN0aW9uIHNhdmVUb0xvY2FsU3RvcmFnZShrZXksIG9iaikge1xuICBjb25zdCBzdHJpbmdpZmllZE9iamVjdCA9IEpTT04uc3RyaW5naWZ5KG9iaik7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgc3RyaW5naWZpZWRPYmplY3QpO1xufVxuXG5mdW5jdGlvbiBwYXJzZUxvY2FsU3RvcmFnZShrZXkpIHtcbiAgY29uc3Qgc3RyaW5naWZpZWRPYmplY3QgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICBjb25zdCBwYXJzZWRPYmplY3QgPSBKU09OLnBhcnNlKHN0cmluZ2lmaWVkT2JqZWN0KTtcbiAgcmV0dXJuIHBhcnNlZE9iamVjdFxufVxuXG5mdW5jdGlvbiBjb252ZXJ0RGF0ZXNUb0RhdGVPYmplY3RzKHBhcnNlZFByb2plY3RzKSB7XG4gIHBhcnNlZFByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgcHJvamVjdC50b2Rvcy5mb3JFYWNoKHRvZG8gPT4gdG9kby5kdWVEYXRlID0gKHRvZG8uZHVlRGF0ZSkgPyBuZXcgRGF0ZSh0b2RvLmR1ZURhdGUpIDogbmV3IERhdGUodW5kZWZpbmVkKSk7XG4gIH0pO1xuICByZXR1cm4gcGFyc2VkUHJvamVjdHNcbn1cbiIsImltcG9ydCB7IGV2ZW50c0hhbmRsZXIgfSBmcm9tIFwiLi9ldmVudHNIYW5kbGVyXCI7XG5cbmNvbnN0IHRvZG9MaXN0ID0gKCgpID0+IHtcbiAgbGV0IHByb2plY3RzID0gW1xuICAgIHtcbiAgICAgIG5hbWU6IFwiZGVmYXVsdCB0b2RvIGxpc3RcIixcbiAgICAgIHRvZG9zOiBbXSxcbiAgICAgIGlkOiAxLFxuICAgIH0sXG4gIF07XG5cbiAgZnVuY3Rpb24gX2dpdmVJZFRvSXRlbShhcnIpIHtcbiAgICBjb25zdCBhcnJTb3J0ZWRCeUlkID0gWy4uLmFycl0uc29ydCgoaXRlbTEsIGl0ZW0yKSA9PiBpdGVtMS5pZCAtIGl0ZW0yLmlkKTtcbiAgICBjb25zdCBsYXN0SXRlbSA9IGFyclNvcnRlZEJ5SWRbYXJyU29ydGVkQnlJZC5sZW5ndGggLSAxXTtcbiAgICBpZiAobGFzdEl0ZW0pIHJldHVybiBsYXN0SXRlbS5pZCArIDE7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICBmdW5jdGlvbiBfZmluZFByb2plY3RCeUlkKGlkKSB7XG4gICAgcmV0dXJuIHByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QuaWQgPT09IE51bWJlcihpZCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gX2ZpbmRUb2RvQnlJZChpZCkge1xuICAgIGZvciAoY29uc3QgcHJvamVjdCBvZiBwcm9qZWN0cykge1xuICAgICAgZm9yIChjb25zdCB0b2RvIG9mIHByb2plY3QudG9kb3MpIHtcbiAgICAgICAgaWYgKHRvZG8uaWQgPT09IGlkKSByZXR1cm4gdG9kbztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBfcGVuZGluZ09mUHJvamVjdChpZCkge1xuICAgIHJldHVybiBfc29ydFRvZG9zKFxuICAgICAgX2ZpbmRQcm9qZWN0QnlJZChpZCkudG9kb3MuZmlsdGVyKCh0b2RvKSA9PiB0b2RvLnN0YXR1cyA9PT0gXCJwZW5kaW5nXCIpXG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9maW5kTGVuZ3Roc09mUHJvamVjdHMoKSB7XG4gICAgY29uc3QgcHJvamVjdHNMZW5ndGhzID0ge307XG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBwcm9qZWN0cy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgIGNvbnN0IGlkID0gcHJvamVjdHNbaV0uaWQ7XG4gICAgICBwcm9qZWN0c0xlbmd0aHNbaWRdID0gX2ZpbmRQcm9qZWN0QnlJZChpZCkudG9kb3MuZmlsdGVyKFxuICAgICAgICAodG9kbykgPT4gdG9kby5zdGF0dXMgPT09IFwicGVuZGluZ1wiXG4gICAgICApLmxlbmd0aDtcbiAgICB9XG4gICAgY29uc3Qgc3RhdGljVGFic0xlbmd0aHMgPSB7XG4gICAgICBhbGxMZW5ndGg6IHRvZG9MaXN0LnRvZG9zLmxlbmd0aCxcbiAgICAgIHBlbmRpbmdMZW5ndGg6IHRvZG9MaXN0LnBlbmRpbmcubGVuZ3RoLFxuICAgICAgdG9kYXlMZW5ndGg6IHRvZG9MaXN0LnRvZGF5Lmxlbmd0aCxcbiAgICAgIGNvbXBsZXRlZExlbmd0aDogdG9kb0xpc3QuY29tcGxldGVkLmxlbmd0aCxcbiAgICB9O1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHByb2plY3RzTGVuZ3Rocywgc3RhdGljVGFic0xlbmd0aHMpO1xuICB9XG5cbiAgZnVuY3Rpb24gX3NvcnRUb2Rvcyh0b2Rvcykge1xuICAgIHJldHVybiBbLi4udG9kb3NdXG4gICAgICAuc29ydCgodG9kbzEsIHRvZG8yKSA9PiB0b2RvMS5kdWVEYXRlIC0gdG9kbzIuZHVlRGF0ZSlcbiAgICAgIC5zb3J0KCh0b2RvMSwgdG9kbzIpID0+IHRvZG8xLnByaW9yaXR5IC0gdG9kbzIucHJpb3JpdHkpXG4gICAgICAuc29ydCgodG9kbzEsIHRvZG8yKSA9PiAodG9kbzEuc3RhdHVzID09PSBcImNvbXBsZXRlZFwiID8gMSA6IC0xKSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGFkZFRvZG8oeyBuYW1lLCBkdWVEYXRlLCB0YWdzLCBub3RlcywgcHJpb3JpdHksIHByb2plY3RJZCA9IDEgfSkge1xuICAgICAgY29uc3Qgc3RhdHVzID0gXCJwZW5kaW5nXCI7XG4gICAgICBjb25zdCBpZCA9IF9naXZlSWRUb0l0ZW0odG9kb0xpc3QudG9kb3MpO1xuICAgICAgY29uc3QgdG9kbyA9IHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgZHVlRGF0ZSxcbiAgICAgICAgdGFncyxcbiAgICAgICAgbm90ZXMsXG4gICAgICAgIHByaW9yaXR5LFxuICAgICAgICBzdGF0dXMsXG4gICAgICAgIGlkLFxuICAgICAgICBwcm9qZWN0SWQsXG4gICAgICB9O1xuICAgICAgY29uc3QgcHJvamVjdCA9IF9maW5kUHJvamVjdEJ5SWQocHJvamVjdElkKTtcbiAgICAgIGlmICghcHJvamVjdCkgcmV0dXJuO1xuICAgICAgcHJvamVjdC50b2Rvcy5wdXNoKHRvZG8pO1xuICAgICAgcmV0dXJuIHRvZG87XG4gICAgfSxcblxuICAgIGdldFRvZG8oaWQpIHtcbiAgICAgIHJldHVybiBfZmluZFRvZG9CeUlkKGlkKTtcbiAgICB9LFxuXG4gICAgcmVtb3ZlVG9kbyhpZCkge1xuICAgICAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgICBwcm9qZWN0LnRvZG9zID0gcHJvamVjdC50b2Rvcy5maWx0ZXIoKHRvZG8pID0+IHRvZG8uaWQgIT09IE51bWJlcihpZCkpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIHRvZ2dsZVRvZG8oaWQpIHtcbiAgICAgIGNvbnN0IHRvZG8gPSBfZmluZFRvZG9CeUlkKGlkKTtcbiAgICAgIGlmICghdG9kbykgcmV0dXJuO1xuICAgICAgdG9kby5zdGF0dXMgPSB0b2RvLnN0YXR1cyA9PT0gXCJwZW5kaW5nXCIgPyBcImNvbXBsZXRlZFwiIDogXCJwZW5kaW5nXCI7XG4gICAgfSxcblxuICAgIGFkZFByb2plY3QobmFtZSkge1xuICAgICAgY29uc3QgdG9kb3MgPSBbXTtcbiAgICAgIGNvbnN0IGlkID0gX2dpdmVJZFRvSXRlbShwcm9qZWN0cyk7XG4gICAgICBjb25zdCBwcm9qZWN0ID0geyBuYW1lLCB0b2RvcywgaWQgfTtcbiAgICAgIHByb2plY3RzLnB1c2gocHJvamVjdCk7XG4gICAgICByZXR1cm4gcHJvamVjdDtcbiAgICB9LFxuXG4gICAgZ2V0UHJvamVjdChpZCkge1xuICAgICAgY29uc3QgcHJvamVjdCA9IF9maW5kUHJvamVjdEJ5SWQoaWQpO1xuICAgICAgY29uc3QgdG9kb3MgPSBfc29ydFRvZG9zKHByb2plY3QudG9kb3MpO1xuICAgICAgcmV0dXJuIHsgLi4ucHJvamVjdCwgdG9kb3MgfTtcbiAgICB9LFxuXG4gICAgcmVtb3ZlUHJvamVjdChpZCkge1xuICAgICAgLy8gY2FuJ3QgcmVtb3ZlIGRlZmF1bHQgcHJvamVjdFxuICAgICAgaWYgKE51bWJlcihpZCkgPT09IDEpIHJldHVybjtcbiAgICAgIHByb2plY3RzID0gcHJvamVjdHMuZmlsdGVyKChwcm9qZWN0KSA9PiBwcm9qZWN0LmlkICE9PSBOdW1iZXIoaWQpKTtcbiAgICB9LFxuXG4gICAgZ2V0IGxlbmd0aHMoKSB7XG4gICAgICByZXR1cm4gX2ZpbmRMZW5ndGhzT2ZQcm9qZWN0cygpO1xuICAgIH0sXG5cbiAgICBnZXQgdG9kb3MoKSB7XG4gICAgICBsZXQgdG9kb3MgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgcHJvamVjdCBvZiBwcm9qZWN0cykge1xuICAgICAgICB0b2RvcyA9IHRvZG9zLmNvbmNhdChwcm9qZWN0LnRvZG9zKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfc29ydFRvZG9zKHRvZG9zKTtcbiAgICB9LFxuXG4gICAgZ2V0IHByb2plY3RzKCkge1xuICAgICAgcmV0dXJuIHByb2plY3RzO1xuICAgIH0sXG4gICAgc2V0IHByb2plY3RzKHZhbCkge1xuICAgICAgcHJvamVjdHMgPSB2YWw7XG4gICAgfSxcblxuICAgIGdldCBwZW5kaW5nKCkge1xuICAgICAgcmV0dXJuIF9zb3J0VG9kb3ModGhpcy50b2Rvcy5maWx0ZXIoKHRvZG8pID0+IHRvZG8uc3RhdHVzID09PSBcInBlbmRpbmdcIikpO1xuICAgIH0sXG5cbiAgICBnZXQgY29tcGxldGVkKCkge1xuICAgICAgcmV0dXJuIF9zb3J0VG9kb3MoXG4gICAgICAgIHRoaXMudG9kb3MuZmlsdGVyKCh0b2RvKSA9PiB0b2RvLnN0YXR1cyA9PT0gXCJjb21wbGV0ZWRcIilcbiAgICAgICk7XG4gICAgfSxcblxuICAgIGdldCB0b2RheSgpIHtcbiAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgIHJldHVybiBfc29ydFRvZG9zKFxuICAgICAgICB0aGlzLnRvZG9zLmZpbHRlcigodG9kbykgPT4ge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0b2RvLmR1ZURhdGUuZ2V0RGF0ZSgpID09PSB0b2RheS5nZXREYXRlKCkgJiZcbiAgICAgICAgICAgIHRvZG8uZHVlRGF0ZS5nZXRNb250aCgpID09PSB0b2RheS5nZXRNb250aCgpICYmXG4gICAgICAgICAgICB0b2RvLmR1ZURhdGUuZ2V0RnVsbFllYXIoKSA9PT0gdG9kYXkuZ2V0RnVsbFllYXIoKSAmJlxuICAgICAgICAgICAgdG9kby5zdGF0dXMgPT09IFwicGVuZGluZ1wiXG4gICAgICAgICAgKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSxcblxuICAgIGN1cnJlbnRQcm9qZWN0OiAxLFxuICAgIGVkaXRlZFRvZG86IC0xLFxuICAgIG1vZGU6IFwiYWRkaW5nVG9kb1wiLFxuICB9O1xufSkoKTtcblxuKCgpID0+IHtcbiAgZXZlbnRzSGFuZGxlci5vbihcImFwcFN0YXJ0ZWRcIiwgKHBhcnNlZFByb2plY3RzKSA9PiB7XG4gICAgaWYgKHBhcnNlZFByb2plY3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRvZG9MaXN0LnByb2plY3RzID0gcGFyc2VkUHJvamVjdHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNyZWF0ZUV4YW1wbGVUb2RvcygpO1xuICAgIH1cbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoXCJhbGxUYWJTZWxlY3RlZFwiLCB0b2RvTGlzdC50b2Rvcyk7XG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKFwicHJvamVjdHNQYXJzZWRcIiwgdG9kb0xpc3QucHJvamVjdHMpO1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihcInRvZG9zQ2hhbmdlZFwiLCB0b2RvTGlzdC5sZW5ndGhzKTtcbiAgfSk7XG5cbiAgZXZlbnRzSGFuZGxlci5vbihcImFsbFRhYkNsaWNrZWRcIiwgKCkgPT4ge1xuICAgIHRvZG9MaXN0LmN1cnJlbnRQcm9qZWN0ID0gMTtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoXCJhbGxUYWJTZWxlY3RlZFwiLCB0b2RvTGlzdC50b2Rvcyk7XG4gIH0pO1xuXG4gIGV2ZW50c0hhbmRsZXIub24oXCJwZW5kaW5nVGFiQ2xpY2tlZFwiLCAoKSA9PiB7XG4gICAgdG9kb0xpc3QuY3VycmVudFByb2plY3QgPSAxO1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihcInBlbmRpbmdUYWJTZWxlY3RlZFwiLCB0b2RvTGlzdC5wZW5kaW5nKTtcbiAgfSk7XG5cbiAgZXZlbnRzSGFuZGxlci5vbihcInRvZGF5VGFiQ2xpY2tlZFwiLCAoKSA9PiB7XG4gICAgdG9kb0xpc3QuY3VycmVudFByb2plY3QgPSAxO1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihcInRvZGF5VGFiU2VsZWN0ZWRcIiwgdG9kb0xpc3QudG9kYXkpO1xuICB9KTtcblxuICBldmVudHNIYW5kbGVyLm9uKFwiY29tcGxldGVkVGFiQ2xpY2tlZFwiLCAoKSA9PiB7XG4gICAgdG9kb0xpc3QuY3VycmVudFByb2plY3QgPSAxO1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihcImNvbXBsZXRlZFRhYlNlbGVjdGVkXCIsIHRvZG9MaXN0LmNvbXBsZXRlZCk7XG4gIH0pO1xuXG4gIGV2ZW50c0hhbmRsZXIub24oXCJwcm9qZWN0VGFiQ2xpY2tlZFwiLCAocHJvamVjdElkKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdCA9IHRvZG9MaXN0LmdldFByb2plY3QocHJvamVjdElkKTtcbiAgICB0b2RvTGlzdC5jdXJyZW50UHJvamVjdCA9IHByb2plY3RJZDtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoXCJwcm9qZWN0VGFiU2VsZWN0ZWRcIiwgcHJvamVjdCk7XG4gIH0pO1xuXG4gIGV2ZW50c0hhbmRsZXIub24oXCJwcm9qZWN0SW5wdXRlZFwiLCAobmFtZSkgPT4ge1xuICAgIGNvbnN0IHByb2plY3QgPSB0b2RvTGlzdC5hZGRQcm9qZWN0KG5hbWUpO1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihcInByb2plY3RBZGRlZFwiLCBwcm9qZWN0KTtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoXCJ0b2RvTGlzdENoYW5nZWRcIiwgdG9kb0xpc3QucHJvamVjdHMpO1xuICB9KTtcblxuICBldmVudHNIYW5kbGVyLm9uKFwicHJvamVjdERlbGV0ZWRcIiwgKHByb2plY3RJZCkgPT4ge1xuICAgIHRvZG9MaXN0LnJlbW92ZVByb2plY3QocHJvamVjdElkKTtcbiAgICBpZiAocHJvamVjdElkID09PSB0b2RvTGlzdC5jdXJyZW50UHJvamVjdCkge1xuICAgICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKFwiYWxsVGFiU2VsZWN0ZWRcIik7XG4gICAgfVxuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihcInRvZG9MaXN0Q2hhbmdlZFwiLCB0b2RvTGlzdC5wcm9qZWN0cyk7XG4gIH0pO1xuXG4gIGV2ZW50c0hhbmRsZXIub24oXCJ0b2RvSW5wdXRlZFwiLCAodG9kb0RhdGEpID0+IHtcbiAgICBpZiAodG9kb0xpc3QubW9kZSA9PT0gXCJlZGl0aW5nVG9kb1wiKSB7XG4gICAgICBjb25zdCB0b2RvID0gdG9kb0xpc3QuZ2V0VG9kbyh0b2RvTGlzdC5lZGl0ZWRUb2RvKTtcbiAgICAgIHRvZG8ubmFtZSA9IHRvZG9EYXRhLm5hbWU7XG4gICAgICB0b2RvLmR1ZURhdGUgPSB0b2RvRGF0YS5kdWVEYXRlO1xuICAgICAgdG9kby50YWdzID0gdG9kb0RhdGEudGFncztcbiAgICAgIHRvZG8ubm90ZXMgPSB0b2RvRGF0YS5ub3RlcztcbiAgICAgIHRvZG8ucHJpb3JpdHkgPSB0b2RvRGF0YS5wcmlvcml0eTtcbiAgICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihcInRvZG9FZGl0ZWRcIiwgdG9kbyk7XG4gICAgfVxuICAgIGlmICh0b2RvTGlzdC5tb2RlID09PSBcImFkZGluZ1RvZG9cIikge1xuICAgICAgY29uc3QgdG9kbyA9IHRvZG9MaXN0LmFkZFRvZG8oe1xuICAgICAgICAuLi50b2RvRGF0YSxcbiAgICAgICAgcHJvamVjdElkOiB0b2RvTGlzdC5jdXJyZW50UHJvamVjdCxcbiAgICAgIH0pO1xuICAgICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKFwidG9kb0FkZGVkXCIsIHRvZG8pO1xuICAgIH1cbiAgICB0b2RvTGlzdC5tb2RlID0gXCJhZGRpbmdUb2RvXCI7XG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKFwidG9kb3NDaGFuZ2VkXCIsIHRvZG9MaXN0Lmxlbmd0aHMpO1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihcInRvZG9MaXN0Q2hhbmdlZFwiLCB0b2RvTGlzdC5wcm9qZWN0cyk7XG4gIH0pO1xuXG4gIGV2ZW50c0hhbmRsZXIub24oXCJ0b2RvVG9nZ2xlZFwiLCAodG9kb0lkKSA9PiB7XG4gICAgdG9kb0xpc3QudG9nZ2xlVG9kbyh0b2RvSWQpO1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihcInRvZG9zQ2hhbmdlZFwiLCB0b2RvTGlzdC5sZW5ndGhzKTtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoXCJ0b2RvTGlzdENoYW5nZWRcIiwgdG9kb0xpc3QucHJvamVjdHMpO1xuICB9KTtcblxuICBldmVudHNIYW5kbGVyLm9uKFwiZWRpdEJ1dHRvbkNsaWNrZWRcIiwgKHRvZG8pID0+IHtcbiAgICB0b2RvTGlzdC5tb2RlID0gXCJlZGl0aW5nVG9kb1wiO1xuICAgIHRvZG9MaXN0LmVkaXRlZFRvZG8gPSB0b2RvLmlkO1xuICB9KTtcblxuICBldmVudHNIYW5kbGVyLm9uKFwiZGVsZXRlQnV0dG9uQ2xpY2tlZFwiLCAodG9kbykgPT4ge1xuICAgIHRvZG9MaXN0LnJlbW92ZVRvZG8odG9kby5pZCk7XG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKFwidG9kb0RlbGV0ZWRcIiwgdG9kbyk7XG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKFwidG9kb3NDaGFuZ2VkXCIsIHRvZG9MaXN0Lmxlbmd0aHMpO1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihcInRvZG9MaXN0Q2hhbmdlZFwiLCB0b2RvTGlzdC5wcm9qZWN0cyk7XG4gIH0pO1xuXG4gIGV2ZW50c0hhbmRsZXIub24oXCJjbGVhckRvbmVDbGlja2VkXCIsICh0b2Rvc0lkcykgPT4ge1xuICAgIGZvciAoY29uc3QgaWQgb2YgdG9kb3NJZHMpIHtcbiAgICAgIHRvZG9MaXN0LnJlbW92ZVRvZG8oaWQpO1xuICAgIH1cbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoXCJ0b2Rvc0NoYW5nZWRcIiwgdG9kb0xpc3QubGVuZ3Rocyk7XG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKFwidG9kb0xpc3RDaGFuZ2VkXCIsIHRvZG9MaXN0LnByb2plY3RzKTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gY3JlYXRlRXhhbXBsZVRvZG9zKCkge1xuICAgIHRvZG9MaXN0LmFkZFRvZG8oe1xuICAgICAgbmFtZTogXCJUYWtlIGRvZyBmb3IgYSB3YWxrXCIsXG4gICAgICBkdWVEYXRlOiBuZXcgRGF0ZShcIjIwMjEtMTItMTRcIiksXG4gICAgICB0YWdzOiBbXCJkb2dnb1wiLCBcImhlYWx0aFwiXSxcbiAgICAgIG5vdGVzOiBbXCJcIl0sXG4gICAgICBwcmlvcml0eTogMSxcbiAgICB9KTtcbiAgICB0b2RvTGlzdC5hZGRUb2RvKHtcbiAgICAgIG5hbWU6IFwiQnV5IG1pbGtcIixcbiAgICAgIGR1ZURhdGU6IG5ldyBEYXRlKHVuZGVmaW5lZCksXG4gICAgICB0YWdzOiBbXCJncm9jZXJpZXNcIl0sXG4gICAgICBub3RlczogW1wiXCJdLFxuICAgICAgcHJpb3JpdHk6IDMsXG4gICAgfSk7XG4gICAgdG9kb0xpc3QuYWRkVG9kbyh7XG4gICAgICBuYW1lOiBcIkdvIHRvIGNpbmVtYSB3aXRoIEpvc2hcIixcbiAgICAgIGR1ZURhdGU6IG5ldyBEYXRlKFwiMjAyMS0xMi0xNlwiKSxcbiAgICAgIHRhZ3M6IFtcImpvc2hcIiwgXCJyZWxheFwiXSxcbiAgICAgIG5vdGVzOiBbXCJ2aXNpdCBBbm5lIG9uIG91ciB3YXkgaG9tZVwiXSxcbiAgICAgIHByaW9yaXR5OiAyLFxuICAgIH0pO1xuICAgIHRvZG9MaXN0LmFkZFRvZG8oe1xuICAgICAgbmFtZTogXCJWaXNpdCBkZW50aXN0XCIsXG4gICAgICBkdWVEYXRlOiBuZXcgRGF0ZShcIjIwMjEtMTItMThcIiksXG4gICAgICB0YWdzOiBbXCJoZWFsdGhcIl0sXG4gICAgICBub3RlczogW1wiMTc6MDBcIiwgXCJub3QgZWF0aW5nIGJlZm9yZSBnb2luZyB0byBkZW50aXN0XCJdLFxuICAgICAgcHJpb3JpdHk6IDEsXG4gICAgfSk7XG4gICAgdG9kb0xpc3QuYWRkVG9kbyh7XG4gICAgICBuYW1lOiBcIlZpc2l0IG5ldyBjYW5keSBzaG9wXCIsXG4gICAgICBkdWVEYXRlOiBuZXcgRGF0ZSh1bmRlZmluZWQpLFxuICAgICAgdGFnczogW1wiXCJdLFxuICAgICAgbm90ZXM6IFtcIlwiXSxcbiAgICAgIHByaW9yaXR5OiAzLFxuICAgIH0pO1xuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihcInRvZG9MaXN0Q2hhbmdlZFwiLCB0b2RvTGlzdC5wcm9qZWN0cyk7XG4gIH1cbn0pKCk7XG4iLCJmdW5jdGlvbiBmb3JtYXREYXRlKGRhdGUpIHtcbiAgaWYgKGlzTmFOKGRhdGUuZ2V0VGltZSgpKSkgcmV0dXJuIGBObyBkdWUgZGF0ZWBcblxuICBjb25zdCB5eXl5ID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICBjb25zdCBtbSA9IChkYXRlLmdldE1vbnRoKCkgKyAxKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7XG4gIGNvbnN0IGRkID0gZGF0ZS5nZXREYXRlKCkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xuXG4gIHJldHVybiBgJHt5eXl5fS0ke21tfS0ke2RkfWBcbn1cblxuZXhwb3J0IHtcbiAgZm9ybWF0RGF0ZVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL2Nzcy9zdHlsZS5jc3NcIjtcbmltcG9ydCBcIi4vanMvdG9kby5qc1wiO1xuaW1wb3J0IFwiLi9qcy9ldmVudHNIYW5kbGVyXCI7XG5pbXBvcnQgXCIuL2pzL2RvbS9zaWRlYmFyLmpzXCI7XG5pbXBvcnQgXCIuL2pzL2RvbS9tb2RhbC5qc1wiO1xuaW1wb3J0IFwiLi9qcy9kb20vbGlzdC5qc1wiO1xuaW1wb3J0IFwiLi9qcy9zdG9yYWdlXCI7XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==