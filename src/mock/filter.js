import {getRandomIntegerNumber} from "../utils.js";

const filterNames = [`all`, `overdue`, `today`, `favorites`, `repeating`, `archive`];

export const generateFilters = () => {
  return filterNames.map((name) => {
    return {
      name,
      count: getRandomIntegerNumber(0, 20)
    };
  });
};
