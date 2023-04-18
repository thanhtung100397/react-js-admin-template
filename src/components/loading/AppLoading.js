import React from 'react';
import { baseProps, fromBaseProps } from '../base';
import { icons } from '../../assets/icons';
import AppSpinner from '../spiner/AppSpinner';
import './AppLoading.scss'

const propTypes = {
  ...baseProps
};

const defaultProps = {

};

const AppLoading = (props) => {
  return (
    <div {...fromBaseProps({ className: 'app-loading' }, props)}>
      <AppSpinner className="indicator" src={icons.ic_app_logo} alt="app-loading" width={128} height={128}/>
    </div>
  )
};

AppLoading.propTypes = propTypes;

AppLoading.defaultProps = defaultProps;

export default AppLoading;