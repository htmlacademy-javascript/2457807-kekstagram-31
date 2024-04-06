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
let currentMessage = '';

const isEscapeKey = (evt) => evt.key === 'Escape';

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const onDocumentCloseMessage = (evt) =>{
  if (currentMessage === 'submitSuccess' && (!evt.target.closest('.success__inner') || evt.target.closest('.success__button'))) {
    closeMessageWindowForm(submitSuccess); // скрываем элемент так клик был за его пределами
  }
  if (currentMessage === 'submitError' && (!evt.target.closest('.error__inner') || evt.target.closest('.error__button'))) {
    closeMessageWindowForm(submitError); // скрываем элемент так клик был за его пределами
  }
};

function closeMessageWindowForm(evt){
  evt.remove();
  document.removeEventListener('click', onDocumentCloseMessage);
  document.removeEventListener('keydown', onDocumentKeydown);
}

const showMessage = (message) => {
  currentMessage = message;
  if(message === 'dataLoadError'){
    document.body.appendChild(dataLoadError);
    setTimeout(() => {
      dataLoadError.remove();
    }, ERROR_SHOW_TIME);
  }
  if(message === 'submitSuccess'){
    document.body.appendChild(submitSuccess);
    document.addEventListener('click', onDocumentCloseMessage);
    document.addEventListener('keydown', onDocumentKeydown);
  }
  if(message === 'submitError'){
    currentMessage = 'submitError';
    document.body.appendChild(submitError);
    document.addEventListener('click', onDocumentCloseMessage);
    document.addEventListener('keydown', onDocumentKeydown);
  }
};
function onDocumentKeydown(evt){
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if(currentMessage === 'submitSuccess'){
      submitSuccess.remove();
    }
    if(currentMessage === 'submitError'){
      submitError.remove();
    }
  }
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentCloseMessage);
  currentMessage = '';
}

const debounce = (callback, timeoutDelay = 500) =>{
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const throttle = (callback, delayBetweenFrames) =>{
  let lastTime = 0;
  return (...rest) => {
    const now = new Date();
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
const initId = () => {
  let id = 0;
  return function () {
    id++;
    return id;
  };
};

export {getRandomInteger, getRandomArrayElement, initId, isEscapeKey, showMessage, debounce, throttle, currentMessage};

