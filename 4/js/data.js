/* eslint-disable no-console */
import {getRandomArrayElement, getRandomInteger, initId} from './util.js';
const RANDOMMESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  ' Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];
const LANDSCAPES = [
  '«Волна» — скала из песчаника на границе штатов Аризона и Юта, США.',
  'Солончак Уюни — высохшее солёное озеро на юге пустынной равнины Альтиплано, Боливия.',
  'Гейзер Флай — искусственный гейзер, расположенный на северо-западе Невады.',
  'Парк Хитачи Сисайд — национальный парк на востоке Японии.',
  'Красный пляж — пляж под городом Паньцзинь в Китае.',
  'Озеро в национальном парке Глейшер — озеро в Скалистых горах на территории американского штата Монтана.',
  'Дорога Гигантов — около 40 000 соединённых между собой базальтовых колонн в Северной Ирландии.',
  'Радужные горы — горы в Китае.',
  'Мальдивы — тысячи райских островов в бирюзовых водах Индийского океана.',
  'Бадаб-е-Сурт — природное чудо на севере Ирана.'
];
const NUMBER_PHOTO_POSTS = 25;
const likes = {
  MIN: 15,
  MAX: 200
};
const comments = {
  MIN: 0,
  MAX: 30
};
const avatar = {
  MIN: 1,
  MAX: 6
};
const getCommentId = initId();
const getPhotoId = initId();

const createComments = (_, index) =>{
  const idnumber = getCommentId();
  //const idnumber = index + 1;
  return {
    id: idnumber,
    avatar: `img/avatar-${getRandomInteger(avatar.MIN, avatar.MAX)}.svg`,
    message: getRandomArrayElement(RANDOMMESSAGE),
    name: getRandomArrayElement(NAMES)
  };
};
const createPhotoPosted = (_, index) =>{
  const idnumber = getPhotoId();
  return ({ id: idnumber,
    url: `photos/${idnumber}.jpg`,
    description: getRandomArrayElement(LANDSCAPES),
    likes: getRandomInteger(likes.MIN, likes.MAX),
    comments: Array.from({length: getRandomInteger(comments.MIN, comments.MAX)}, createComments)
  });
};
const photoPosts = Array.from({
  length: NUMBER_PHOTO_POSTS
}, createPhotoPosted);
export {photoPosts};

