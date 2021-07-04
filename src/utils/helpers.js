import _ from 'lodash';

export const TypeChecker = {
  isString: (value) => _.isString(value),
  isNumber: (value) => _.isNumber(value),
  isBoolean: (value) => _.isBoolean(value),
  isDate: (value) => _.is(value),
  isArray: (value) => _.isArray(value),
  isSet: (value) => _.isSet(value),
  isMap: (value) => _.isMap(value),
  isCollection: (value) => TypeChecker.isArray(value) || TypeChecker.isSet(value) || TypeChecker.isMap(value),
  isObject: (value) => _.isObject(value),
  isFunction: (value) => _.isFunction(value),
  isEmpty: (value) => _.isEmpty(value), // Checks if value is an empty object, collection, map, or set.
  isError: (value) => _.isError(value),
  isElement: (value) => _.isElement(value),
  isUnset: (value) => _.isNull(value) || _.isUndefined(value),
  isPromise: (value) => value && Object.prototype.toString.call(value) === "[object Promise]",
  isType: (value, type) => {
    let checker = TypeChecker[`is${_.capitalize(type)}`];
    return checker? checker(value) : false;
  }
};

export const Generator = {
  uniqueId: (prefix) => _.uniqueId(prefix)
};

export const getLength = (value) => {
  if (TypeChecker.isArray(value) || TypeChecker.isString(value)) {
    return value.length;
  } else if (TypeChecker.isSet(value) || TypeChecker.isMap(value)) {
    return value.size();
  } else if (TypeChecker.isNumber(value)) {
    return value.toString.length;
  }
};

export const oneOf = (value, values) => {
  if (TypeChecker.isArray(values)) {
    return values.includes(value);
  } else if (TypeChecker.isSet(values)) {
    return values.has(value);
  }
};

export const printToString = (value) => {
  if (TypeChecker.isNumber(value)) {
    return value;
  } else if (TypeChecker.isString(value)) {
    return `'${value}'`;
  } else if (TypeChecker.isArray(value) || TypeChecker.isSet(value)) {
    return `[${value.join(', ')}]`;
  } else {
    return value.toString;
  }
};

export const setObjValue = (obj, path, value) => {
  return _.set(obj, path, value);
};

export const isEmpty = (value) => {
  return _.isEmpty(value);
};

export const excludeFields = (obj, fields) => {
  return _.omit(obj, fields);
}