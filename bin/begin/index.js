#!/usr/bin/env node
const program = require('commander');

program
  .usage('<command> [options]')
  .command('init [name]', 'init a project')
  .parse(process.argv);