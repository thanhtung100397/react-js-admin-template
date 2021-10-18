import uuid from 'uuid';
import { objToObj, TypeChecker } from '../../utils/helpers';

const STORE_PATH_FIELD_NAME = "storePath";

const newAppAction = (action) => { // TODO wrong app action init
  const { storePath, ...others } = action;
  return {
    id: uuid.v4(),
    [STORE_PATH_FIELD_NAME]: storePath,
    ...others
  };
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