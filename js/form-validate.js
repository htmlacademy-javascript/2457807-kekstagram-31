import {initScale, initSlider} from './photo-editing.js';
import {isEscapeKey, showMessage, currentMessage } from './util.js';
import {sendData } from './api.js';
const MAX_HASHTAGS = 5;

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');

const hashtagInput = imgUploadForm.querySelector('.text__hashtags');
const commentInput = imgUploadForm.querySelector('.text__description');
const uploadSubmit = imgUploadForm.querySelector('.img-upload__submit');

const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview').children[0];
const imgEffectsPreview = imgUploadForm.querySelectorAll('.effects__preview');


const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const getNumberhashtags = (value) =>value.trim().toUpperCase().split(' ').filter((hashtag) => hashtag.trim() !== '');

const validateUniqueHashtags = (value) => {
  const hashtags = getNumberhashtags(value);
  const uniqueHashtags = new Set(hashtags);
  if (hashtags.length !== uniqueHashtags.size) {
    uploadSubmit.disabled = true;
    return false;
  }
  return true;
};

const validateMaxNumberHashtags = (value) => {
  const hashtags = getNumberhashtags(value);
  if (hashtags.length > MAX_HASHTAGS) {
    uploadSubmit.disabled = true;
    return false;
  }
  return true;
};

const validateFormatHashtags = (value) => {
  const regularExpression = /^#[а-яА-ЯёЁa-zA-Z0-9]{1,19}$/i;
  const hashtags = getNumberhashtags(value);
  for (const hashtag of hashtags) {
    if (!regularExpression.test(hashtag)) {
      uploadSubmit.disabled = true;
      return false;
    }
  }
  if (validateUniqueHashtags && validateMaxNumberHashtags) {
    uploadSubmit.disabled = false;
  }
  return true;
};
const validateCommentMaxSymbol = (value) =>{
  if (value.length > 140) {
    uploadSubmit.disabled = true;
    return false;
  } else {
    if (validateFormatHashtags && validateUniqueHashtags && validateMaxNumberHashtags) {
      uploadSubmit.disabled = false;
    }
    return true;
  }
};

pristine.addValidator(
  hashtagInput,
  validateFormatHashtags,
  'Неверный формат хэштега! (Начало с #. Разрешены: символы латинские и кириллица, цифры. Максимум 20 символов!)'
);

pristine.addValidator(
  hashtagInput,
  validateUniqueHashtags,
  'Хэштеги должны быть уникальны!'
);

pristine.addValidator(
  hashtagInput,
  validateMaxNumberHashtags,
  'Хэштегов не должно быть больше 5!'
);

pristine.addValidator(
  commentInput,
  validateCommentMaxSymbol,
  'Комментарий не может содержать больше 140 символов!'
);

const setUserFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
    const isValid = pristine.validate();
    if (isValid) {
      uploadSubmit.disabled = true;
      uploadSubmit.textContent = 'Публикую ...';
      sendData(new FormData(evt.target))
        .then(
          (response) => {
            if (!response.ok) {
              showMessage('submitSuccess');
              onSuccess();
              document.removeEventListener('click', onDocumentKeydown);
            }
          }
        )
        .catch((err) => {
          throw new Error(`Произошла ошибка ${err.status}: ${err.statusText}`);
        })
        .finally(
          () => {
            uploadSubmit.disabled = false;
            uploadSubmit.textContent = 'Опубликовать';
          }
        );
    }
  });
};

const closeUploadForm = () => {
  document.body.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  imgUploadInput.value = '';
  hashtagInput.value = '';
  commentInput.value = '';
  pristine.reset();
};

const openUploadForm = () => {
  document.body.classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  initScale();
  initSlider();
  setUserFormSubmit(closeUploadForm);
};

function onDocumentKeydown(evt){
  if(currentMessage === 'submitError'){
    return;
  }
  if (isEscapeKey(evt)) {
    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      return;
    }
    evt.preventDefault();
    closeUploadForm();
  }
}

const getPhotoPreview = (evt) => {
  const fileName = evt.target.files[0].name;
  const regularExpression = /^(.*\.(?=(png|bmp|jpeg|jpg|gif)$))?[^.]*$/i;
  if (!fileName.match(regularExpression)) {
    imgUploadPreview.src = 'img/upload-default-image.jpg';
    showMessage('submitError');
    closeUploadForm();
    return;
  }
  const imgLoad = new FileReader();
  imgLoad.addEventListener('load', (e) => {
    imgUploadPreview.src = e.target.result;
    for(let i = 0; i < imgEffectsPreview.length; i++){
      imgEffectsPreview[i].style.backgroundImage = `url('${e.target.result}')`;
    }
  });
  imgLoad.readAsDataURL(evt.target.files[0]);
};

imgUploadInput.addEventListener('change', (evt) => {
  openUploadForm();
  getPhotoPreview(evt);
});

imgUploadCancel.addEventListener('click', () => {
  closeUploadForm();
});

export {setUserFormSubmit, closeUploadForm};
