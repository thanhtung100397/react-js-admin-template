import { intersection, xor } from 'lodash';

export const ArrayHelpers = {
  addValues: (array, values) => array.concat(values),
  removeValuesByIndex: (array, index, removeCount = 1) => [...array].splice(array, index, removeCount),
  intersectValues: (...arrays) => intersection(...arrays),
  nonIntersectValues:  (...arrays) => xor(...arrays)
};