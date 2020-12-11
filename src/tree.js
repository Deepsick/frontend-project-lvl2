import _ from 'lodash';
import NodeType from './nodeTypes.js';

const buildDiff = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  const nodes = _.sortBy(keys).map((key) => {
    const oldValue = data1[key];
    const newValue = data2[key];

    if (!_.has(data2, key)) {
      return {
        type: NodeType.REMOVED,
        key,
        value: oldValue,
      };
    }

    if (!_.has(data1, key)) {
      return {
        type: NodeType.ADDED,
        key,
        value: newValue,
      };
    }

    if (_.isObject(oldValue) && _.isObject(newValue)) {
      return {
        type: NodeType.NESTED,
        key,
        children: buildDiff(oldValue, newValue),
      };
    }

    if (!_.isEqual(data1[key], data2[key])) {
      return {
        type: NodeType.UPDATED,
        key,
        oldValue,
        newValue,
      };
    }

    return {
      type: NodeType.UNCHANGED,
      key,
      value: oldValue,
    };
  });

  return nodes;
};

export default buildDiff;
