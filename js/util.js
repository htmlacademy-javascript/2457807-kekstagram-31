/* eslint-disable no-console */
const checkLength = (string = '', maxSymbols = 1) => string.length <= maxSymbols;
const isEscapeKey = (evt) => evt.key === 'Escape';
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
const initId = () => {
  let id = 0;
  return function () {
    id++;
    return id;
  };
};
export {getRandomInteger, getRandomArrayElement, initId, isEscapeKey};

