import React from 'react';
import { baseProps, fromBaseProps } from '../base';
import { icons } from '../../assets/icons';
import './AppLoading.scss'

const propTypes = {
  ...baseProps
};

const defaultProps = {

};

const AppLoading = (props) => {
  return (
    <div {...fromBaseProps({ className: 'app-loading' }, props)}>
      <img className="indicator" src={icons.ic_app_loading} alt="app-loading"/>
    </div>
  )
};

AppLoading.propTypes = propTypes;

AppLoading.defaultProps = defaultProps;

export default AppLoading;