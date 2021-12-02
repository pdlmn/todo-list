export function createProjectTab(project) {
  const liWrapper = document.createElement('li');
  const nameDiv = document.createElement('div');
  const statusDiv = document.createElement('div');
  const statusCircleDiv = document.createElement('div');
  const statusNumberDiv = document.createElement('div');
  
  liWrapper.classList.add('list');
  statusDiv.classList.add('list-status');
  statusCircleDiv.classList.add('list-status-circle');
  statusNumberDiv.classList.add('list-status-number');

  liWrapper.id = `project${project.id}`;

  nameDiv.textContent = project.name;
  statusNumberDiv.textContent = project.todos.length;

  statusDiv.append(statusCircleDiv, statusNumberDiv);
  liWrapper.append(nameDiv, statusDiv);

  return liWrapper
}
