import _ from 'lodash';
import NodeType from './nodeTypes.js';

const buildDiff = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  const nodes = _.sortBy(keys).map((key) => {
    const firstValue = data1[key];
    const secondValue = data2[key];

    if (!_.has(data2, key)) {
      return {
        type: NodeType.REMOVED,
        key,
        value: firstValue,
      };
    }

    if (!_.has(data1, key)) {
      return {
        type: NodeType.ADDED,
        key,
        value: secondValue,
      };
    }

    if (_.isObject(firstValue) && _.isObject(secondValue)) {
      return {
        type: NodeType.NESTED,
        key,
        children: buildDiff(firstValue, secondValue),
      };
    }

    if (!_.isEqual(data1[key], data2[key])) {
      return {
        type: NodeType.UPDATED,
        key,
        firstValue,
        secondValue,
      };
    }

    return {
      type: NodeType.UNCHANGED,
      key,
      value: firstValue,
    };
  });

  return nodes;
};

export default buildDiff;
