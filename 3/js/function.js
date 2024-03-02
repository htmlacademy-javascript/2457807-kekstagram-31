const checkLength = (string = '', maxSymbols = 1) => string.length <= maxSymbols;

const checkPalindrome = (string = '') => {
  const normalizedString = string.replaceAll(' ', '').toUpperCase();
  for (let i = 0; i < normalizedString.length; i++) {
    if (normalizedString[i] !== normalizedString[normalizedString.length - 1 - i]) {
      return false;
    }
  }
  return true;
};

const isPalindrome = (string = '') => {
  const normalizedString = string.replaceAll(' ', '').toUpperCase();
  return normalizedString === [...normalizedString].reverse().join('');
};

const getNumberFromString = (string = 'a') => {
  let NumberFromString = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      NumberFromString += string[i];
    }
  }
  return parseInt(NumberFromString, 10);
};

const extractNumber = (string = '') => parseInt(string.replaceAll(/\D/g, ''), 10);

const getRandomChar = (string) =>string[Math.round(Math.random() * (string.length - 1))];

const makeRandomString = (string, length) => {
  let RandomString = '';
  while(RandomString.length < Math.floor(length)) {
    RandomString += getRandomChar(string);
  }
  return RandomString;
};

checkLength('RandomString', 17);
checkPalindrome('Дорога за город');
isPalindrome('Я ем змея');
getNumberFromString('ds9vcvl3;,.na5');
extractNumber('adfasdf56<>sv78adf');
makeRandomString('vcke', 7);


