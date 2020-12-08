import formatPlain from './plain.js';
import formatStylish from './stylish.js';
import formatJson from './json.js';

const Format = {
  PLAIN: 'plain',
  STYLISH: 'stylish',
  JSON: 'json',
};

const formatTree = (tree, format) => {
  if (format === Format.PLAIN) {
    return formatPlain(tree);
  }

  if (format === Format.STYLISH) {
    return formatStylish(tree);
  }

  if (format === Format.JSON) {
    return formatJson(tree);
  }

  throw new Error('There is no such format');
};

export default formatTree;
