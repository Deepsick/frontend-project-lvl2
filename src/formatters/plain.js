import _ from 'lodash';
import NODE_TYPE from '../nodeTypes.js';

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
  [NODE_TYPE.added]: ({ key, value }, path) => `Property '${buildPath(path, key)}' was added with value: ${stringify(value)}`,
  [NODE_TYPE.removed]: ({ key }, path) => `Property '${buildPath(path, key)}' was removed`,
  [NODE_TYPE.updated]: ({ key, firstValue, secondValue }, path) => `Property '${buildPath(path, key)}' was updated. From ${stringify(firstValue)} to ${stringify(secondValue)}`,
  [NODE_TYPE.unchanged]: () => [],
  [NODE_TYPE.nested]: ({ key, children }, path, format) => format(children, [...path, key]),

};

const format = (nodes, path = []) => {
  const rows = nodes.flatMap((node) => {
    const { type } = node;
    return mapNodeTypeToFormatter[type](node, path, format);
  });

  return rows.join('\n');
};

export default format;
