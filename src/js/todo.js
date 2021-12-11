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

  mode: 'addingTodo',

  editedTodo: -1,

  addTodo({name, dueDate, tags, notes, priority, projectId = 1}) {
    const status = 'pending';
    const id = this.todos.length + 1;
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

  get todos() {
    let todos = [];
    for (const project of this.projects) {
      todos = todos.concat(project.todos);
    }
    return todos
  },

  get pending() {
    return this.todos.filter(todo => todo.status === 'pending')
  },

  get completed() {
    return this.todos.filter(todo => todo.status === 'completed')
  },

  get today() {
    const today = new Date();
    return this.todos.filter(todo => {
      return (
        todo.dueDate.getDate() === today.getDate() &&
        todo.dueDate.getMonth() === today.getMonth() &&
        todo.dueDate.getFullYear() === today.getFullYear() &&
        todo.status === 'pending'
      )
    });
  }
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
  for (const project of todoList.projects) {
    projectsLengths[project.id] = project.todos.length;
  }
  const staticTabsLengths = {
    pendingLength: todoList.pending.length,
    todayLength: todoList.today.length,
    completedLength: todoList.completed.length,
  }
  return Object.assign(
    projectsLengths,
    staticTabsLengths
  )
}

eventsHandler.on('pendingTabClicked', () => {
  eventsHandler.trigger('pendingTabSelected', todoList.todos);
});

eventsHandler.on('todayTabClicked', () => {
  eventsHandler.trigger('todayTabSelected', todoList.today);
});

eventsHandler.on('completedTabClicked', () => {
  eventsHandler.trigger('completedTabSelected', todoList.completed);
});

eventsHandler.on('projectTabClicked', projectId => {
  const project = findProjectById(projectId);
  todoList.currentProject = project.id;
  eventsHandler.trigger('projectTabSelected', project);
});

eventsHandler.on('projectInputed', name => {
  const project = todoList.addProject(name);
  eventsHandler.trigger('projectAdded', project);
});

eventsHandler.on('projectDeleted', projectId => {
  console.log(todoList.projects)
  todoList.removeProject(projectId);
});

eventsHandler.on('todoInputed', todoData => {
  if (todoList.mode === 'editingTodo') {
    console.log(todoData);
    const todo = findTodoById(todoList.editedTodo);
    todo.name = todoData.name;
    todo.dueDate = todoData.dueDate;
    todo.tags = todoData.tags;
    todo.notes = todoData.notes;
    todo.priority = todoData.priority;
    eventsHandler.trigger('todoEdited', todo);
  }
  if (todoList.mode === 'addingTodo') {
    const todo = todoList.addTodo(todoData);
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
  console.log(todoList.todos);
  eventsHandler.trigger('todoDeleted', todo);
  eventsHandler.trigger('todosChanged', findLengthsOfProjects());
});
