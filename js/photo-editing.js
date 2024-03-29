const scaleValue = document.querySelector('.scale__control--value');
const btnScaleMinus = document.querySelector('.scale__control--smaller');
const btnScalePlus = document.querySelector('.scale__control--bigger');
const photoPreview = document.querySelector('.img-upload__preview');

const photoEffectLevel = document.querySelector('.img-upload__effect-level');
const effectValue = photoEffectLevel.querySelector('.effect-level__value');
const effectSlider = photoEffectLevel.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');

const MINSCALEVALUE = 25;
const MAXSCALEVALUE = 100;
const STEPSCALEVALUE = 25;
const DEFAULTSCALEVALUE = 100;
let currentScale = 100;

const photoEffects = {
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
  ORIGINAL: 'none'
};
let currentEffect = 'ORIGINAL';

const initScale = () => {
  currentScale = 100;
  setScale(DEFAULTSCALEVALUE);
};

const setScale = (scale) => {
  scaleValue.value = `${scale }%`;
  photoPreview.style.transform = `scale(${scale / MAXSCALEVALUE})`;
};
const changeScaleValue = (stepvalue) => {
  currentScale += stepvalue;
  if (currentScale > MAXSCALEVALUE) {
    currentScale = MAXSCALEVALUE;
  } else if (currentScale < MINSCALEVALUE) {
    currentScale = MINSCALEVALUE;
  }
  setScale(currentScale);
};

btnScaleMinus.addEventListener('click', () => changeScaleValue(-STEPSCALEVALUE));
btnScalePlus.addEventListener('click', () => changeScaleValue(STEPSCALEVALUE));

///////////////////////////////////////SLIDER/////////////////////////////////////////////////////
noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    }
  }
});

const initSlider = () => {
  photoPreview.style.filter = '';
  photoEffectLevel.classList.add('hidden');
  currentEffect = 'ORIGINAL';
};

const setPhotoEffect = (effect, value) => {
  currentEffect = effect;
  effectValue.value = value;
  switch (effect) {
    case photoEffects.CHROME:
      photoPreview.style.filter = `grayscale(${value / 100})`;
      break;
    case photoEffects.SEPIA:
      photoPreview.style.filter = `sepia(${value / 100})`;
      break;
    case photoEffects.MARVIN:
      photoPreview.style.filter = `invert(${value}%)`;
      break;
    case photoEffects.PHOBOS:
      photoPreview.style.filter = `blur(${value / 100 * 3}px)`;
      break;
    case photoEffects.HEAT:
      photoPreview.style.filter = `brightness(${value / 100 * 2 + 1})`;
      break;
    case photoEffects.ORIGINAL:
      photoEffectLevel.classList.add('hidden');
      photoPreview.style.filter = '';
      break;
  }
  if (effect !== photoEffects.ORIGINAL) {
    photoEffectLevel.classList.remove('hidden');
  }
};


effectsList.addEventListener('change', (evt) => {
  const effect = evt.target.value;
  effectSlider.noUiSlider.set(100);
  setPhotoEffect(effect, 100);
});

effectSlider.noUiSlider.on('update', (values) => {
  setPhotoEffect(currentEffect, values);
});


export {
  initScale,
  initSlider
};
