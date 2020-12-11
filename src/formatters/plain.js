import _ from 'lodash';
import NodeType from '../nodeTypes.js';

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
  [NodeType.ADDED]: ({ key, value }, path) => `Property '${buildPath(path, key)}' was added with value: ${stringify(value)}`,
  [NodeType.REMOVED]: ({ key }, path) => `Property '${buildPath(path, key)}' was removed`,
  [NodeType.UPDATED]: ({ key, oldValue, newValue }, path) => `Property '${buildPath(path, key)}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`,
  [NodeType.UNCHANGED]: () => [],
  [NodeType.NESTED]: ({ key, children }, path, format) => format(children, [...path, key]),

};

const format = (nodes, path = []) => {
  const rows = nodes.map((node) => {
    const { type } = node;
    return mapNodeTypeToFormatter[type](node, path, format);
  });

  return rows.flat(1).join('\n');
};

export default format;
