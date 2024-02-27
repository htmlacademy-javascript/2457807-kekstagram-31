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
const getCommentId = initId();
const getPhotoId = initId();

const createComments = (_, index) =>{
//   const idnumber = getCommentId();
  const idnumber = index+1;
  return {
    id: idnumber,
    avatar: `img/avatar-${getRandomInteger(avatar.MIN, avatar.MAX)}.svg`,
    message: getRandomArrayElement(RANDOMMESSAGE),
    name: getRandomArrayElement(NAMES)
  };
};
const createPhotoPosted = (_, index) =>
//   const idnumber = getPhotoId();
  ({ id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: getRandomArrayElement(LANDSCAPES),
    likes: getRandomInteger(likes.MIN, likes.MAX),
    comments: Array.from({length: getRandomInteger(comments.MIN, comments.MAX)}, createComments)
  });
const PhotoPosts = Array.from({
  length: NUMBER_PHOTO_POSTS
}, createPhotoPosted);
debugger;


// const createComments = () =>{
//     const idnumber = getCommentId();
//     return {
//       id: idnumber,
//       avatar: `img/avatar-${getRandomInteger(avatar.MIN, avatar.MAX)}.svg`,
//       message: getRandomArrayElement(RANDOMMESSAGE),
//       name: getRandomArrayElement(NAMES)
//     };
//   };
//   const createPhotoPosted = () => {
//     const idnumber = getPhotoId();
//     return{ id: idnumber,
//       url: `photos/${idnumber}.jpg`,
//       description: getRandomArrayElement(LANDSCAPES),
//       likes: getRandomInteger(likes.MIN, likes.MAX),
//       comments: Array.from({length: getRandomInteger(comments.MIN, comments.MAX)}, createComments)
//     };
//   };
//   const PhotoPosts = Array.from({
//     length: NUMBER_PHOTO_POSTS
//   }, createPhotoPosted);
//   debugger;

// создание новых групп Id


// const createId = (Array) => Array.length ? Array.length : 0;
// const createRandomId = () => Math.round(Math.random() * 25);


// const createPhotoPosted = () => {
//   let id = 1;

//   return () =>
//   {
//     const photo = {};
//     photo.id = id;
//     photo.url = 'photos/.jpg';
//     photo.description = getRandomArrayElement(LANDSCAPES);
//     photo.likes = getRandomInteger(1, 200);
//     photo.comments = 'fghfghfgh'; //Array.from({length: getRandomInteger(0, 35)}, createComments);
//     id++;
//     return photo;
//   };
// };


// console.log(createPhotoPosted());
// const counter = () =>{
//   let id = 0;
//   return function (){
//     return ++id;
//   };
// };
// function createCounter() {
//   let counter = 0;
//   const myFunction = function() {
//     return ++counter;
//   };
//   return myFunction;
// }

// const createPhotoPosted = () => {
//   let idnumber = 0;
//   return function () => {
//     const createIdnumber = () => ++idnumber;
//     const photo = {
//       id: createIdnumber(),
//       url: 'photos/dfd.jpg',
//       description: getRandomArrayElement(LANDSCAPES),
//       likes: getRandomInteger(1, 200),
//       comments: 'fghfghfgh' //Array.from({length: getRandomInteger(0, 35)}, createComments)
//     };
//     return photo;
//   }
// };


// console.log(createId(NAMES));


// В файле main.js напишите необходимые функции для создания массива из 25 сгенерированных объектов. Каждый объект массива — описание фотографии, опубликованной пользователем.
// Структура каждого объекта должна быть следующей:

// id, число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.

// url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.

// description, строка — описание фотографии. Описание придумайте самостоятельно.

// likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
// comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии — случайное число от 0 до 30. Все комментарии генерируются случайным образом. Пример описания объекта с комментарием:

// {
//   id: 135,
//   avatar: 'img/avatar-6.svg',
//   message: 'В целом всё неплохо. Но не всё.',
//   name: 'Артём',
// }

//         Копировать


// У каждого комментария есть идентификатор — id — любое число. Идентификаторы не должны повторяться.

// Поле avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.

// Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения из представленных ниже:

// Всё отлично!
// В целом всё неплохо. Но не всё.
// Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
// Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
// Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
// Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!

//         Копировать


// Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.
