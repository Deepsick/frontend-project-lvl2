import _ from 'lodash';
import NODE_TYPE from '../nodeTypes.js';

const Offset = {
  DEFAULT: 2,
  BRACE: 0,
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
  offset = Offset.DEFAULT,
  indentSize = INDENT_SIZE,
  indentType = INDENT_TYPE,
) => indentType.repeat(depth * indentSize - offset);

const stringify = (node, depth) => {
  const indent = makeIndent(depth + 1);
  const braceIndent = makeIndent(depth, Offset.BRACE);

  if (_.isObject(node)) {
    const rows = _.keys(node).map((key) => {
      const strValue = stringify(node[key], depth + 1);
      return `${indent}  ${key}: ${strValue}\n`;
    });
    return `{\n${rows.join('')}${braceIndent}}`;
  }

  return node;
};

const format = (nodes, depth = 1) => {
  const rows = nodes.flatMap((node) => {
    const {
      type,
      key,
      value,
      firstValue,
      secondValue,
      children,
    } = node;

    const indent = makeIndent(depth);
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
      return `${indent}${PREFIX.unchanged}${key}: ${format(children, depth + 1)}`;
    }

    if (type === NODE_TYPE.updated) {
      return [
        `${indent}${PREFIX.removed}${key}: ${strFirstValue}`,
        `${indent}${PREFIX.added}${key}: ${strSecondValue}`,
      ];
    }

    return `${indent}${PREFIX.unchanged}${key}: ${strValue}`;
  });

  const braceIndent = makeIndent(depth - 1, Offset.BRACE);
  return `{\n${rows.join('\n')}\n${braceIndent}}`;
};

export default format;
