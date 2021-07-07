import PropTypes from 'prop-types';
import { excludeFields } from '../../utils/helpers';

export const inputPropTypes = {
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  icon: PropTypes.node,
  onChange: PropTypes.func,
  allowClear: PropTypes.bool,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
  borderless: PropTypes.bool
};

export const fromInputProps = (props, ignoreProps) => {
  let result = {
    id: props.id,
    allowClear: props.allowClear,
    maxLength: props.maxLength,
    disabled: props.disabled,
    value: props.value,
    defaultValue: props.defaultValue,
    placeholder: props.placeholder,
    onChange: props.onChange,
    prefix: props.icon,
    bordered: !props.borderless
  }
  if (ignoreProps) {
    return excludeFields(result, ignoreProps);
  }
  return result;
};