export const todoList = {
  items: [],

  Todo(name, priority, status, tags, notes, dueDate) {
    const type = 'todo';
    const id = this.todos.length + 1;
    const todo = { name, priority, status, tags, notes, id, dueDate, type };
    this.items.push(todo);
    return todo
  },

  Project(name, priority, status, tags, todos) {
    const type = 'project';
    const id = this.todos.length + 1;
    const project = { name, priority, status, tags, id, todos, type };
    this.items.push(project);
    return project
  },

  removeItem(id) {
    this.items = this.items.filter(item => item.id !== Number(id));
  },

  addTag(id, tag) {
    const index = this.items.findIndex(item => item.id === Number(id));
    if (index === -1) return

    const item = this.items[index];
    item.tags.push(tag);
  },

  removeTag(id, removedTag) {
    const index = this.items.findIndex(item => item.id === Number(id));
    if (index === -1) return

    const item = this.items[index]
    item.tags = item.tags.filter(tag => tag !== removedTag);
  },

  addNote(id, note) {
    const index = this.todos.findIndex(item => item.id === Number(id));
    if (index === -1) return

    const todo = this.todos[index];
    todo.notes.push(note);
  },

  removeNote(id, removedNote) {
    const index = this.todos.findIndex(item => item.id === Number(id));
    if (index === -1) return

    const todo = this.todos[index];
    todo.notes = todo.notes.filter(note => note !== removedNote)
  },

  get todos() {
    return this.items.filter(item => item.type === 'todo')
  },

  get projects() {
    return this.items.filter(item => item.type === 'project')
  },

  set init(arrOfTodos) {
    this.todos = arrOfTodos;
  }
};
