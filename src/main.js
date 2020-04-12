import {createLearnMoreButtonTemplate} from "./components/learn-more-button.js";
import {createSiteBoardTemplate} from "./components/board.js";
import {createSiteFilterTemplate} from "./components/filter.js";
import {createSiteMenuTemplate} from "./components/menu.js";
import {createSiteTaskTemplate} from "./components/task.js";
import {createSortTemplate} from "./components/sort.js";
import {createTaskEditTemplate} from "./components/task-edit.js";
import {/* generateFilters, */getFilters} from "./mock/filter.js";
import {generateTasks} from "./mock/task.js";

const TASKS_NUM = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderElement = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const mainContainer = document.querySelector(`.main`);
const mainControlContainer = mainContainer.querySelector(`.main__control`);

const tasks = generateTasks(TASKS_NUM);
const filters = getFilters(tasks);
// const filters = generateFilters(tasks);


renderElement(mainControlContainer, createSiteMenuTemplate(), `beforeend`);
renderElement(mainContainer, createSiteFilterTemplate(filters), `beforeend`);
renderElement(mainContainer, createSiteBoardTemplate(), `beforeend`);

const boardContainer = mainContainer.querySelector(`.board`);
const boardTasksContainer = boardContainer.querySelector(`.board__tasks`);

renderElement(boardContainer, createSortTemplate(), `afterbegin`);
renderElement(boardTasksContainer, createTaskEditTemplate(tasks[0]), `beforeend`);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

tasks.slice(1, showingTasksCount).forEach((task) =>
  renderElement(boardTasksContainer, createSiteTaskTemplate(task), `beforeend`));

renderElement(boardContainer, createLearnMoreButtonTemplate(), `beforeend`);

const loadMoreButton = boardContainer.querySelector(`.load-more`);
loadMoreButton.addEventListener(`click`, () =>{
  const prevTaskCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTaskCount, showingTasksCount).forEach((task) => {
    renderElement(boardTasksContainer, createSiteTaskTemplate(task), `beforeend`);
  });

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
