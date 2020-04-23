import {getRandomIntegerNumber} from "../utils/common.js";
import {COLORS} from "../const.js";

const DefaultRepeatingDays = {
  "mo": false,
  "tu": false,
  "we": false,
  "th": false,
  "fr": false,
  "sa": false,
  "su": false,
};

const DESCRIPTIONS = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? -1 : 1;
  const diffValue = sign * getRandomIntegerNumber(0, 8);
  targetDate.setDate(targetDate.getDate() + diffValue);
  return targetDate;
};

const generateRepeatingDays = () => {
  let repeatingDays = {};
  for (const day of Object.keys(DefaultRepeatingDays)) {
    repeatingDays[day] = Math.random() > 0.5;
  }
  return repeatingDays;
};

export const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? null : getRandomDate();

  return {
    description: DESCRIPTIONS[getRandomIntegerNumber(0, 2)],
    dueDate,
    repeatingDays: dueDate ? DefaultRepeatingDays : generateRepeatingDays(),
    color: COLORS[getRandomIntegerNumber(0, COLORS.length - 1)],
    isArchive: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5
  };
};

export const generateTasks = (count) => {
  return new Array(count).fill(``).map(generateTask);
};
