import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../../components/base';
import { Row } from 'antd';
import { isEmpty } from '../../utils/helpers';
import './AppRow.scss';

const propTypes = {
  ...baseProps,
  vAlign: PropTypes.oneOf(['top', 'middle', 'bottom']), // vertical alignment
  hAlign: PropTypes.oneOf(['start', 'center', 'end', 'space-around', 'space-between']), // horizontal alignment
  gutter: PropTypes.number, // vertical + horizontal spacing between columns (the same by using vGutter + hGutter)
  xsGut: PropTypes.number, // vertical + horizontal spacing between columns in 'xs' screen-size (screen < 576px)
  smGut: PropTypes.number, // vertical + horizontal spacing between columns in 'sm' screen-size (screen ≥ 576px)
  mdGut: PropTypes.number, // vertical + horizontal spacing between columns in 'md' screen-size (screen ≥ 768px)
  lgGut: PropTypes.number, // vertical + horizontal spacing between columns in 'lg' screen-size (screen ≥ 992px)
  xlGut: PropTypes.number, // vertical + horizontal spacing between columns in 'xl' screen-size (screen ≥ 1200px)
  xxlGut: PropTypes.number, // vertical + horizontal spacing between columns in 'xxl' screen-size (screen ≥ 1600px)

  vGutter: PropTypes.number, // vertical spacing between columns
  xsVGut: PropTypes.number, // vertical spacing between columns in 'xs' screen-size (screen < 576px)
  smVGut: PropTypes.number, // vertical spacing between columns in 'sm' screen-size (screen ≥ 576px)
  mdVGut: PropTypes.number, // vertical spacing between columns in 'md' screen-size (screen ≥ 768px)
  lgVGut: PropTypes.number, // vertical spacing between columns in 'lg' screen-size (screen ≥ 992px)
  xlVGut: PropTypes.number, // vertical spacing between columns in 'xl' screen-size (screen ≥ 1200px)
  xxlVGut: PropTypes.number, // vertical spacing between columns in 'xxl' screen-size (screen ≥ 1600px)

  hGutter: PropTypes.number, // horizontal spacing between columns
  xsHGut: PropTypes.number, // horizontal spacing between columns in 'xs' screen-size (screen < 576px)
  smHGut: PropTypes.number, // horizontal spacing between columns in 'sm' screen-size (screen ≥ 576px)
  mdHGut: PropTypes.number, // horizontal spacing between columns in 'md' screen-size (screen ≥ 768px)
  lgHGut: PropTypes.number, // horizontal spacing between columns in 'lg' screen-size (screen ≥ 992px)
  xlHGut: PropTypes.number, // horizontal spacing between columns in 'xl' screen-size (screen ≥ 1200px)
  xxlHGut: PropTypes.number, // horizontal spacing between columns in 'xxl' screen-size (screen ≥ 1600px)
  wrap: PropTypes.bool //auto wrap line,
};

const defaultProps = {
  vAlign: 'top',
  hAlign: 'start',
  gutter: 0,
  wrap: true
};

const initRowGutter = (gutter, xsGutter, smGutter, mdGutter, lgGutter, xlGutter, xxlGutter) => {
  let result = {};
  if (xsGutter) {
    result['xs'] = xsGutter;
  }
  if (smGutter) {
    result['sm'] = smGutter;
  }
  if (mdGutter) {
    result['md'] = mdGutter;
  }
  if (lgGutter) {
    result['lg'] = lgGutter;
  }
  if (xlGutter) {
    result['xl'] = xlGutter;
  }
  if (xxlGutter) {
    result['xxl'] = xxlGutter;
  }
  if (!isEmpty(result)) {
    return result;
  } else if (gutter) {
    return gutter;
  }
};

const AppRow = (props) => {
  const {
    gutter, xsGut, smGut, mdGut, lgGut, xlGut, xxlGut,
    vGutter, xsVGut, smVGut, mdVGut, lgVGut, xlVGut, xxlVGut,
    hGutter, xsHGut, smHGut, mdHGut, lgHGut, xlHGut, xxlHGut
  } = props;
  const [rowGutter, setRowGutter] = useState();

  useEffect(() => {
    let rowGutter = initRowGutter(gutter, xsGut, smGut, mdGut, lgGut, xlGut, xxlGut);
    let rowVGutter = initRowGutter(vGutter, xsVGut, smVGut, mdVGut, lgVGut, xlVGut, xxlVGut);
    let rowHGutter = initRowGutter(hGutter, xsHGut, smHGut, mdHGut, lgHGut, xlHGut, xxlHGut);
    if (isEmpty(rowGutter)) {
      rowGutter = gutter || 0;
    }
    if (isEmpty(rowVGutter)) {
      rowVGutter = vGutter || rowGutter;
    }
    if (isEmpty(rowHGutter)) {
      rowHGutter = hGutter || rowGutter;
    }
    setRowGutter([rowVGutter, rowHGutter])
  }, [gutter, xsGut, smGut, mdGut, lgGut, xlGut, xxlGut,
    vGutter, xsVGut, smVGut, mdVGut, lgVGut, xlVGut, xxlVGut,
    hGutter, xsHGut, smHGut, mdHGut, lgHGut, xlHGut, xxlHGut]);

  return (
    <Row {...fromBaseProps({ className: 'app-row' }, props)}
         align={props.vAlign} justify={props.hAlign} gutter={rowGutter} wrap={props.wrap}>
      {props.children}
    </Row>
  );
};

AppRow.propTypes = propTypes;

AppRow.defaultProps = defaultProps;

export default AppRow;