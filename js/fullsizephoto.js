import {usersPhotoPosts, usersPictureList} from './usersphoto.js';

const userPictureOpen = document.querySelector('.big-picture');
const urlPicture = userPictureOpen.querySelector('.big-picture__img').children[0];
const likesCountPicture = userPictureOpen.querySelector('.likes-count');
//const urlPicture = userPictureOpen.querySelector('.social__comment-shown-count');
const commentTotalCount = userPictureOpen.querySelector('.social__comment-total-count');
const socialCaption = userPictureOpen.querySelector('.social__caption');

usersPictureList.addEventListener('click', (evt) =>{
// получение id данных 1 способ: по порядковому номеру детей userPictureList с классом picture
  let count = 0;
  for(let i = 0; i < usersPictureList.children.length; i++){
    if(usersPictureList.children[i].classList.value === 'picture') {
      ++count;
    }
    if(usersPictureList.children[i] === evt.target.parentNode){
      break;
    }
  }
  //получение id данных 2 способ: по номеру картинки
  //console.log(Number(evt.target.src.split('photos/')[1].replace(/[^ 0-9.]/g, '')));      // replace(/[^ 0-9.]/g, ''));
  count = Number(evt.target.src.split('photos/')[1].replace(/[^ 0-9.]/g, ''));      // replace(/[^ 0-9.]/g, '')
  urlPicture.src = usersPhotoPosts[count - 1].url;
  socialCaption.textContent = usersPhotoPosts[count - 1].alt;
   likesCountPicture.textContent = usersPhotoPosts[count - 1].likes;;
   commentTotalCount.textContent = usersPhotoPosts[count - 1].comments.length;

  // likesCountPicture.textContent = evt.target.nextElementSibling.children[1].textContent;
  // commentTotalCount.textContent = evt.target.nextElementSibling.children[0].textContent;
  userPictureOpen.classList.remove('hidden');
//   }
});

// Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.
// Количество лайков likes подставьте как текстовое содержание элемента .likes-count.
// Количество показанных комментариев подставьте как текстовое содержание элемента .social__comment-shown-count.
// Общее количество комментариев к фотографии comments подставьте как текстовое содержание элемента .social__comment-total-count.
// Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments. Разметка каждого комментария должна выглядеть так:
// <li class="social__comment">
//   <img
//     class="social__picture"
//     src="{{аватар}}"
//     alt="{{имя комментатора}}"
//     width="35" height="35">
//   <p class="social__text">{{текст комментария}}</p>
// </li>
//         Копировать

// Описание фотографии description вставьте строкой в блок .social__caption.

