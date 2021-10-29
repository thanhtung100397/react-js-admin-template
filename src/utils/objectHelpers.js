import { extractFields, getObjField, removeFields, setObjField } from './helpers';

export const ObjectHelpers = {
  getField: (obj, field) => getObjField(obj, field),
  updateField: (obj, field, value) => setObjField(obj, field, value),
  extractFields: (obj, fields) => extractFields(obj, fields),
  removeFields: (obj, fields) => removeFields(obj, fields)
};

