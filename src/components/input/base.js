import PropTypes from 'prop-types';
import { useContext, useEffect, useRef, useState } from 'react';
import { AppFormItemContext } from '../form/AppFormItem';

export const inputPropTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.node,
  onChange: PropTypes.func,
  allowClear: PropTypes.bool,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool
};

export const fromInputProps = (props) => {
  return {
    id: props.id,
    allowClear: props.allowClear,
    maxLength: props.maxLength,
    disabled: props.disabled,
    value: props.value,
    defaultValue: props.defaultValue,
    placeholder: props.placeholder,
    onChange: props.onChange,
    prefix: props.icon
  }
};

export const useAppFormItem = (disable) => {
  const { setInputRef } = useContext(AppFormItemContext) || {};
  const [disabled, setDisabled] = useState();
  const ref = useRef({});

  useEffect(() => {
    setDisabled(disable);
  }, [disable]);

  useEffect(() => {
    setInputRef && setInputRef({
      getValue: () => ref.current?.state.value,
      disable: (disabled) => setDisabled(disabled)
    });
  }, [setInputRef]);

  return [ref, disabled]
}