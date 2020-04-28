import TaskComponent from "../components/task.js";
import TaskEditComponent from "../components/task-edit.js";
import {render, replace, RenderPosition} from "../utils/render.js";

export default class TaskController {
  constructor(container) {
    this._container = container;
    this._taskComponent = null;
    this._taskEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(task) {
    this._taskComponent = new TaskComponent(task);
    this._taskEditComponent = new TaskEditComponent(task);

    const taskComponent = new TaskComponent(task);
    taskComponent.setEditButtonClickHandler(() => {
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
  }

  _replaceTaskToEdit() {
    replace(this._taskEditComponent, this._taskComponent);
  }

  _replaceEditToTask() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    replace(this._taskComponent, this._taskEditComponent);
  }

  _onEscKeyKeydown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyKeydown);
    }
  }
}
