import { objToObj, TypeChecker } from '../../utils/helpers';
import { uuidV4 } from '../../utils/idHelpers';

const STORE_PATH_FIELD_NAME = "storePath";

const baseAppAction = (data) => ({
  ...data,
  id: uuidV4()
});

const newAppAction = (action) => {
  if (TypeChecker.isFunction(action)) {
    return (...args) => baseAppAction(action(args));
  }
  return baseAppAction(action);
};

export const checkActionStorePathValid = (action, sourceStorePath) => {
  const targetStorePath = action[STORE_PATH_FIELD_NAME];
  if (!targetStorePath) {
    return true;
  }
  if (TypeChecker.isFunction(targetStorePath)) {
    return targetStorePath(sourceStorePath);
  }
  return targetStorePath === sourceStorePath;
};

export const createAppActions = (actions) => {
  return objToObj(
    actions,
    (key) => key,
    (value) => newAppAction(value)
  );
};