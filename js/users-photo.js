const usersPictureList = document.querySelector('.pictures');
const userPhotoPostTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
let usersPhotoPosts;
const getUsersPhotoPosts = () => usersPhotoPosts;
const saveApiPhoto = (photos) =>{
  usersPhotoPosts = photos;
  return usersPhotoPosts;
};
const createPhotoPost = (photos) => {
  const pictures = picturesContainer.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    picture.remove();
  });
  const photoPostListFragment = document.createDocumentFragment();
  photos.forEach((element) => {
    const usersPhoto = userPhotoPostTemplate.cloneNode(true);
    usersPhoto.querySelector('.picture__img').src = element.url;
    usersPhoto.querySelector('.picture__img').alt = element.description;
    usersPhoto.querySelector('.picture__likes').textContent = element.likes;
    usersPhoto.querySelector('.picture__comments').textContent = element.comments.length;
    photoPostListFragment.appendChild(usersPhoto);
  });
  usersPictureList.appendChild(photoPostListFragment);
};

export {usersPictureList, createPhotoPost, saveApiPhoto, getUsersPhotoPosts};
