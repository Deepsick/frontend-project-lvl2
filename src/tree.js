import _ from 'lodash';
import { KeyType } from './const.js';

const buildDiff = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2)).sort();
  const nodes = [];
  keys.map((key) => {
    const oldValue = data1[key];
    const newValue = data2[key];

    if (!_.has(data2, key)) {
      return nodes.push({
        type: KeyType.REMOVED,
        key,
        value: oldValue,
      });
    }

    if (!_.has(data1, key)) {
      return nodes.push({
        type: KeyType.ADDED,
        key,
        value: newValue,
      });
    }

    if (_.isObject(oldValue) && _.isObject(newValue)) {
      return nodes.push({
        type: KeyType.NESTED,
        key,
        children: buildDiff(oldValue, newValue),
      });
    }

    if (!_.isEqual(data1[key], data2[key])) {
      return nodes.push({
        type: KeyType.UPDATED,
        key,
        oldValue,
        newValue,
      });
    }

    return nodes.push({
      type: KeyType.UNCHANGED,
      key,
      value: oldValue,
    });
  });

  return nodes;
};

export default buildDiff;
