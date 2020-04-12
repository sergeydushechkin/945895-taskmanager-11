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

export const getFilters = (tasks) => {
  const date = new Date();
  return [
    {name: `all`, count: tasks.length},
    {name: `overdue`, count: tasks.filter((task) => task.dueDate ? task.dueDate < date : false).length},
    {name: `today`, count: tasks.filter(() => tasks.dueDate === date).length},
    {name: `favorites`, count: tasks.filter((task) => task.isFavorite).length},
    {name: `repeating`, count: tasks.filter((task) => Object.values(task.repeatingDays).some(Boolean) ? true : false).length},
    {name: `archive`, count: tasks.filter((task) => task.isArchive).length},
  ];
};
