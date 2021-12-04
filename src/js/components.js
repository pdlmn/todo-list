// CREATES AND EXPORTS OBJECT WITH DIFFERENT FUNCTIONS FOR CREATING DOM ELEMENTS
export const components = (() => {
  return {
    createProjectTab(project) {
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

      deleteButton.append(deleteButtonIcon);
      statusDiv.append(deleteButton, statusCircleDiv, statusNumberDiv);
      liWrapper.append(nameDiv, statusDiv);

      return liWrapper
    },

    createProjectInput() {
      const inputDiv = document.createElement('div');
      const input = document.createElement('input');
      const inputButton = document.createElement('button');

      inputDiv.classList.add('flex-row');
      input.classList.add('create-project-input');
      inputButton.classList.add('project-input-button');

      inputButton.textContent = '+';

      inputDiv.dataset.type = 'input-div';
      inputDiv.append(input, inputButton);

      return inputDiv
    }
  }
})();
