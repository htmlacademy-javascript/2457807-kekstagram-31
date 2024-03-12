import {photoPosts} from './data.js';

const usersPictureList = document.querySelector('.pictures');
const userPhotoPostTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const usersPhotoPosts = photoPosts();

const photoPostListFragment = document.createDocumentFragment();
usersPhotoPosts.forEach((element) => {
  const usersPhotoPost = userPhotoPostTemplate.cloneNode(true);
  usersPhotoPost.querySelector('.picture__img').src = element.url;
  usersPhotoPost.querySelector('.picture__img').alt = element.description;
  usersPhotoPost.querySelector('.picture__likes').textContent = element.likes;
  usersPhotoPost.querySelector('.picture__comments').textContent = element.comments.length;
  photoPostListFragment.appendChild(usersPhotoPost);
});

usersPictureList.appendChild(photoPostListFragment);