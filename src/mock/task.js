import {getRandomIntegerNumber} from "../utils.js";
import {COLORS} from "../const.js";

const DESCRIPTIONS = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const DAYS = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];

export const generateTask = () => {
  return {
    description: DESCRIPTIONS[getRandomIntegerNumber(0, 2)],
    date: `23 September`,
    time: `16:15`,
    color: COLORS[getRandomIntegerNumber(0, COLORS.length - 1)],
    isArchive: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5
  };
};

export const generateTasks = (count) => {
  return new Array(count).fill(``).map(generateTask);
};
