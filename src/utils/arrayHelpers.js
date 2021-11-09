
export const ArrayHelpers = {
  addValues: (array, values) => array.concat(values),
  removeValuesByIndex: (array, index, removeCount = 1) => [...array].splice(array, index, removeCount),
  intersectValues: (...arrays) =>
    arrays.reduce((preArray, curArray) => {
      if (curArray && curArray.length) {
        return preArray.filter((item) => curArray.includes(item));
      }
      return [];
    }),
  nonIntersectValues: (...arrays) =>
    arrays.reduce((preArray, curArray) => {
      if (curArray && curArray.length) {
        return preArray.filter((item) => !curArray.includes(item));
      }
      return preArray;
    })
};