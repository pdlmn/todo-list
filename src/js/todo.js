import { eventsHandler } from "./eventsHandler"

const todoList = {
  projects: [
    {
      name: 'default todo list',
      todos: [],
      id: 1
    }
  ],

  currentProject: 1,

  editedTodo: -1,

  mode: 'addingTodo',

  addTodo({name, dueDate, tags, notes, priority, projectId = 1}) {
    const status = 'pending';
    const id = giveIdToTodo();
    const todo =  { name, dueDate, tags, notes, priority, status, id, projectId };
    const project = findProjectById(projectId);
    if (!project) return 
    project.todos.push(todo);
    return todo
  },

  addProject(name) {
    const todos = [];
    const id = this.projects.length + 1;
    const project = { name, todos, id }
    this.projects.push(project);
    return project
  },

  removeTodo(id) {
    this.projects.forEach(project => {
      project.todos = project.todos.filter(todo => todo.id !== Number(id));
    });
  },

  toggleTodo(id) {
    const todo = findTodoById(id);
    if (!todo) return
    todo.status = (todo.status === 'pending') ? 'completed' : 'pending';
  },

  removeProject(id) {
    // can't remove default project
    if (Number(id) === 1) return

    this.projects = this.projects.filter(project => project.id !== Number(id));
  },

  proj(index) {
    return {
      get todos() {
        return sortTodos(findProjectById(index).todos)
      },

      get pending() {
        return sortTodos(findProjectById(index).todos.filter(todo => todo.status === 'pending'))
      }
    }
  },

  get todos() {
    let todos = [];
    for (const project of this.projects) {
      todos = todos.concat(project.todos);
    }
    return sortTodos(todos)
  },

  get pending() {
    return sortTodos(this.todos.filter(todo => todo.status === 'pending'));
  },

  get completed() {
    return sortTodos(this.todos.filter(todo => todo.status === 'completed'));
  },

  get today() {
    const today = new Date();
    return sortTodos(this.todos.filter(todo => {
      return (
        todo.dueDate.getDate() === today.getDate() &&
        todo.dueDate.getMonth() === today.getMonth() &&
        todo.dueDate.getFullYear() === today.getFullYear() &&
        todo.status === 'pending'
      )
    }));
  }
}

function giveIdToTodo() {
  const todosSortedById = [...todoList.todos].sort((todo1, todo2) => todo1.id - todo2.id);
  const lastTodo = todosSortedById[todosSortedById.length - 1];
  if (lastTodo) return lastTodo.id + 1
  return 1
}

function findProjectById(id) {
  const index = todoList.projects.findIndex(project => project.id === Number(id));
  return todoList.projects[index]
}

function findTodoById(id) {
  for (const project of todoList.projects) {
    for (const todo of project.todos) {
      if (todo.id === id) return todo
    }
  }
}

function findLengthsOfProjects() {
  const projectsLengths = {}
  for (let i = 0, l = todoList.projects.length; i < l; ++i) {
    const id = todoList.projects[i].id;
    projectsLengths[id] = todoList.proj(id).pending.length;
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

function sortTodos(todos) {
  return [...todos].sort((todo1, todo2) => todo1.dueDate - todo2.dueDate)
              .sort((todo1, todo2) => todo1.priority - todo2.priority)
              .sort((todo1, todo2) => todo1.status === 'completed' ? 1 : -1)
}

eventsHandler.on('allTabClicked', () => {
  todoList.currentProject = 1;
  eventsHandler.trigger('allTabSelected', todoList.todos);
});

eventsHandler.on('pendingTabClicked', () => {
  todoList.currentProject = 1;
  eventsHandler.trigger('pendingTabSelected', todoList.pending);
});

eventsHandler.on('todayTabClicked', () => {
  todoList.currentProject = 1;
  eventsHandler.trigger('todayTabSelected', todoList.today);
});

eventsHandler.on('completedTabClicked', () => {
  todoList.currentProject = 1;
  eventsHandler.trigger('completedTabSelected', todoList.completed);
});

eventsHandler.on('projectTabClicked', projectId => {
  const project = findProjectById(projectId);
  todoList.currentProject = projectId;
  eventsHandler.trigger('projectTabSelected', {...project, todos: todoList.proj(projectId).todos});
});

eventsHandler.on('projectInputed', name => {
  const project = todoList.addProject(name);
  eventsHandler.trigger('projectAdded', project);
});

eventsHandler.on('projectDeleted', projectId => {
  console.log(todoList.projects)
  todoList.removeProject(projectId);
  if (projectId === todoList.currentProject) {
    eventsHandler.trigger('allTabSelected');
  } 
});

eventsHandler.on('todoInputed', todoData => {
  if (todoList.mode === 'editingTodo') {
    const todo = findTodoById(todoList.editedTodo);
    todo.name = todoData.name;
    todo.dueDate = todoData.dueDate;
    todo.tags = todoData.tags;
    todo.notes = todoData.notes;
    todo.priority = todoData.priority;
    eventsHandler.trigger('todoEdited', todo);
  }
  if (todoList.mode === 'addingTodo') {
    const todo = todoList.addTodo({...todoData, projectId: todoList.currentProject});
    console.log(findProjectById(todoList.currentProject));
    eventsHandler.trigger('todoAdded', todo);
  }
  eventsHandler.trigger('todosChanged', findLengthsOfProjects());
  todoList.mode = 'addingTodo';
});

eventsHandler.on('todoToggled', todoId => {
  todoList.toggleTodo(todoId);
  eventsHandler.trigger('todosChanged', findLengthsOfProjects());
});

eventsHandler.on('editButtonClicked', todo => {
  todoList.mode = 'editingTodo';
  todoList.editedTodo = todo.id;
});

eventsHandler.on('deleteButtonClicked', todo => {
  todoList.removeTodo(todo.id);
  eventsHandler.trigger('todoDeleted', todo);
  eventsHandler.trigger('todosChanged', findLengthsOfProjects());
});

eventsHandler.on('clearDoneClicked', todosIds => {
  for (const id of todosIds) {
    todoList.removeTodo(id);
  }
  eventsHandler.trigger('todosChanged', findLengthsOfProjects());
});
