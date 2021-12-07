import { eventsHandler } from "./eventsHandler"

const todoList = {
  projects: [
    {
      todos: [],
      name: 'default todo list',
      id: 1
    }
  ],

  currentProject: 1,

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
    todo.status = todo.status === 'pending' ? 'completed' : 'pending';
  },

  addTag(id, tag) {
    const todo = findTodoById(id);
    if (!todo) return
    todo.tags.push(tag);
  },

  removeTag(id, removedTag) {
    const todo = findTodoById(id);
    if (!todo) return
    todo.tags = todo.tags.filter(tag => tag !== removedTag);
  },

  addNote(id, note) {
    const todo = findTodoById(id);
    if (!todo) return
    todo.notes.push(note);
  },

  removeNote(id, removedNote) {
    const todo = findTodoById(id);
    if (!todo) return
    todo.notes = todo.notes.filter(note => note !== removedNote);
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
        todo.dueDate.getFullYear() === today.getFullYear()
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
    homeLength: todoList.todos.length,
    todayLength: todoList.today.length,
    completedLength: todoList.completed.length,
  }
  return Object.assign(
    projectsLengths,
    staticTabsLengths
  )
}

eventsHandler.on('homeTabClicked', () => {
  eventsHandler.trigger('homeTabSelected', todoList.todos);
});

eventsHandler.on('todayTabClicked', () => {
  eventsHandler.trigger('todayTabSelected', todoList.today);
});

eventsHandler.on('completedTabClicked', () => {
  eventsHandler.trigger('completedTabSelected', todoList.completed);
});

eventsHandler.on('projectTabClicked', projectId => {
  const project = todoList.findProjectById(projectId);
  eventsHandler.trigger('projectTabSelected', project.todos);
});

eventsHandler.on('projectInputed', name => {
  const project = todoList.addProject(name);
  eventsHandler.trigger('projectCreated', project);
});

eventsHandler.on('projectDeleted', id => {
  todoList.removeProject(id);
});

eventsHandler.on('todoInputed', todoData => {
  const todo = todoList.addTodo(todoData);
  console.log(findLengthsOfProjects());
  eventsHandler.trigger('todoAdded', findLengthsOfProjects());
});
