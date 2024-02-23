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

const extractNumber = (string = '') => parseInt(string.replaceAll
  (/\D/g, ''),10);


