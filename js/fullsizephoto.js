import {usersPhotoPosts, usersPictureList} from './usersphoto.js';

const userPictureOpen = document.querySelector('.big-picture');
const urlPicture = userPictureOpen.querySelector('.big-picture__img').children[0];
const likesCountPicture = userPictureOpen.querySelector('.likes-count');
//const urlPicture = userPictureOpen.querySelector('.social__comment-shown-count');
const commentTotalCount = userPictureOpen.querySelector('.social__comment-total-count');
const socialCaption = userPictureOpen.querySelector('.social__caption');

usersPictureList.addEventListener('click', (evt) =>{
//   if (evt.target.classList.value === 'picture__img'){
//   for(let i = 0; i < usersPictureList; i++){
//     if(usersPictureList[i].url === evt.target.src){
//  const selectedPicture = usersPictureList[i];
//     }
//   }
  urlPicture.src = evt.target.src;
  socialCaption.textContent = evt.target.alt;
  likesCountPicture.textContent = evt.target.nextElementSibling.children[1].textContent;
  commentTotalCount.textContent = evt.target.nextElementSibling.children[0].textContent;
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

