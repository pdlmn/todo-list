import { eventsHandler } from "../eventsHandler.js"

const sidebar = document.querySelector('#sidebar');
const projectsList = document.querySelector('#projects');
const createProjectButton = document.querySelector('#create-project');

const projectTabs = document.querySelectorAll('.list');
const home = document.querySelector('#home');
const today = document.querySelector('#today');
const completed = document.querySelector('#completed');
const projects = document.querySelectorAll('[data-project]');

(() => {
  eventsHandler.on('projectCreated', createProjectTab);
  eventsHandler.on('projectDeleted', deleteProjectTab);

  window.addEventListener('click', destroyInputDivIfClickedOutside);

  createProjectButton.addEventListener('click', createProjectInput);

  projectTabs.forEach(project => {
    project.addEventListener('click', selectTab);
  })

  home.addEventListener('click', () => {
    eventsHandler.trigger('homeTabClicked');
  });

  today.addEventListener('click', () => {
    eventsHandler.trigger('todayTabClicked');
  });

  completed.addEventListener('click', () => {
    eventsHandler.trigger('completedTabClicked');
  });

  projects.forEach(project => {
    project.addEventListener('click', project => {
      eventsHandler.trigger('projectTabClicked', this.dataset.project);
    });
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
  deleteButton.classList.add('project-icon');
  deleteButtonIcon.classList.add('iconify');
  statusCircleDiv.classList.add('list-status-circle');
  statusNumberDiv.classList.add('list-status-number');

  liWrapper.dataset.project = project.id;
  deleteButtonIcon.dataset.icon = "fluent:delete-24-filled";

  nameDiv.textContent = project.name;
  statusNumberDiv.textContent = project.todos.length;

  liWrapper.addEventListener('click', selectTab);
  deleteButton.addEventListener('click', () => { 
    eventsHandler.trigger('projectDeleted', project.id)
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
    eventsHandler.trigger('projectInputed', input.value);
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
