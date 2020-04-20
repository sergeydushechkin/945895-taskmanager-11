import LearnMoreButtonComponent from "./components/learn-more-button.js";
import BoardComponent from "./components/board.js";
import FilterComponent from "./components/filter.js";
import SiteMenuComponent from "./components/menu.js";
import TaskComponent from "./components/task.js";
import TasksComponent from "./components/tasks.js";
import SortComponent from "./components/sort.js";
import TaskEditComponent from "./components/task-edit.js";
import {getFilters} from "./mock/filter.js";
import {generateTasks} from "./mock/task.js";
import {render, RenderPosition} from "./utils.js";

const TASKS_NUM = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const mainContainer = document.querySelector(`.main`);
const mainControlContainer = mainContainer.querySelector(`.main__control`);

const tasks = generateTasks(TASKS_NUM);
const filters = getFilters(tasks);
// const filters = generateFilters(tasks);


render(mainControlContainer, createSiteMenuTemplate(), `beforeend`);
render(mainContainer, createSiteFilterTemplate(filters), `beforeend`);
render(mainContainer, createSiteBoardTemplate(), `beforeend`);

const boardContainer = mainContainer.querySelector(`.board`);
const boardTasksContainer = boardContainer.querySelector(`.board__tasks`);

render(boardContainer, createSortTemplate(), `afterbegin`);
render(boardTasksContainer, createTaskEditTemplate(tasks[0]), `beforeend`);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

tasks.slice(1, showingTasksCount).forEach((task) =>
  render(boardTasksContainer, createSiteTaskTemplate(task), `beforeend`));

render(boardContainer, createLearnMoreButtonTemplate(), `beforeend`);

const loadMoreButton = boardContainer.querySelector(`.load-more`);
loadMoreButton.addEventListener(`click`, () =>{
  const prevTaskCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTaskCount, showingTasksCount).forEach((task) => {
    render(boardTasksContainer, createSiteTaskTemplate(task), `beforeend`);
  });

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
