import PropTypes from 'prop-types';
import { excludeFields } from '../../utils/helpers';

export const AutoComplete = {
  ON: 'on',
  OFF: 'off'
};

export const inputPropTypes = {
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  placeholderID: PropTypes.string,
  icon: PropTypes.node,
  onChange: PropTypes.func,
  allowClear: PropTypes.bool,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
  borderless: PropTypes.bool,
  autoComplete: PropTypes.oneOf(Object.keys(AutoComplete).map((key) => AutoComplete[key])) //TODO currently not working
};

export const fromInputProps = (props, ignoreProps, intl) => {
  let placeholder;
  if (props.placeholderID) {
    placeholder = intl?.formatMessage({ id: props.placeholderID }) || props.placeholderID;
  } else {
    placeholder = props.placeholder;
  }
  let result = {
    id: props.id,
    allowClear: props.allowClear,
    maxLength: props.maxLength,
    disabled: props.disabled,
    value: props.value,
    defaultValue: props.defaultValue,
    placeholder: placeholder,
    onChange: props.onChange,
    prefix: props.icon,
    bordered: !props.borderless
  };
  if (ignoreProps) {
    return excludeFields(result, ignoreProps);
  }
  return result;
};