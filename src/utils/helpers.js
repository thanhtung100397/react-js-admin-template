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

export const getObjField = (obj, field, defaultValue) => {
  return _.get(obj, field, defaultValue);
};

export const objHasField = (obj, path) => {
 return _.hasIn(obj, path);
};

export const setObjField = (obj, path, value, ifFieldExist) => {
  if (ifFieldExist && !objHasField(obj, path)) {
    return;
  }
  return _.set(obj, path, value);
};

export const isEmpty = (value) => {
  return _.isEmpty(value);
};

export const excludeFields = (obj, fields) => {
  return _.omit(obj, fields);
};

export const toNumber = (value) => {
  return _.toNumber(value);
};

export const delay = async (millis) => {
  return new Promise((resolve, reject) => {
    try {
      _.delay(resolve, millis);
    } catch (e) {
      reject(e);
    }
  });
};

export const reduce = (values, transform, initialValue) => {
  return _.reduce(values, transform, initialValue);
};

export const assign = (des, ...src) => {
  return _.assign(des, ...src);
};

export const extractFields = (des, fieldNames) => {
  return _.pick(des, fieldNames);
};

export const removeFields = (des, fieldNames) => {
  return _.omit(des, fieldNames);
};

export const newSet = (...values) => {
  return new Set(values);
};

export const collectionContain = (collection, value) => {
  if (TypeChecker.isArray(collection)) {
    return collection.includes(value)
  } else if (TypeChecker.isSet(collection)) {
    return collection.has(value);
  } else if (TypeChecker.isMap(collection)) {
    return Boolean(collection[value])
  }
  return false;
};

export const arrToObj = (arr, keyMapper = (item, index) => index,
                         valueMapper = (item, index) => item) => {
  const resultObj = {};
  arr.forEach((arrItem, index) => {
    const key = keyMapper(arrItem, index);
    if (key) {
      resultObj[key] = valueMapper(arrItem, index);
    }
  });
  return resultObj;
};