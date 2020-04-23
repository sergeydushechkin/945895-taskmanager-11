import LoadMoreButtonComponent from "../components/load-more-button.js";
import TaskComponent from "../components/task.js";
import TasksComponent from "../components/tasks.js";
import SortComponent from "../components/sort.js";
import TaskEditComponent from "../components/task-edit.js";
import NoTasksComponent from "../components/no-tasks.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const replaceTaskToEdit = () => {
    replace(taskEditComponent, taskComponent);
  };

  const replaceEditToTask = () => {
    replace(taskComponent, taskEditComponent);
  };

  const onEscKeyKeydown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyKeydown);
    }
  };

  const taskComponent = new TaskComponent(task);
  taskComponent.setEditButtonHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyKeydown);
  });

  const taskEditComponent = new TaskEditComponent(task);
  taskEditComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyKeydown);
  });

  render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    this._sortComponent = new SortComponent();
    this._noTasksComponent = new NoTasksComponent();
  }

  render(tasks) {
    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._tasksComponent, RenderPosition.BEFOREEND);

    const taskListElement = this._tasksComponent.getElement();

    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    tasks.slice(0, showingTasksCount)
      .forEach((task) => {
        renderTask(taskListElement, task);
      });

    const loadMoreButtonComponent = new LoadMoreButtonComponent();
    render(container, loadMoreButtonComponent, RenderPosition.BEFOREEND);

    loadMoreButtonComponent.setClickHandler(() => {
      const prevTaskCount = showingTasksCount;
      showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      tasks.slice(prevTaskCount, showingTasksCount)
        .forEach((task) => {
          renderTask(taskListElement, task);
        });

      if (showingTasksCount >= tasks.length) {
        remove(loadMoreButtonComponent);
      }
    });
  }
}
