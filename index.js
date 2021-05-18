const http = require('http');
const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const showForcast = require('./forcast');
const readLine = require('readline');
const {API_URL, ACCESS_KEY} = process.env;

const input = readLine.createInterface(process.stdin);
const url = `${API_URL}/forecast?access_key=${ACCESS_KEY}&query=`;


input.on('line', (city) => {
    const serchParams = url + city;
    http.get(serchParams, (res) => {
        let forcastData = '';
        if(res.statusCode !== 200) {
            console.error(`Status code: ${res.statusCode}`);
            return;
        }

        res
            .setEncoding('utf8')
            .on('data', (data) => forcastData += data)
            .on('end', () => showForcast(JSON.parse(forcastData)))
    }).on('error', (err) => {
        cosole.error(`Got error: ${err}`)
    });
});

input.on('close', () => {
    console.log('Програма закрыта!');
});

