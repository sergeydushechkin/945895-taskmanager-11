import {createElement} from "../utils.js";

const createLearnMoreButtonTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export default class Filter {
  constructor(task) {
    this._task = task;
    this._element = null;
  }

  getTemplate() {
    return createLearnMoreButtonTemplate(this._task);
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
