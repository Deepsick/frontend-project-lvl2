import _ from 'lodash';
import { KeyType } from '../const.js';

const buildPath = (path, key) => [...path, key].join('.');

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (_.isString(value)) {
    return `'${value}'`;
  }

  return value;
};

const mapNodeTypeToFormatter = {
  [KeyType.ADDED]: ({ key, value }, path) => `Property '${buildPath(path, key)}' was added with value: ${stringify(value)}`,
  [KeyType.REMOVED]: ({ key }, path) => `Property '${buildPath(path, key)}' was removed`,
  [KeyType.UPDATED]: ({ key, oldValue, newValue }, path) => `Property '${buildPath(path, key)}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`,
  [KeyType.UNCHANGED]: () => [],
  [KeyType.NESTED]: ({ key, children }, path, format) => format(children, [...path, key]),

};

const format = (nodes, path = []) => {
  const result = [];
  nodes.forEach((node) => {
    const { type } = node;
    result.push(mapNodeTypeToFormatter[type](node, path, format));
  });

  return result.flat(1).join('\n');
};

export default format;
