import _ from 'lodash';
import { KeyType } from './const.js';

const buildDiff = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  const nodes = _.sortBy(keys).map((key) => {
    const oldValue = data1[key];
    const newValue = data2[key];

    if (!_.has(data2, key)) {
      return {
        type: KeyType.REMOVED,
        key,
        value: oldValue,
      };
    }

    if (!_.has(data1, key)) {
      return {
        type: KeyType.ADDED,
        key,
        value: newValue,
      };
    }

    if (_.isObject(oldValue) && _.isObject(newValue)) {
      return {
        type: KeyType.NESTED,
        key,
        children: buildDiff(oldValue, newValue),
      };
    }

    if (!_.isEqual(data1[key], data2[key])) {
      return {
        type: KeyType.UPDATED,
        key,
        oldValue,
        newValue,
      };
    }

    return {
      type: KeyType.UNCHANGED,
      key,
      value: oldValue,
    };
  });

  return nodes;
};

export default buildDiff;
