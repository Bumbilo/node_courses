#!/usr/bin/env node
const readLine = require('readline');

const input = readLine.createInterface(process.stdin);

const MAX_VALUE = 100;
const MIN_VALUE = 1;

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

console.log(`Загадано число в диапазоне от ${MIN_VALUE} до ${MAX_VALUE}`);

const randomNumber = getRandomArbitrary(MIN_VALUE, MAX_VALUE);

input.on('line', (number) => {
  const guesseNumber = Number(number);

  if (guesseNumber < randomNumber) {
    console.log('Больше');
  }

  if (guesseNumber > randomNumber) {
    console.log('Меньше');
  }

  if (guesseNumber === randomNumber) {
    console.log(`Отгадано число ${guesseNumber}`);
  }

});

input.on('close', () => {
  console.log('Програма закрыта!');
});
