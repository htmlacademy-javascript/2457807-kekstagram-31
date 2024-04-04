
import { debounce } from './util.js';
import { getUsersPhotoPosts, photoPost } from './users-photo.js';

const TIMEOUT = 500;

const Filtres = {
  DEFAULT: 'filter-default',
  SHUFFLE: 'filter-random',
  DISCUSSED: 'filter-discussed'
};
const filtersForm = document.querySelector('.img-filters__form');
const photoFilterButtons = document.querySelectorAll('.img-filters__button');
const btnPhotoFilterDefault = filtersForm.querySelector('#filter-default');
const btnPhotoFilterShuffle = filtersForm.querySelector('#filter-random');
const btnPhotoFilterDiscussed = filtersForm.querySelector('#filter-discussed');
let currentFilter = 'filter-default';

// Алгоритм тасования Фишера — Йетса. Суть заключается в том, чтобы проходить по массиву
// в обратном порядке и менять местами каждый элемент со случайным элементом, который
// находится перед ним.
const getShufflePhoto = (array, count = 10) => {
  const shuffleArray = [...array];
  for (let i = shuffleArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffleArray[i], shuffleArray[j]] = [shuffleArray[j], shuffleArray[i]];
  }
  return shuffleArray.slice(0, count);
};

const getDiscussedPhoto = (array) => {
  const discussedPhoto = [...array];
  discussedPhoto.sort((a, b) => b.comments.length - a.comments.length);
  return discussedPhoto;
};

const changeFilterPhoto = (evt) => {
  if (evt.target.id === currentFilter) {
    return;
  }
  currentFilter = evt.target.id;
  photoFilterButtons.forEach((btn) => {
    btn.classList.remove('img-filters__button--active');
  });
  evt.target.classList.add('img-filters__button--active');
  let filteredPhoto;
  if(evt.target.id === Filtres.DEFAULT){
    filteredPhoto = getUsersPhotoPosts();
  }
  if(evt.target.id === Filtres.SHUFFLE){
    filteredPhoto = getShufflePhoto(getUsersPhotoPosts());
  }
  if(evt.target.id === Filtres.DISCUSSED){
    filteredPhoto = getDiscussedPhoto(getUsersPhotoPosts());
  }
  debounce(photoPost, TIMEOUT)(filteredPhoto);
};

btnPhotoFilterDefault.addEventListener('click', (evt) => changeFilterPhoto(evt));
btnPhotoFilterShuffle.addEventListener('click', (evt) => changeFilterPhoto(evt));
btnPhotoFilterDiscussed.addEventListener('click', (evt) => changeFilterPhoto(evt));
