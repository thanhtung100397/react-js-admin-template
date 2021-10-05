import { excludeFields, getObjField, setObjField, TypeChecker } from '../utils/helpers';

export const updateState = (currentState, newState) => {
  return {
    ...currentState,
    ...newState
  }
};

export const updateStateField = (currentState, field, newValue) => {
  return setObjField({...currentState}, field, newValue);
};

export const removeStateField = (currentState, ...fields) => {
  return excludeFields({...currentState}, fields);
};

export const addToStateArray = (currentState, arrayField, addValues) => {
  let arrValue = getObjField(currentState, arrayField);
  if (!TypeChecker.isArray(arrValue)) {
    return;
  }
  return updateStateField({...currentState}, arrayField, arrValue.concat(addValues));
};

export const removeFromStateArray = (currentState, arrayField, index, deleteCount = 1) => {
  let arrValue = getObjField(currentState, arrayField);
  if (!TypeChecker.isArray(arrValue)) {
    return;
  }
  return updateStateField({...currentState}, arrayField, [...arrValue].splice(index, deleteCount));
};

export const replaceStateArray = (currentState, arrayField, index, ...updateValues) => {
  let arrValue = getObjField(currentState, arrayField);
  if (!TypeChecker.isArray(arrValue)) {
    return;
  }
  return updateStateField({...currentState}, arrayField, [...arrValue].splice(index, updateValues.length, updateValues));
};