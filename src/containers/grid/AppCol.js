import React from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../../components/base';
import { Col } from 'antd';
import './AppCol.scss';

const propTypes = {
  ...baseProps,
  flex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // flex layout style
  offset: PropTypes.number, // number of cells to offset AppCol from the left
  order: PropTypes.number, // order number of AppCol (for sorting)
  span: PropTypes.number, // number of span cells
  xs: PropTypes.number, // number of span cells in 'xs' screen-size (screen < 576px)
  sm: PropTypes.number, // number of span cells in 'sm' screen-size (screen ≥ 576px)
  md: PropTypes.number, // number of span cells in 'md' screen-size (screen ≥ 768px)
  lg: PropTypes.number, // number of span cells in 'lg' screen-size (screen ≥ 992px)
  xl: PropTypes.number, // number of span cells in 'xl' screen-size (screen ≥ 1200px)
  xxl: PropTypes.number // number of span cells in 'xxl' screen-size (screen ≥ 1600px)
};

const defaultProps = {
};

const AppCol = (props) => {
  return (
    <Col {...fromBaseProps({ className: 'app-col' }, props)}
         flex={props.flex} offset={props.offset} order={props.order} span={props.span}
         xs={props.xs} sm={props.sm} md={props.md} lg={props.lg} xl={props.lg} xxl={props.xxl}>
      {props.children}
    </Col>
  );
};

AppCol.propTypes = propTypes;

AppCol.defaultProps = defaultProps;

export default AppCol;