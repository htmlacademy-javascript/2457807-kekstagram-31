import {usersPhotoPosts, usersPictureList} from './usersphoto.js';
import {isEscapeKey} from './util.js';

const userPictureOpen = document.querySelector('.big-picture');
const urlPicture = userPictureOpen.querySelector('.big-picture__img').children[0];
const likesCountPicture = userPictureOpen.querySelector('.likes-count');
const commentShownCount = userPictureOpen.querySelector('.social__comment-shown-count');
const commentTotalCount = userPictureOpen.querySelector('.social__comment-total-count');
const socialCaption = userPictureOpen.querySelector('.social__caption');

const commentCount = userPictureOpen.querySelector('.social__comment-count');
const commentLoader = userPictureOpen.querySelector('.comments-loader');
const modalsOpen = document.querySelector('body');

const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

const pictureCancel = userPictureOpen.querySelector('#picture-cancel');

function showBigPicture(evt){
// получение id данных 1 способ: по порядковому номеру детей userPictureList с классом picture
  let count = 0;
  // for(let i = 0; i < usersPictureList.children.length; i++){
  //   if(usersPictureList.children[i].classList.value === 'picture') {
  //     ++count;
  //   }
  //   if(usersPictureList.children[i] === evt.target.parentNode){
  //     break;
  //   }
  // }
  //получение id данных 2 способ: по номеру картинки
  //console.log(Number(evt.target.src.split('photos/')[1].replace(/[^ 0-9.]/g, '')));
  count = Number(evt.target.src.split('photos/')[1].replace(/[^ 0-9.]/g, ''));
  urlPicture.src = usersPhotoPosts[count - 1].url;
  socialCaption.textContent = usersPhotoPosts[count - 1].alt;
  likesCountPicture.textContent = usersPhotoPosts[count - 1].likes;
  commentTotalCount.textContent = usersPhotoPosts[count - 1].comments.length;
  commentShownCount.textContent = usersPhotoPosts[count - 1].comments.length;

  const commentsListFragment = document.createDocumentFragment();
  commentsList.innerHTML = '';
  usersPhotoPosts[count - 1].comments.forEach((element) => {
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = element.avatar;
    comment.querySelector('.social__picture').alt = element.name;
    comment.querySelector('.social__text').textContent = element.message;
    commentsListFragment.appendChild(comment);
  });
  commentsList.appendChild(commentsListFragment);

  commentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
  modalsOpen.classList.add('modal-open');
};

usersPictureList.addEventListener('click', (evt) => {
  openUserModal(evt);
});

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal ();
  }
};

function openUserModal (evt) {
  showBigPicture(evt);
  userPictureOpen.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUserModal () {
  userPictureOpen.classList.add('hidden');
  modalsOpen.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

pictureCancel.addEventListener('click', ()=>{
  closeUserModal ();
});


