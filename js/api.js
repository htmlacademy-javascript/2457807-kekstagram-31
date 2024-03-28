import { photoPost } from './users-photo.js';

fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json())
  .then((photo) => {   
    photoPost(photo);   
  });
