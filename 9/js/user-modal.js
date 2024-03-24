import {
  isEscapeKey
} from './util.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');

const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const uploadSubmit = document.querySelector('.img-upload__submit');

const MAXHASHTAGS = 5;

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const validateFormatHashtags = (value) => {
  const regularExpression = /^#[а-яА-ЯёЁa-zA-Z0-9]{1,19}$/i;
  const hashtags = value.trim().toUpperCase().split(' ').filter((hashtag) => hashtag.trim() !== '');
  for (const hashtag of hashtags) {
    if (!regularExpression.test(hashtag)) {
      uploadSubmit.disabled = true;
      return false;
    }
  }
  if(validateUniqueHashtags && validateMaxNumberHashtags && validateCommentMaxSymbol) {
    uploadSubmit.disabled = false;
  }
  return true;
};
const validateUniqueHashtags = (value) => {
  const hashtags = value.trim().toUpperCase().split(' ').filter((hashtag) => hashtag.trim() !== '');
  const uniqueHashtags = new Set(hashtags);
  if (hashtags.length !== uniqueHashtags.size) {
    uploadSubmit.disabled = true;
    return false;
  }
  return true;
};
const validateMaxNumberHashtags = (value) => {
  const hashtags = value.trim().toUpperCase().split(' ').filter((hashtag) => hashtag.trim() !== '');
  if (hashtags.length > MAXHASHTAGS) {
    uploadSubmit.disabled = true;
    return false;
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
  'Неверный формат хэштега! (Начало с #. Разрешены: символы цифры. Максимум 20 символов!)'
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


imgUploadForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   imgUploadForm.submit();
  pristine.validate();
});

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      return;
    }
    evt.preventDefault();
    closeUploadForm();
  }
};
const openUploadForm = () => {
  document.body.classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown); 
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

imgUploadInput.addEventListener('change', () => {
  openUploadForm();
});

imgUploadCancel.addEventListener('click', () => {
  closeUploadForm();
});
