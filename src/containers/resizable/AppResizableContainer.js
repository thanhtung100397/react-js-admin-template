import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../../components/base';
import { TypeChecker } from '../../utils/helpers';
import './AppResizableContainer.scss';

const propsType = {
  ...baseProps,
  onResize: PropTypes.func, // (nextWidth, nextHeight) => [newWidth : string | number, newHeight : string | number];
};

const defaultProps = {

};

const toDimension = (value) => {
  if (!value) {
    return;
  }
  if (TypeChecker.isNumber(value)) {
    return `${value}px`;
  }
  return value;
}

const AppResizableContainer = (props) => {
  const containerRef = useRef();

  // useLayoutEffect(() => {
  //   if (props.onResize) {
  //     const handleWindowResize = () => {
  //       if (!containerRef.current) {
  //         return;
  //       }
  //       const [newWidth, newHeight] = props.onResize(
  //         containerRef.current.clientWidth || 0, containerRef.current.clientHeight || 0
  //       ) || [];
  //       containerRef.current.style.width = toDimension(newWidth);
  //       containerRef.current.style.height = toDimension(newHeight);
  //     };
  //     handleWindowResize();
  //     window.addEventListener('resize', handleWindowResize);
  //     return () => {
  //       window.removeEventListener('resize', handleWindowResize);
  //     }
  //   }
  // }, [props.onResize]);

  return (
    <div {...fromBaseProps({ className: 'app-resizable-container' }, props)}
         ref={containerRef}>
      {props.children}
    </div>
  );
};

AppResizableContainer.propsType = propsType;

AppResizableContainer.defaultProps = defaultProps;

export default AppResizableContainer;