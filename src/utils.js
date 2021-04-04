'use strict';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  const arrayCopy = someArray.slice();

  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [arrayCopy[i], arrayCopy[randomPosition]] = [arrayCopy[randomPosition], arrayCopy[i]];
  }

  return arrayCopy;
};


const THREE_MONTHS_IN_MS = 1000 * 60 * 60 * 24 * 90;

const getRandomDateWithinThreeMonths = () => {
  return new Date(Date.now() - getRandomInt(0, THREE_MONTHS_IN_MS)).toLocaleString(`sv`).replace(`T`, ``);
};

module.exports = {
  getRandomInt,
  shuffle,
  getRandomDateWithinThreeMonths,
};
