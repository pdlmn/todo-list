import { eventsHandler } from "./eventsHandler";

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
  eventsHandler.on("appStarted", (parsedProjects) => {
    if (parsedProjects.length > 0) {
      todoList.projects = parsedProjects;
    } else {
      createExampleTodos();
    }
    eventsHandler.trigger("allTabSelected", todoList.todos);
    eventsHandler.trigger("projectsParsed", todoList.projects);
    eventsHandler.trigger("todosChanged", todoList.lengths);
  });

  eventsHandler.on("allTabClicked", () => {
    todoList.currentProject = 1;
    eventsHandler.trigger("allTabSelected", todoList.todos);
  });

  eventsHandler.on("pendingTabClicked", () => {
    todoList.currentProject = 1;
    eventsHandler.trigger("pendingTabSelected", todoList.pending);
  });

  eventsHandler.on("todayTabClicked", () => {
    todoList.currentProject = 1;
    eventsHandler.trigger("todayTabSelected", todoList.today);
  });

  eventsHandler.on("completedTabClicked", () => {
    todoList.currentProject = 1;
    eventsHandler.trigger("completedTabSelected", todoList.completed);
  });

  eventsHandler.on("projectTabClicked", (projectId) => {
    const project = todoList.getProject(projectId);
    todoList.currentProject = projectId;
    eventsHandler.trigger("projectTabSelected", project);
  });

  eventsHandler.on("projectInputed", (name) => {
    const project = todoList.addProject(name);
    eventsHandler.trigger("projectAdded", project);
    eventsHandler.trigger("todoListChanged", todoList.projects);
  });

  eventsHandler.on("projectDeleted", (projectId) => {
    todoList.removeProject(projectId);
    if (projectId === todoList.currentProject) {
      eventsHandler.trigger("allTabSelected");
    }
    eventsHandler.trigger("todoListChanged", todoList.projects);
  });

  eventsHandler.on("todoInputed", (todoData) => {
    if (todoList.mode === "editingTodo") {
      const todo = todoList.getTodo(todoList.editedTodo);
      todo.name = todoData.name;
      todo.dueDate = todoData.dueDate;
      todo.tags = todoData.tags;
      todo.notes = todoData.notes;
      todo.priority = todoData.priority;
      eventsHandler.trigger("todoEdited", todo);
    }
    if (todoList.mode === "addingTodo") {
      const todo = todoList.addTodo({
        ...todoData,
        projectId: todoList.currentProject,
      });
      eventsHandler.trigger("todoAdded", todo);
    }
    todoList.mode = "addingTodo";
    eventsHandler.trigger("todosChanged", todoList.lengths);
    eventsHandler.trigger("todoListChanged", todoList.projects);
  });

  eventsHandler.on("todoToggled", (todoId) => {
    todoList.toggleTodo(todoId);
    eventsHandler.trigger("todosChanged", todoList.lengths);
    eventsHandler.trigger("todoListChanged", todoList.projects);
  });

  eventsHandler.on("editButtonClicked", (todo) => {
    todoList.mode = "editingTodo";
    todoList.editedTodo = todo.id;
  });

  eventsHandler.on("deleteButtonClicked", (todo) => {
    todoList.removeTodo(todo.id);
    eventsHandler.trigger("todoDeleted", todo);
    eventsHandler.trigger("todosChanged", todoList.lengths);
    eventsHandler.trigger("todoListChanged", todoList.projects);
  });

  eventsHandler.on("clearDoneClicked", (todosIds) => {
    for (const id of todosIds) {
      todoList.removeTodo(id);
    }
    eventsHandler.trigger("todosChanged", todoList.lengths);
    eventsHandler.trigger("todoListChanged", todoList.projects);
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
    eventsHandler.trigger("todoListChanged", todoList.projects);
  }
})();
