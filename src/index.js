import "./css/style.css";
import { todoList } from "./js/todo.js";
import { components } from "./js/components.js";

const sidebar = document.querySelector('#sidebar');
const projects = document.querySelector('#projects');
const createProjectButton = document.querySelector('#create-project');

// HANDLES THE BEHAVIOUR OF THE SIDEBAR
(() => {
  createProjectButton.addEventListener('click', handleCreateProjectClick);
  window.addEventListener('click', destroyInputDivIfClickedOutside);

  function handleCreateProjectClick() {
    const inputDiv = components.createProjectInput();
    const input = inputDiv.firstChild;
    const button = inputDiv.lastChild;

    createProjectButton.before(
      inputDiv
    )
    input.focus();
    button.addEventListener('click', () => {
      const newProject = todoList.addProject(input.value);
      projects.append(components.createProjectTab(newProject));
      console.log(todoList.projects);

      inputDiv.remove();
    });
  }

  function destroyInputDivIfClickedOutside(e) {
    if (e.target.parentNode.dataset.type === 'input-div' ||
        e.target.id === 'create-project') {
      return
    }
    document.querySelectorAll('[data-type=input-div]').forEach(el => el.remove());
  }
})();

// HANDLES THE BEHAVIOUR 
(() => {
  
})();
