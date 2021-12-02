/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./css/style.css":
/*!***********************!*\
  !*** ./css/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./js/todo.js":
/*!********************!*\
  !*** ./js/todo.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "todoList": () => (/* binding */ todoList)
/* harmony export */ });
const todoList = {
  items: [],

  Todo(name, priority, tags, notes, dueDate) {
    const status = 'pending';
    const type = 'todo';
    const id = this.todos.length + 1;
    const todo = { name, priority, tags, notes, dueDate, id, status, type };
    this.items.push(todo);
    return todo
  },

  Project(name, priority, tags, todos) {
    const status = 'pending';
    const type = 'project';
    const id = this.todos.length + 1;
    const project = { name, priority, tags, todos, id, status, type };
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

  set init(arrOfItems) {
    this.items = arrOfItems;
  }
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/style.css */ "./css/style.css");
/* harmony import */ var _js_todo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/todo.js */ "./js/todo.js");






})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUNBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3BFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ055QjtBQUNlIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vY3NzL3N0eWxlLmNzcz85MzA2Iiwid2VicGFjazovLy8uL2pzL3RvZG8uanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiZXhwb3J0IGNvbnN0IHRvZG9MaXN0ID0ge1xuICBpdGVtczogW10sXG5cbiAgVG9kbyhuYW1lLCBwcmlvcml0eSwgdGFncywgbm90ZXMsIGR1ZURhdGUpIHtcbiAgICBjb25zdCBzdGF0dXMgPSAncGVuZGluZyc7XG4gICAgY29uc3QgdHlwZSA9ICd0b2RvJztcbiAgICBjb25zdCBpZCA9IHRoaXMudG9kb3MubGVuZ3RoICsgMTtcbiAgICBjb25zdCB0b2RvID0geyBuYW1lLCBwcmlvcml0eSwgdGFncywgbm90ZXMsIGR1ZURhdGUsIGlkLCBzdGF0dXMsIHR5cGUgfTtcbiAgICB0aGlzLml0ZW1zLnB1c2godG9kbyk7XG4gICAgcmV0dXJuIHRvZG9cbiAgfSxcblxuICBQcm9qZWN0KG5hbWUsIHByaW9yaXR5LCB0YWdzLCB0b2Rvcykge1xuICAgIGNvbnN0IHN0YXR1cyA9ICdwZW5kaW5nJztcbiAgICBjb25zdCB0eXBlID0gJ3Byb2plY3QnO1xuICAgIGNvbnN0IGlkID0gdGhpcy50b2Rvcy5sZW5ndGggKyAxO1xuICAgIGNvbnN0IHByb2plY3QgPSB7IG5hbWUsIHByaW9yaXR5LCB0YWdzLCB0b2RvcywgaWQsIHN0YXR1cywgdHlwZSB9O1xuICAgIHRoaXMuaXRlbXMucHVzaChwcm9qZWN0KTtcbiAgICByZXR1cm4gcHJvamVjdFxuICB9LFxuXG4gIHJlbW92ZUl0ZW0oaWQpIHtcbiAgICB0aGlzLml0ZW1zID0gdGhpcy5pdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtLmlkICE9PSBOdW1iZXIoaWQpKTtcbiAgfSxcblxuICBhZGRUYWcoaWQsIHRhZykge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pdGVtcy5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLmlkID09PSBOdW1iZXIoaWQpKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSByZXR1cm5cblxuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLml0ZW1zW2luZGV4XTtcbiAgICBpdGVtLnRhZ3MucHVzaCh0YWcpO1xuICB9LFxuXG4gIHJlbW92ZVRhZyhpZCwgcmVtb3ZlZFRhZykge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pdGVtcy5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLmlkID09PSBOdW1iZXIoaWQpKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSByZXR1cm5cblxuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLml0ZW1zW2luZGV4XVxuICAgIGl0ZW0udGFncyA9IGl0ZW0udGFncy5maWx0ZXIodGFnID0+IHRhZyAhPT0gcmVtb3ZlZFRhZyk7XG4gIH0sXG5cbiAgYWRkTm90ZShpZCwgbm90ZSkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy50b2Rvcy5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLmlkID09PSBOdW1iZXIoaWQpKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSByZXR1cm5cblxuICAgIGNvbnN0IHRvZG8gPSB0aGlzLnRvZG9zW2luZGV4XTtcbiAgICB0b2RvLm5vdGVzLnB1c2gobm90ZSk7XG4gIH0sXG5cbiAgcmVtb3ZlTm90ZShpZCwgcmVtb3ZlZE5vdGUpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMudG9kb3MuZmluZEluZGV4KGl0ZW0gPT4gaXRlbS5pZCA9PT0gTnVtYmVyKGlkKSk7XG4gICAgaWYgKGluZGV4ID09PSAtMSkgcmV0dXJuXG5cbiAgICBjb25zdCB0b2RvID0gdGhpcy50b2Rvc1tpbmRleF07XG4gICAgdG9kby5ub3RlcyA9IHRvZG8ubm90ZXMuZmlsdGVyKG5vdGUgPT4gbm90ZSAhPT0gcmVtb3ZlZE5vdGUpXG4gIH0sXG5cbiAgZ2V0IHRvZG9zKCkge1xuICAgIHJldHVybiB0aGlzLml0ZW1zLmZpbHRlcihpdGVtID0+IGl0ZW0udHlwZSA9PT0gJ3RvZG8nKVxuICB9LFxuXG4gIGdldCBwcm9qZWN0cygpIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtLnR5cGUgPT09ICdwcm9qZWN0JylcbiAgfSxcblxuICBzZXQgaW5pdChhcnJPZkl0ZW1zKSB7XG4gICAgdGhpcy5pdGVtcyA9IGFyck9mSXRlbXM7XG4gIH1cbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vY3NzL3N0eWxlLmNzc1wiO1xuaW1wb3J0IHsgdG9kb0xpc3QgfSBmcm9tIFwiLi9qcy90b2RvLmpzXCI7XG5cblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=