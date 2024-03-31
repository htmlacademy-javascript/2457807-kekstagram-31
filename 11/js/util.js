/* eslint-disable no-console */
const ERROR_SHOW_TIME = 5000;
const dataLoadError = document.querySelector('#data-error')
  .content
  .querySelector('.data-error');
const submitError = document.querySelector('#error')
  .content
  .querySelector('.error');
const submitSuccess = document.querySelector('#success')
  .content
  .querySelector('.success');
let messages = '';
const onDocumentCloseMessage = (evt) =>{
  if (messages === 'submitSuccess' && (!evt.target.closest('.success__inner') || evt.target.closest('.success__button'))) {
    closeMessageWindowForm(submitSuccess); // скрываем элемент так клик был за его пределами
  }
  if (messages === 'submitError' && (!evt.target.closest('.error__inner') || evt.target.closest('.error__button'))) {
    closeMessageWindowForm(submitError); // скрываем элемент так клик был за его пределами
  }
};
const closeMessageWindowForm = (evt) => {
  evt.remove();
  document.removeEventListener('click', onDocumentCloseMessage);
};

const showMessage = (message) => {
  messages = message;
  if(message === 'dataLoadError'){
    document.body.appendChild(dataLoadError);
    setTimeout(() => {
      dataLoadError.remove();
    }, ERROR_SHOW_TIME);
  }
  if(message === 'submitSuccess'){
    document.body.appendChild(submitSuccess);
    document.addEventListener('click', onDocumentCloseMessage);
  }
  if(message === 'submitError'){
    document.body.appendChild(submitError);
    document.addEventListener('click', onDocumentCloseMessage);
  }
};
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

export {getRandomInteger, getRandomArrayElement, initId, isEscapeKey, showMessage};

