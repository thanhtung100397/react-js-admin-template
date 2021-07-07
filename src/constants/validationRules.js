import React from 'react';
import { FormattedMessage } from 'react-intl';
import { TypeChecker, getLength, oneOf, printToString } from '../utils/helpers';
import { Regex } from './constants';

export const ValidationRule = {
  VALUE_REQUIRED: (requiredValue) => ({
    message: <FormattedMessage id="ID_VALUE_REQUIRED_VALIDATION" values={{value: printToString(requiredValue)}}/>,
    validate: (value) => !value || value === requiredValue
  }),
  ONE_OF_VALUES: (values) => ({
    message: <FormattedMessage id="ID_ONE_OF_VALUES_VALIDATION" values={{values: printToString(values)}}/>,
    validate: (value) => !value || oneOf(value, values)
  }),
  TYPE_REQUIRED: (type) => ({
    message: <FormattedMessage id="ID_TYPE_REQUIRED_VALIDATION" values={{type: printToString(type)}}/>,
    validate: (value) => !value ||TypeChecker.isType(value, type)
  }),
  ONE_OF_TYPES: (types) => ({
    message: <FormattedMessage id="ID_ONE_OF_TYPES_VALIDATION" values={{types: printToString(types)}}/>,
    validate: (value) => !value || types.some(type => TypeChecker.isType(value, type))
  }),
  LENGTH: (length) => ({
    message: <FormattedMessage id="ID_LENGTH_VALIDATION" values={{length: length}}/>,
    validate: (value) => !value || getLength(value) === length
  }),
  MAX: (max) => ({
    message: (value) => <FormattedMessage id={TypeChecker.isNumber(value)? 'ID_MAX_VALUE_VALIDATION' : 'ID_MAX_LENGTH_VALIDATION'}
                                          values={{max: max}}/>,
    validate: (value) => !value || (TypeChecker.isNumber(value)? value <= max : getLength(value) <= max)
  }),
  MIN: (min) => ({
    message: (value) => <FormattedMessage id={TypeChecker.isNumber(value)? 'ID_MIN_VALUE_VALIDATION' : 'ID_MIN_LENGTH_VALIDATION'}
                                          values={{min: min}}/>,
    validate: (value) => !value || (TypeChecker.isNumber(value)? value >= min : getLength(value) >= min)
  }),
  PATTERN: (pattern) => ({
    message: <FormattedMessage id="ID_PATTERN_VALIDATION" values={{pattern: printToString(pattern)}}/>,
    validate: (value) => !value || value.toString().match(pattern)
  }),
  EMAIL: {
    message: <FormattedMessage id="ID_EMAIL_VALIDATION"/>,
    validate: (value) => !value || ValidationRule.PATTERN(Regex.EMAIL).validate(value)
  },
  PHONE: {
    message: <FormattedMessage id="ID_PHONE_VALIDATION"/>,
    validate: (value) => !value || ValidationRule.PATTERN(Regex.PHONE).validate(value)
  },
  REQUIRED: {
    message: <FormattedMessage id="ID_REQUIRED_VALIDATION"/>,
    validate: (value) => Boolean(value)
  }
};