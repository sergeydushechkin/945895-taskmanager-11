import LoadMoreButtonComponent from "./components/learn-more-button.js";
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

const renderTask = (taskListElement, task) => {
  const onEditButtonClick = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const onEditFormSubmit = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const taskComponent = new TaskComponent(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, onEditButtonClick);

  const taskEditComponent = new TaskEditComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`.form`);
  editForm.addEventListener(`click`, onEditFormSubmit);

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderBoard = (boardComponent, tasks) => {
  render(boardComponent, new SortComponent.getElement(), RenderPosition.BEFOREEND);
  render(boardComponent, new TasksComponent.getElement(), RenderPosition.BEFOREEND);

  const taskListElement = boardComponent.getElement.querySelector(`.board__tasks`);

  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
  tasks.slice(1)
    .forEach((task) => {
      renderTask(taskListElement, task);
    });

  const loadMoreButtonComponent = new LoadMoreButtonComponent();
  render(boardComponent, loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevTaskCount = showingTasksCount;
    showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    tasks.slice(prevTaskCount, showingTasksCount)
      .forEach((task) => {
        renderTask(taskListElement, task);
      });

    if (showingTasksCount >= tasks.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
};
