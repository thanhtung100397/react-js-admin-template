import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../../../components/base';
import { Col } from 'antd';
import { isEmpty, TypeChecker } from '../../../utils/helpers';
import './AppCol.scss';

const SIDE_PADDING_DEFAULT = 6;

const propTypes = {
  ...baseProps,
  flex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // flex layout style
  offset: PropTypes.number, // number of cells to offset AppCol from the left
  order: PropTypes.number, // order number of AppCol (for sorting)
  span: PropTypes.number, // number of span cells (value = 0 - 24)
  xs: PropTypes.number, // number of span cells in 'xs' screen-size (screen < 576px)
  sm: PropTypes.number, // number of span cells in 'sm' screen-size (screen ≥ 576px)
  md: PropTypes.number, // number of span cells in 'md' screen-size (screen ≥ 768px)
  lg: PropTypes.number, // number of span cells in 'lg' screen-size (screen ≥ 992px)
  xl: PropTypes.number, // number of span cells in 'xl' screen-size (screen ≥ 1200px)
  xxl: PropTypes.number, // number of span cells in 'xxl' screen-size (screen ≥ 1600px)

  flexContainer: PropTypes.bool,
  rowGut: PropTypes.number, // vertical spacing between rows, not work when flexContainer = false,
  sidePadding: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

const defaultProps = {
};

const AppCol = (props) => {

  const style = useMemo(() => {
    let style = {};

    if (props.flexContainer) {
      return {
        ...style,
        display: 'flex',
        flexDirection: 'column',
        rowGap: props.rowGut
      }
    }

    let sidePadding;
    if (!TypeChecker.isUnset(props.sidePadding) && props.sidePadding !== false) {
      sidePadding = TypeChecker.isNumber(props.sidePadding)? props.sidePadding : SIDE_PADDING_DEFAULT;
      style = {
        ...style,
        paddingLeft: sidePadding,
        paddingRight: sidePadding
      }
    }

    return isEmpty(style)? undefined : style;
  }, [props.flexContainer, props.rowGut, props.sidePadding]);

  return (
    <Col {...fromBaseProps({ className: 'app-col', style: style }, props)}
         flex={props.flex} offset={props.offset} order={props.order} span={props.span}
         xs={props.xs} sm={props.sm} md={props.md} lg={props.lg} xl={props.lg} xxl={props.xxl}>
      {props.children}
    </Col>
  );
};

AppCol.propTypes = propTypes;

AppCol.defaultProps = defaultProps;

export default AppCol;