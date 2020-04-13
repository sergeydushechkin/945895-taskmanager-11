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

export const createSiteFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((filter, index) =>
    createFilterMarkup(filter, index === 0)).join(`\n`);
  return (
    `<section class="main__filter filter container">
      ${filtersMarkup}
    </section>`
  );
};
