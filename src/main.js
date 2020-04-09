const TASKS_NUM = 3;

import {createSiteMenuTemplate} from "./components/menu.js";
import {createSiteFilterTemplate} from "./components/filter.js";
import {createSiteBoardTemplate} from "./components/board.js";
import {createSortTemplate} from "./components/sort.js";
import {createTaskEditTemplate} from "./components/task-edit.js";
import {createSiteTaskTemplate} from "./components/task.js";
import {createLearnMoreButtonTemplate} from "./components/learn-more-button.js";

import {generateFilters} from "./mock/filter.js";

const renderElement = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const mainContainer = document.querySelector(`.main`);
const mainControlContainer = mainContainer.querySelector(`.main__control`);

const filters = generateFilters();

renderElement(mainControlContainer, createSiteMenuTemplate(), `beforeend`);
renderElement(mainContainer, createSiteFilterTemplate(filters), `beforeend`);
renderElement(mainContainer, createSiteBoardTemplate(), `beforeend`);

const boardContainer = mainContainer.querySelector(`.board`);
const boardTasksContainer = boardContainer.querySelector(`.board__tasks`);

renderElement(boardContainer, createSortTemplate(), `afterbegin`);
renderElement(boardTasksContainer, createTaskEditTemplate(), `beforeend`);

for (let i = 0; i < TASKS_NUM; i++) {
  renderElement(boardTasksContainer, createSiteTaskTemplate(), `beforeend`);
}

renderElement(boardContainer, createLearnMoreButtonTemplate(), `beforeend`);
