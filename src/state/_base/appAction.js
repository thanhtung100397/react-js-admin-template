import { objToObj, TypeChecker } from '../../utils/helpers';
import { uuidV4 } from '../../utils/idHelpers';

const baseAppAction = (data, actionGroup, defaultActionType) => ({
  ...data,
  id: data.id || uuidV4(),
  type: data.type || defaultActionType,
  group: data.group || actionGroup,
});

export const getActionId = (action) => action.id;

export const getActionType = (action) => action.type;

export const getActionGroup = (action) => action.group;

export const getActionPayload = (action) => action.payload;

export const checkActionGroupValid = (action, allowedGroupsSet) => {
  if (!allowedGroupsSet || !allowedGroupsSet.size) {
    return true;
  }
  const actionGroup = getActionGroup(action);
  return allowedGroupsSet.has(actionGroup);
};

const newAppAction = (action, actionGroup, actionKey) => {
  if (TypeChecker.isFunction(action)) {
    return (...args) => baseAppAction(action(args), actionGroup, actionKey);
  }
  return baseAppAction(action, actionGroup, actionKey);
};

export const createAppActions = (actions, actionGroup) => {
  return objToObj(
    actions,
    (key) => key,
    (value, key) => newAppAction(value, actionGroup, key)
  );
};