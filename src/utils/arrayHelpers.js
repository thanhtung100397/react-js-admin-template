import { intersection, xor, filter, concat } from 'lodash';

export const ArrayHelpers = {
  addValues: (array, ...values) => concat(array || [], ...values),
  removeValuesByIndex: (array, index, removeCount = 1) => [...array].splice(array, index, removeCount),
  removeValue: (array, value) => filter(array, (item) => item !== value),
  intersectValues: (...arrays) => intersection(...arrays),
  nonIntersectValues:  (...arrays) => xor(...arrays)
};