import React from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../../components/base';
import { Space } from 'antd';
import './AppSpace.scss';

const propTypes = {
  ...baseProps,
  itemAlign: PropTypes.oneOf(['start', 'end', 'center', 'baseline']), // The alignment of items in this container
  layoutDirection: PropTypes.oneOf(['vertical', 'horizontal']), // The layout direction
  size: PropTypes.number, // The space size between items
  split: PropTypes.node, // Set split element between items
  wrap: PropTypes.bool // Auto wrap line, when layoutDirection = 'horizontal'
};

const defaultProps = {
  layoutDirection: 'vertical'
};

const AppSpace = (props) => {
  return (
    <Space {...fromBaseProps({ className: 'app-space' }, props)}
           align={props.itemAlign} direction={props.layoutDirection}
           size={props.size} split={props.split} wrap={props.wrap}>
      {props.children}
    </Space>
  );
};

AppSpace.propTypes = propTypes;

AppSpace.defaultProps = defaultProps;

export default AppSpace;