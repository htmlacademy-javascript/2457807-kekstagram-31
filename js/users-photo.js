const usersPictureList = document.querySelector('.pictures');
const userPhotoPostTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
let usersPhotoPosts;
const getUsersPhotoPosts = () => usersPhotoPosts;
const saveApiPhoto = (photo) =>{
  usersPhotoPosts = photo;
  return usersPhotoPosts;
};
const photoPost = (photo) => {
  const pictures = picturesContainer.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    picture.remove();
  });
  const photoPostListFragment = document.createDocumentFragment();
  photo.forEach((element) => {
    const usersPhoto = userPhotoPostTemplate.cloneNode(true);
    usersPhoto.querySelector('.picture__img').src = element.url;
    usersPhoto.querySelector('.picture__img').alt = element.description;
    usersPhoto.querySelector('.picture__likes').textContent = element.likes;
    usersPhoto.querySelector('.picture__comments').textContent = element.comments.length;
    photoPostListFragment.appendChild(usersPhoto);
  });
  usersPictureList.appendChild(photoPostListFragment);
};

export {usersPhotoPosts, usersPictureList, photoPost, saveApiPhoto, getUsersPhotoPosts};
