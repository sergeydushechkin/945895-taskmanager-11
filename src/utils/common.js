import moment from "moment";

export const getRandomIntegerNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM`);
};
