import { eventsHandler } from "./eventsHandler"

const todoList = {
  projects: [],

  addTodo(name, priority, tags, notes, dueDate, projectId) {
    const status = 'pending';
    const id = this.todos.length + 1;
    const todo =  { name, priority, tags, notes, dueDate, status, id };
    const project = findProjectById(projectId);
    if (!project) return 
    project.todos.push(todo);
    return todo
  },

  addProject(name) {
    const todos = [];
    const id = this.projects.length + 1;
    const project = { name, todos, todos, id }
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

eventsHandler.on('projectInputed', name => {
  const project = todoList.addProject(name);
  eventsHandler.trigger('projectCreated', project);
});

eventsHandler.on('projectDeleted', id => {
  todoList.removeProject(id);
});
