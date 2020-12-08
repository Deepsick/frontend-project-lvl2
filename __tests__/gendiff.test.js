import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputFormats = ['stylish', 'json', 'plain'];
const inputFormats = ['json', 'yml'];

const getFixturePath = (fileName) => join(__dirname, '..', '__fixtures__', fileName);
const readFile = (fileName) => readFileSync(getFixturePath(fileName), 'utf-8');

const result = {};
beforeAll(() => {
  outputFormats.forEach((format) => {
    const data = readFile(`result.${format}`);
    result[format] = data;
  });
});

describe('Test gendiff unit', () => {
  describe.each(inputFormats)('Should work for %s input format', (format) => {
    const path1 = getFixturePath(`file1.${format}`);
    const path2 = getFixturePath(`file2.${format}`);

    test.each(outputFormats)('Should work for %s output format', (outputFormat) => {
      const diff = genDiff(path1, path2, outputFormat);
      expect(diff).toBe(result[outputFormat]);
    });
  });

  test('Should apply default stylish output format if format param is empty', () => {
    const path1 = getFixturePath('file1.json');
    const path2 = getFixturePath('file2.yml');

    const diff = genDiff(path1, path2);
    expect(diff).toBe(result.stylish);
  });
});
