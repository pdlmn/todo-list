import { eventsHandler } from "./eventsHandler"

const todoList = (() => {
  let projects = [
    {
      name: 'default todo list',
      todos: [],
      id: 1
    }
  ]

  function giveIdToItem(arr) {
    const arrSortedById = [...arr].sort((item1, item2) => item1.id - item2.id);
    const lastItem = arrSortedById[arrSortedById.length - 1];
    if (lastItem) return lastItem.id + 1
    return 1
  }

  function findProjectById(id) {
    // const index = projects.findIndex(project => project.id === Number(id));
    return projects.find(project => project.id === Number(id));
  }

  function findTodoById(id) {
    for (const project of projects) {
      for (const todo of project.todos) {
        if (todo.id === id) return todo
      }
    }
  }

  function findLengthsOfProjects() {
    const projectsLengths = {}
    for (let i = 0, l = projects.length; i < l; ++i) {
      const id = projects[i].id;
      projectsLengths[id] = todoList.pendingOfProject(id).length;
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

  return {
    addTodo({name, dueDate, tags, notes, priority, projectId = 1}) {
      const status = 'pending';
      const id = giveIdToItem(todoList.todos);
      const todo =  { name, dueDate, tags, notes, priority, status, id, projectId };
      const project = findProjectById(projectId);
      if (!project) return 
      project.todos.push(todo);
      return todo
    },

    getTodo(id) {
      return findTodoById(id)
    },

    removeTodo(id) {
      projects.forEach(project => {
        project.todos = project.todos.filter(todo => todo.id !== Number(id));
      });
    },

    toggleTodo(id) {
      const todo = findTodoById(id);
      if (!todo) return
      todo.status = (todo.status === 'pending') ? 'completed' : 'pending';
    },

    addProject(name) {
      const todos = [];
      const id = giveIdToItem(projects);
      const project = { name, todos, id }
      projects.push(project);
      return project
    },

    getProject(id) {
      const project = findProjectById(id);
      const todos = sortTodos(project.todos)
      return {...project, todos}
    },

    removeProject(id) {
      // can't remove default project
      if (Number(id) === 1) return
      projects = projects.filter(project => project.id !== Number(id));
    },

    pendingOfProject(id) {
      return sortTodos(findProjectById(id).todos.filter(todo => todo.status === 'pending'))
    },

    lengths() {
      return findLengthsOfProjects()
    },

    get todos() {
      let todos = [];
      for (const project of projects) {
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
    },

    currentProject: 1,
    editedTodo: -1,
    mode: 'addingTodo'
  }
})();

(() => {
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
    const project = todoList.getProject(projectId);
    todoList.currentProject = projectId;
    eventsHandler.trigger('projectTabSelected', project);
  });

  eventsHandler.on('projectInputed', name => {
    const project = todoList.addProject(name);
    eventsHandler.trigger('projectAdded', project);
  });

  eventsHandler.on('projectDeleted', projectId => {
    console.log(projects)
    todoList.removeProject(projectId);
    if (projectId === todoList.currentProject) {
      eventsHandler.trigger('allTabSelected');
    } 
  });

  eventsHandler.on('todoInputed', todoData => {
    if (todoList.mode === 'editingTodo') {
      const todo = todoList.getTodo(todoList.editedTodo);
      todo.name = todoData.name;
      todo.dueDate = todoData.dueDate;
      todo.tags = todoData.tags;
      todo.notes = todoData.notes;
      todo.priority = todoData.priority;
      eventsHandler.trigger('todoEdited', todo);
    }
    if (todoList.mode === 'addingTodo') {
      const todo = todoList.addTodo({...todoData, projectId: todoList.currentProject});
      eventsHandler.trigger('todoAdded', todo);
    }
    console.log(todoList.todos)
    eventsHandler.trigger('todosChanged', todoList.lengths());
    todoList.mode = 'addingTodo';
  });

  eventsHandler.on('todoToggled', todoId => {
    todoList.toggleTodo(todoId);
    eventsHandler.trigger('todosChanged', todoList.lengths());
  });

  eventsHandler.on('editButtonClicked', todo => {
    todoList.mode = 'editingTodo';
    todoList.editedTodo = todo.id;
  });

  eventsHandler.on('deleteButtonClicked', todo => {
    todoList.removeTodo(todo.id);
    eventsHandler.trigger('todoDeleted', todo);
    eventsHandler.trigger('todosChanged', todoList.lengths());
  });

  eventsHandler.on('clearDoneClicked', todosIds => {
    for (const id of todosIds) {
      todoList.removeTodo(id);
    }
    eventsHandler.trigger('todosChanged', todoList.lengths());
  });
})();
