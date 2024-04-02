/* eslint-disable no-console */
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

const getRandomChar = (string) => string[Math.round(Math.random() * (string.length - 1))];

const makeRandomString = (string, length) => {
  let RandomString = '';
  while (RandomString.length < Math.floor(length)) {
    RandomString += getRandomChar(string);
  }
  return RandomString;
};

const getMinutes = (string = '00:00') => {
  if (isNaN(Number(string.split(':')[0])) || isNaN(Number(string.split(':')[1]))) {
    return -1;
  }
  if (Number(string.split(':')[0]) < 0 || Number(string.split(':')[1]) < 0){
    return -2;
  }
  return Number(string.split(':')[0]) * 60 + Number(string.split(':')[1]);
};
const checkMeeting = (startWorkDay = '8:30', endWorkDay = '17:30', startMeeting = '0:0', timeMeeting = 0) => {
  if ((getMinutes(startWorkDay) === -1) || (getMinutes(startMeeting) === -1) || (getMinutes(endWorkDay) === -1) || (getMinutes(startMeeting) === -1) || isNaN(Number(timeMeeting))){
    return 'Неверный формат времени';
  }
  if ((getMinutes(startWorkDay) === -2) || (getMinutes(startMeeting) === -2) || (getMinutes(endWorkDay) === -2) || (getMinutes(startMeeting) === -2) || Number(timeMeeting) <= 0){
    return 'Время не может быть отрицательным';
  }
  if (getMinutes(startWorkDay) <= getMinutes(startMeeting) && (getMinutes(endWorkDay)) >= (getMinutes(startMeeting) + Number(timeMeeting))) {
    return true;
  }
  return false;
};
const checkLength = (string = '', maxSymbols = 1) => string.length <= maxSymbols;
