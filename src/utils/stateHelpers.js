import { assign, extractFields, removeFields } from './helpers';

export const StateHelpers = {
  update: (state, newValues) => assign({}, state, newValues),
  updateFields: (state, newValues, fieldNames) => assign({}, state, extractFields(newValues, fieldNames)),
  removeFields: (state, fieldNames) => removeFields(state, fieldNames)
};