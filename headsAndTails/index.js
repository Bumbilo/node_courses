#!/usr/bin/env node
const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const readLine = require('readline');
const fs = require('fs');
const path = require('path');

const [fileName] = argv._;
const input = readLine.createInterface(process.stdin);
const writeStream = fs.createWriteStream( path.join(__dirname, `${fileName}.txt`), { encoding: "utf8"} );

const MAX_VALUE = 2;
const MIN_VALUE = 1;

function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

console.log(`Угадайте число в диапазоне от ${MIN_VALUE} до ${MAX_VALUE}`);

input.on('line', (number) => {
    const guesseNumber = Number(number);
    const randomNumber = getRandomArbitrary(MIN_VALUE, MAX_VALUE);

    writeStream.write(`${number},${randomNumber};`)

    const message = guesseNumber !== randomNumber ? `Правельный ответ: ${randomNumber}. Попробуйте еще!` : 'Вы угадали! Попробуйте еще!'

    console.log(message);
});

input.on('close', () => {
    console.log('Програма закрыта!');
});