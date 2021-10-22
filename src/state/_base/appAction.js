import { objToObj, TypeChecker } from '../../utils/helpers';
import { uuidV4 } from '../../utils/idHelpers';

const baseAppAction = (data) => ({
  ...data,
  id: uuidV4()
});

export const getActionId = (action) => action.id;

export const getActionType = (action) => action.type;

export const getActionGroup = (action) => action.group;

export const checkActionGroupValid = (action, allowedGroupsSet) => {
  if (!allowedGroupsSet || !allowedGroupsSet.size) {
    return true;
  }
  const actionGroup = getActionGroup(action);
  return allowedGroupsSet.has(actionGroup);
};

const newAppAction = (action) => {
  if (TypeChecker.isFunction(action)) {
    return (...args) => baseAppAction(action(args));
  }
  return baseAppAction(action);
};

export const createAppActions = (actions) => {
  return objToObj(
    actions,
    (key) => key,
    (value) => newAppAction(value)
  );
};