#!/usr/bin/env node
const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

const current = argv._.includes('current');
const add = argv._.includes('add');
const sub = argv._.includes('sub');

const date = new Date();

// Get Date
if (current) {
  if (argv.year || argv.y) {
    return console.log(date.getFullYear());
  }

  if (argv.month || argv.m) {
    return console.log(date.getMonth());
  }
  if (argv.date || argv.d) {
    return console.log(date.getDate());
  }

  return console.log(date);
}

// ADD
if (add) {
  if (argv.day || argv.d) {
    console.log(argv);
    date.setDate(date.getDate() + (argv.d || argv.day));
    console.log(date.toISOString());
  }

  if (argv.month || argv.m) {
    date.setMonth(date.getMonth() + (argv.m || argv.month));
    console.log(date.toISOString());
  }
}

// SUB
if (sub) {
  if (argv.day || argv.d) {
    date.setDate(date.getDate() - (argv.d || argv.day));
    console.log(date.toISOString());
  }

  if (argv.month || argv.m) {
    date.setMonth(date.getMonth() - (argv.m || argv.month));
    console.log(date.toISOString());
  }
}
