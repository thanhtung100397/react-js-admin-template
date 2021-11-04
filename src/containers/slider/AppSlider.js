import React from 'react';
import { baseProps, fromBaseProps } from '../../components/base';
import { Layout } from 'antd';
import './AppSlider.scss';

const propTypes = {
  ...baseProps
};

const defaultProps = {

};

const AppSlider = (props) => {
  return (
    <Layout.Slider {...fromBaseProps({ className: 'app-slider' }, props)}>
    </Layout.Slider>
  )
};

AppSlider.propTypes = propTypes;

AppSlider.defaultProps = defaultProps;

export default AppSlider;