// import {photoPosts} from './data.js';
const usersPictureList = document.querySelector('.pictures');
const userPhotoPostTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const NUMBER_PHOTO_POSTS = 25;
let usersPhotoPosts;

const photoPost = (photo) => {
  usersPhotoPosts = photo;
  const photoPostListFragment = document.createDocumentFragment();
  usersPhotoPosts.forEach((element) => {
    const usersPhoto = userPhotoPostTemplate.cloneNode(true);
    usersPhoto.querySelector('.picture__img').src = element.url;
    usersPhoto.querySelector('.picture__img').alt = element.description;
    usersPhoto.querySelector('.picture__likes').textContent = element.likes;
    usersPhoto.querySelector('.picture__comments').textContent = element.comments.length;
    photoPostListFragment.appendChild(usersPhoto);
  });
  usersPictureList.appendChild(photoPostListFragment);
};
export {usersPhotoPosts, usersPictureList, photoPost};
