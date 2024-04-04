import {usersPhotoPosts, usersPictureList} from './users-photo.js';
import {isEscapeKey} from './util.js';

const userPictureOpen = document.querySelector('.big-picture');
const urlPicture = userPictureOpen.querySelector('.big-picture__img').children[0];
const likesCountPicture = userPictureOpen.querySelector('.likes-count');
const commentShownCount = userPictureOpen.querySelector('.social__comment-shown-count');
const commentTotalCount = userPictureOpen.querySelector('.social__comment-total-count');
const socialCaption = userPictureOpen.querySelector('.social__caption');

const commentLoader = userPictureOpen.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');
const pictureCancel = userPictureOpen.querySelector('#picture-cancel');

const showBigPicture = (evt) => {
  let count = 0;
  count = Number(evt.target.src.split('photos/')[1].replace(/[^ 0-9.]/g, ''));
  urlPicture.src = usersPhotoPosts[count - 1].url;
  urlPicture.alt = usersPhotoPosts[count - 1].description;
  socialCaption.textContent = usersPhotoPosts[count - 1].description;
  likesCountPicture.textContent = usersPhotoPosts[count - 1].likes;
  commentTotalCount.textContent = usersPhotoPosts[count - 1].comments.length;
  commentShownCount.textContent = 5;
  if (usersPhotoPosts[count - 1].comments.length < 5) {
    commentShownCount.textContent = usersPhotoPosts[count - 1].comments.length;
  }
  const commentsListFragment = document.createDocumentFragment();
  commentsList.innerHTML = '';
  usersPhotoPosts[count - 1].comments.forEach((element, index) => {
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = element.avatar;
    comment.querySelector('.social__picture').alt = element.name;
    comment.querySelector('.social__text').textContent = element.message;
    if (index > 4) {
      comment.classList.add('hidden');
    }
    commentsListFragment.appendChild(comment);
  });
  commentsList.appendChild(commentsListFragment);
  if(Number(commentTotalCount.textContent) <= 5){
    commentLoader.classList.add('hidden');
  }
  document.body.classList.add('modal-open');
};
const showNextComments = () => {
  let count = Number(commentShownCount.textContent);
  for (let i = 1; i <= 5; i++) {
    if (count === Number(commentTotalCount.textContent)) {
      commentLoader.classList.add('hidden');
      break;
    }
    commentsList.children[count].classList.remove('hidden');
    count++;
  }
  commentShownCount.textContent = count;
};

const openBigPicture = (evt) => {
  showBigPicture(evt);
  userPictureOpen.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  commentLoader.addEventListener('click', showNextComments);
};

const closeBigPicture = () => {
  userPictureOpen.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentLoader.removeEventListener('click', showNextComments);
  commentLoader.classList.remove('hidden');
};

usersPictureList.addEventListener('click', (evt) => {
  if (evt.target.classList.value !== 'picture__img') {
    return;
  }
  openBigPicture(evt);
});

function onDocumentKeydown(evt){
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

pictureCancel.addEventListener('click', () => {
  closeBigPicture();
});
