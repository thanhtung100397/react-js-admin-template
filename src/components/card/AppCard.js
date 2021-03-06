import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { baseProps, fromBaseProps } from '../base';
import { Card } from 'antd';
import './AppCard.scss'

const propTypes = {
  ...baseProps,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]), // title content
  hoverable: PropTypes.bool, // add lift up effect when hovering card
  noBodyPadding: PropTypes.bool, // remove padding in card body
  hFull: PropTypes.bool,
  wFull: PropTypes.bool,
  whFull: PropTypes.bool
};

const defaultProps = {

};

const AppCard = (props) => {
  const className = classNames('app-card', {
    'no-body-padding': props.noBodyPadding,
    'w-full': props.wFull,
    'h-full': props.hFull,
    'wh-full': props.whFull,
  });
  return (
    <Card {...fromBaseProps({className: className}, props)}
          title={props.title} hoverable={props.hoverable}>
      {props.children}
    </Card>
  );
};

AppCard.propTypes = propTypes;

AppCard.defaultProps = defaultProps;

export default AppCard;