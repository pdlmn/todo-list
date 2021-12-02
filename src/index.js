import "./css/style.css";
import { todoList } from "./js/todo.js";
import { createProjectTab } from "./js/dom.js";

const projects = document.querySelector('#projects');

projects.append(createProjectTab(todoList.addProject('Heh')));
