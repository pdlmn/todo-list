import { eventsHandler } from './eventsHandler';

(() => {
  const parsedProjects = parseLocalStorage('projects') || [];

  eventsHandler.trigger('appStarted', convertDatesToDateObjects(parsedProjects));

  eventsHandler.on('todoListChanged', projects => {
    saveToLocalStorage('projects', projects);
    console.log(localStorage.getItem('projects'));
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
