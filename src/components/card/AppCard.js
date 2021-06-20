import React from 'react';
import { baseProps, fromBaseProps } from '../base';
import { Card } from 'antd';
import './AppCard.scss'

const propTypes = {
  ...baseProps
};

const defaultProps = {

};

const AppCard = (props) => {
  return (
    <Card {...fromBaseProps({ className: 'app-card' }, props)}>
      {props.children}
    </Card>
  );
};

AppCard.propTypes = propTypes;

AppCard.defaultProps = defaultProps;

export default AppCard;