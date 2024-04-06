import { createPhotoPost, saveApiPhoto, usersPictureList} from './users-photo.js';
import { showMessage } from './util.js';
import { addPictureListener } from './full-size-photo.js';

const photoFilters = document.querySelector('.img-filters');

const NUMBER_PHOTO_POSTS = 25;
const MIN_PHOTOS_FOR_FILTRES = 2;
const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: ''
};
const Method = {
  GET: 'GET',
  POST: 'POST'
};
const Message = {
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

const getData = () => load(Route.GET_DATA, Message.GET_DATA_ERROR);
const sendData = (body) => load(Route.SEND_DATA, Message.SEND_DATA_ERROR, Method.POST, body);

getData()
  .then((photos) => {
    saveApiPhoto(photos.slice(0, NUMBER_PHOTO_POSTS));
    createPhotoPost(photos.slice(0, NUMBER_PHOTO_POSTS));
    if(photos.length >= MIN_PHOTOS_FOR_FILTRES){
      photoFilters.classList.remove('img-filters--inactive');
    }
    usersPictureList.addEventListener('click', addPictureListener);
  })
  .catch((err) => {
    throw new Error(`Произошла ошибка ${err.status}: ${err.statusText}`);
  });

export {getData, sendData};
