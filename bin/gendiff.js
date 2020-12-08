#!/usr/bin/env node
import program from 'commander';
import genDiff from '../src/diff.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1>')
  .arguments('<filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const diff = genDiff(filepath1, filepath2, program.format);
    console.log(diff);
  })
  .parse(process.argv);
