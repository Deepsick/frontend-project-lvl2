import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputFormats = ['json', 'yml'];

const getFixturePath = (fileName) => join(__dirname, '..', '__fixtures__', fileName);
const readFile = (fileName) => readFileSync(getFixturePath(fileName), 'utf-8');

/* Hexlet-check throws an error if let is used, so beforeAll hook can't be used :( */
const jsonResult = readFile('result.json');
const plainResult = readFile('result.plain');
const stylishResult = readFile('result.stylish');

describe('Test gendiff unit', () => {
  describe.each(inputFormats)('Should work for %s input format', (format) => {
    const path1 = getFixturePath(`file1.${format}`);
    const path2 = getFixturePath(`file2.${format}`);

    test('Should work for json output format', () => {
      const diff = genDiff(path1, path2, 'json');
      expect(diff).toBe(jsonResult);
    });

    test('Should work for stylish output format', () => {
      const diff = genDiff(path1, path2, 'stylish');
      expect(diff).toBe(stylishResult);
    });

    test('Should work for plain output format', () => {
      const diff = genDiff(path1, path2, 'plain');
      expect(diff).toBe(plainResult);
    });
  });

  test('Should apply default stylish output format if format param is empty', () => {
    const path1 = getFixturePath('file1.json');
    const path2 = getFixturePath('file2.yml');

    const diff = genDiff(path1, path2);
    expect(diff).toBe(stylishResult);
  });
});
