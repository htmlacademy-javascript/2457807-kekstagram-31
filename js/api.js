import { photoPost} from './users-photo.js';
import { showMessage } from './util.js';
const photoFilters = document.querySelector('.img-filters');

const NUMBER_PHOTO_POSTS = 25;
const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: ''
};
const Method = {
  GET: 'GET',
  POST: 'POST'
};
const message = {
  GET_DATA_ERROR: 'dataLoadError',
  SEND_DATA_SUCCESS: 'submitSuccess',
  SEND_DATA_ERROR: 'submitError'
};

const load = (route, messageText = null, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Произошла ошибка ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((err) => {
      showMessage(messageText ?? err.message);
    });

const getData = () => load(Route.GET_DATA, message.GET_DATA_ERROR);
const sendData = (body) => load(Route.SEND_DATA, message.SEND_DATA_ERROR, Method.POST, body);

getData()
  .then((photo) => {
    photoPost(photo.slice(0, NUMBER_PHOTO_POSTS));
    photoFilters.classList.remove('img-filters--inactive');

  });

export {getData, sendData};
