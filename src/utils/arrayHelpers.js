
export const ArrayHelpers = {
  addValues: (array, values) => arr.concat(values),
  removeValuesByIndex: (array, index, removeCount = 1) => [...array].splice(array, index, removeCount),
};