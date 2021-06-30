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
  span: PropTypes.number, // number of span cells,
  xs: PropTypes.number
};

const defaultProps = {
  vAlign: 'top',
  hAlign: 'start',
  gutter: 0,
  wrap: true
};

const AppRow = (props) => {
  return (
    <Col {...fromBaseProps({ className: 'app-col' }, props)}
    >
      {props.children}
    </Col>
  );
};

AppRow.propTypes = propTypes;

AppRow.defaultProps = defaultProps;

export default AppRow;