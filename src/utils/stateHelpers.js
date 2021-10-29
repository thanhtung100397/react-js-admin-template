import { ObjectHelpers } from './objectHelpers';

export const StateHelpers = {
  update: (state, newValues) => ({...state, ...newValues}),
  updateField: (state, field, newValue) => ObjectHelpers.updateField({...state}, field, newValue),
  removeFields: (state, fields) => ObjectHelpers.removeFields(state, fields)
};