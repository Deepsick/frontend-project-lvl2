import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildDiff from './tree.js';
import formatTree from './formatters/index.js';

const getFormat = (filepath) => path.extname(filepath).replace('.', '');
const getPath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getPath(filepath), 'utf-8');

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const data1 = readFile(filePath1);
  const data2 = readFile(filePath2);

  const parsedData1 = parse(data1, getFormat(filePath1));
  const parsedData2 = parse(data2, getFormat(filePath2));

  const diffTree = buildDiff(parsedData1, parsedData2);
  return formatTree(diffTree, format);
};

export default genDiff;
