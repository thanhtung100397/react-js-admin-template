import React from 'react';
import { baseProps, fromBaseProps } from '../base';
import PropTypes from 'prop-types';
import { LoadingOutlined } from '@ant-design/icons';
import { TypeChecker } from '../../utils/helpers';
import './AppSpinner.scss';

const propTypes = {
  ...baseProps,
  indicator: PropTypes.node,
  width: PropTypes.number,
  height: PropTypes.number
};

const defaultProps = {
  indicator: (
    <div className="default-indicator">
      <LoadingOutlined/>
    </div>
  ),
  width: 64,
  height: 64
};

const AppSpinner = (props) => {
  const renderIndicator = (indicator) => {
    if (TypeChecker.isString(indicator)) {
      indicator = <img src={indicator} alt="" style={{width: props.width, height: props.height}}/>;
    }
    return (
      <div className="indicator" style={{width: props.width, height: props.height}}>
        {indicator}
      </div>
    )
  }

  return (
    <div {...fromBaseProps({ className: 'app-spinner' }, props)}>
      {renderIndicator(props.indicator)}
    </div>
  )
};

AppSpinner.propTypes = propTypes;

AppSpinner.defaultProps = defaultProps;

export default AppSpinner;