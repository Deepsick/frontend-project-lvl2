import _ from 'lodash';
import { KeyType } from '../const.js';

const Offset = {
  DEFAULT: 2,
  BRACE: 0,
};
const INDENT_SIZE = 4;
const INDENT_TYPE = ' ';
const Prefix = {
  ADDED: '+ ',
  REMOVED: '- ',
  UNCHANGED: '  ',
};

const makeIndent = (depth, offset = Offset.DEFAULT, indentSize = INDENT_SIZE, indentType = INDENT_TYPE) => indentType.repeat(depth * indentSize - offset);

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
  const rows = [];

  nodes.forEach((node) => {
    const {
      type,
      key,
      value,
      oldValue,
      newValue,
      children,
    } = node;

    const strValue = stringify(value, depth);
    const strOldValue = stringify(oldValue, depth);
    const strNewValue = stringify(newValue, depth);

    if (type === KeyType.REMOVED) {
      rows.push(`${Prefix.REMOVED}${key}: ${strValue}`);
    }

    if (type === KeyType.ADDED) {
      rows.push(`${Prefix.ADDED}${key}: ${strValue}`);
    }

    if (type === KeyType.NESTED) {
      rows.push(`${Prefix.UNCHANGED}${key}: ${format(children, depth + 1)}`);
    }

    if (type === KeyType.UNCHANGED) {
      rows.push(`${Prefix.UNCHANGED}${key}: ${strValue}`);
    }

    if (type === KeyType.UPDATED) {
      rows.push(`${Prefix.REMOVED}${key}: ${strOldValue}`);
      rows.push(`${Prefix.ADDED}${key}: ${strNewValue}`);
    }
  });

  const braceIndent = makeIndent(depth - 1, Offset.BRACE);
  const formattedRows = rows.map((row) => `${makeIndent(depth)}${row}`);
  return `{\n${formattedRows.join('\n')}\n${braceIndent}}`;
};

export default format;
