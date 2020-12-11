import _ from 'lodash';
import NODE_TYPE from '../nodeTypes.js';

const OFFSET = {
  default: 2,
  brace: 0,
};
const INDENT_SIZE = 4;
const INDENT_TYPE = ' ';
const PREFIX = {
  added: '+ ',
  removed: '- ',
  unchanged: '  ',
};

const makeIndent = (
  depth,
  offset = OFFSET.default,
  indentSize = INDENT_SIZE,
  indentType = INDENT_TYPE,
) => indentType.repeat(depth * indentSize - offset);

const stringify = (node, depth) => {
  if (_.isObject(node)) {
    const indent = makeIndent(depth + 1);
    const braceIndent = makeIndent(depth, OFFSET.brace);
    const rows = _.keys(node).map((key) => {
      const strValue = stringify(node[key], depth + 1);
      return `${indent}  ${key}: ${strValue}\n`;
    });
    return `{\n${rows.join('')}${braceIndent}}`;
  }

  return node;
};

const iterate = (nodes, depth = 1) => nodes.flatMap((node) => {
  const {
    type,
    key,
    value,
    firstValue,
    secondValue,
    children,
  } = node;

  const indent = makeIndent(depth);
  const braceIndent = makeIndent(depth, OFFSET.brace);
  const strValue = stringify(value, depth);
  const strFirstValue = stringify(firstValue, depth);
  const strSecondValue = stringify(secondValue, depth);

  if (type === NODE_TYPE.removed) {
    return `${indent}${PREFIX.removed}${key}: ${strValue}`;
  }

  if (type === NODE_TYPE.added) {
    return `${indent}${PREFIX.added}${key}: ${strValue}`;
  }

  if (type === NODE_TYPE.nested) {
    const rows = iterate(children, depth + 1);
    return [
      `${indent}${PREFIX.unchanged}${key}: {`,
      ...rows,
      `${braceIndent}}`,
    ];
  }

  if (type === NODE_TYPE.updated) {
    return [
      `${indent}${PREFIX.removed}${key}: ${strFirstValue}`,
      `${indent}${PREFIX.added}${key}: ${strSecondValue}`,
    ];
  }

  return `${indent}${PREFIX.unchanged}${key}: ${strValue}`;
});

const format = (diffTree) => {
  const rows = iterate(diffTree);
  return `{\n${rows.join('\n')}\n}`;
};

export default format;
