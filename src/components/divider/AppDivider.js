import React from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../base';
import { Divider } from 'antd';
import './AppDivider.scss';

const propTypes = {
  ...baseProps,
  type: PropTypes.oneOf(['horizontal', 'vertical']), // direction type of divider,
  title: PropTypes.node, // divider title
  orientation: PropTypes.oneOf(['left', 'right', 'center']), // position of title inside divider
  dashed: PropTypes.bool, // whether line is dashed
};

const defaultProps = {
  type: 'horizontal',
  orientation: 'left'
};

const AppDivider = (props) => {
  return (//should wrapped in <div> to prevent some unexpected issues when show on a flex container
    <div>
      <Divider {...fromBaseProps({className: 'app-divider'}, props)}
               type={props.type} orientation={props.orientation}
               dashed={props.dashed}>
        {props.title}
      </Divider>
    </div>
  )
};

AppDivider.propTypes = propTypes;

AppDivider.defaultProps = defaultProps;

export default AppDivider;