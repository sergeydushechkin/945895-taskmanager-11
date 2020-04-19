export const getRandomIntegerNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const createElement = (template) => {
  const tempElement = document.createElement(`div`);
  tempElement.innerHTML = template;

  return tempElement.firstChild;
};
