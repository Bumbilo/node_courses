#!/usr/bin/env node
const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

const fs = require('fs');

const path = require('path');

const [fileName] = argv._;

const readStream = fs.createReadStream(path.join(__dirname, `${fileName}.txt`), {encoding: "utf8"});

let log = '';

readStream.on('data', (data) => log += data);

readStream.on('end', () => {
    const allTries = log.split(';').filter(item => item !== '');
    console.log(`Общее количество партий: ${allTries.length}`)

    const wins = allTries.filter(item => {
        const [guesNumber, randomNumber] = item.split(',');
        return guesNumber === randomNumber;
    })

    console.log(`количество выигранных: ${wins.length} / проигранных партий ${allTries.length - wins.length}`)
    console.log(`Процентное соотношение выигранных партий: ${Math.round((wins.length / allTries.length) * 100)}`)
})

