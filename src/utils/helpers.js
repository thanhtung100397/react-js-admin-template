import _ from 'lodash';

export const TypeChecker = {
  isString: (value) => _.isString(value),
  isNumber: (value) => _.isNumber(value),
  isBoolean: (value) => _.isBoolean(value),
  isDate: (value) => _.is(value),
  isArray: (value) => _.isArray(value),
  isObject: (value) => _.isObject(value),
  isFunction: (value) => _.isFunction(value),
  isEmpty: (value) => _.isEmpty(value), // Checks if value is an empty object, collection, map, or set.
  isError: (value) => _.isError(value),
  isElement: (value) => _.isElement(value),
}

export const Generator = {
  uniqueId: (prefix) => _.uniqueId(prefix)
}