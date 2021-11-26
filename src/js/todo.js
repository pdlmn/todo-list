const hasTags = state => {
  return {
    addTag(tag) {
      state.tags.push(tag);
    },
    removeTag(removedTag) {
      state.tags = state.tags.filter(tag => tag !== removedTag);
    }
  }
};

const hasNotes = state => {
  return {
    addNote(note) {
      state.note.push(note);
    },
    removeNote(removedNote) {
      state.notes = state.notes.filter(note => note !== removedNote)
    }
  }
};

const hasTodos = state => {
  return {
    addTodo(todo) {
      state.todos.push(todo);
    },
    removeTodo(id) {
      state.todos = state.todos.filter(todo => todo.id !== id);
    }
  }
};

function Todo(name, priority, status, tags, notes, id, dueDate) {
  const type = 'todo';
  const state = { name, priority, status, tags, notes, id, dueDate, type };
  return Object.assign(
    state,
    hasTags(state),
    hasNotes(state)
  )
}

function Project(name, priority, status, tags, id, todos) {
  const type = 'project';
  const state = { name, priority, status, tags, id, todos, type };
  return Object.assign(
    state,
    hasTags(state),
    hasTodos(state)
  )
}

export const todoList = (function() {
  const todos = {
    todos: [],

    generateId() {
      return this.todos.length + 1;
    },

    set init(arrOfTodos) {
      this.todos = [...arrOfTodos]
    }
  };

  return Object.assign(
    todos,
    hasTodos(todos),
  )
})();
