import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { baseProps, fromBaseProps } from '../../base';
import { fromInputProps, inputPropTypes } from '../base';
import { useIntl } from 'react-intl';
import { useAppFormItem } from '../../form/AppFormItem';
import { Input } from 'antd';
import { isEmpty, TypeChecker } from '../../../utils/helpers';
import '../AppInput.scss';
import './AppTextAreaInput.scss';

const { TextArea } = Input;

const propTypes = {
  ...baseProps,
  ...inputPropTypes,
  rows: PropTypes.number,
  maxRows: PropTypes.number,
  minRows: PropTypes.number,
  autoRows: PropTypes.bool
};

const defaultProps = {
};

const AppTextAreaInput = (props) => {
  const { maxRows, minRows, autoRows } = props;
  const [autoSize, setAutoSize] = useState();
  const [onChange, disabled] = useAppFormItem(props.disabled, props.onChange);
  const intl = useIntl();

  useEffect(() => {
    let autoSize;
    if (TypeChecker.isBoolean(autoRows)) {
      autoSize = autoRows;
    } else {
      autoSize = {};
      if (maxRows) {
        autoSize.maxRows = maxRows;
      }
      if (minRows) {
        autoSize.minRows = minRows;
      }
      if (isEmpty(autoSize)) {
        return;
      }
    }
    setAutoSize(autoSize)
  }, [maxRows, minRows, autoRows]);

  return (
    <TextArea {...fromBaseProps({className: classNames('app-input', 'app-text-area-input')}, props)}
              {...fromInputProps(props, undefined, intl)}
              onChange={onChange} disabled={disabled} rows={props.rows} autoSize={autoSize}/>
  )
};

AppTextAreaInput.propTypes = propTypes;

AppTextAreaInput.defaultProps = defaultProps;

export default AppTextAreaInput;