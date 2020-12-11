import formatPlain from './plain.js';
import formatStylish from './stylish.js';
import formatJson from './json.js';

const formatTree = (tree, format) => {
  switch(format) {
    case 'plain':
      return formatPlain(tree);
    case 'stylish':
      return formatStylish(tree);
    case 'json':
      return formatJson(tree);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default formatTree;
