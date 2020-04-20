import {createElement} from "../utils.js";

const createFilterMarkup = (filter, isChecked) => {
  const {name, count} = filter;
  return `<input
    type="radio"
    id="filter__${name}"
    class="filter__input visually-hidden"
    name="filter"
    ${isChecked ? `checked` : ``}
  />
  <label for="filter__${name}" class="filter__label">
    ${name} <span class="filter__${name}-count">${count}</span></label
  >`;
};

const createSiteFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((filter, index) =>
    createFilterMarkup(filter, index === 0)).join(`\n`);
  return (
    `<section class="main__filter filter container">
      ${filtersMarkup}
    </section>`
  );
};

export default class Filter {
  constructor(task) {
    this._task = task;
    this._element = null;
  }

  getTemplate() {
    return createSiteFilterTemplate(this._task);
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
