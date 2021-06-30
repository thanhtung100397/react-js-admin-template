import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../../components/base';
import { Row } from 'antd';
import './AppRow.scss';

const propTypes = {
  ...baseProps,
  vAlign: PropTypes.oneOf(['top', 'middle', 'bottom']), // vertical alignment
  hAlign: PropTypes.oneOf(['start', 'center', 'end', 'space-around', 'space-between']), // horizontal alignment
  gutter: PropTypes.number, // spacing between columns
  xsGut: PropTypes.number, // spacing between columns in 'xs' screen-size (screen < 576px)
  smGut: PropTypes.number, // spacing between columns in 'sm' screen-size (screen ≥ 576px)
  mdGut: PropTypes.number, // spacing between columns in 'md' screen-size (screen ≥ 768px)
  lgGut: PropTypes.number, // spacing between columns in 'lg' screen-size (screen ≥ 992px)
  xlGut: PropTypes.number, // spacing between columns in 'xl' screen-size (screen ≥ 1200px)
  xxlGut: PropTypes.number, // spacing between columns in 'xxl' screen-size (screen ≥ 1600px)
  wrap: PropTypes.bool //auto wrap line
};

const defaultProps = {
  vAlign: 'top',
  hAlign: 'start',
  gutter: 0,
  wrap: true
};

const AppRow = (props) => {
  const { gutter, xsGut, smGut, mdGut, lgGut, xlGut, xxlGut } = props;
  const [rowGutter, setRowGutter] = useState();

  useEffect(() => {
    if (xsGut || smGut || mdGut || lgGut || xlGut || xxlGut) {

    } else if (gutter) {
      setRowGutter(gutter);
    }
  }, [gutter, xsGut, smGut, mdGut, lgGut, xlGut, xxlGut]);

  return (
    <Row {...fromBaseProps({ className: 'app-row' }, props)}
         align={props.vAlign} justify={props.hAlign} gutter={props.gutter} wrap={props.wrap}>
      {props.children}
    </Row>
  );
};

AppRow.propTypes = propTypes;

AppRow.defaultProps = defaultProps;

export default AppRow;