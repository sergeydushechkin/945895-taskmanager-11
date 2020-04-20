import {createElement} from "../utils.js";

const createSiteBoardTemplate = () => {
  return (
    `<section class="board container">

      <div class="board__tasks"></div>
    </section>`
  );
};

export default class Board {
  constructor(task) {
    this._task = task;
    this._element = null;
  }

  getTemplate() {
    return createSiteBoardTemplate(this._task);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
