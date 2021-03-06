import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { baseProps, fromBaseProps } from '../base';
import styled from 'styled-components';
import { Image } from 'antd';
import { images } from '../../assets/images';
import './AppImage.scss';

const ImageFit = {
  CONTAIN: 'contain',
  COVER: 'cover'
};

const propTypes = {
  ...baseProps,
  src: PropTypes.string,
  alt: PropTypes.string,
  placeholder: PropTypes.node,
  errorPlaceholder: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  enablePreview: PropTypes.bool,
  fallback: PropTypes.string,
  onLoad: PropTypes.func, // (event) => {}
  onError: PropTypes.func, // (event) => {}
  circle: PropTypes.bool,
  round: PropTypes.bool,
  bordered: PropTypes.bool,
  square: PropTypes.bool, // square image
  whRatio: PropTypes.number, // width:height aspect ratio
  imageFit: PropTypes.oneOf(Object.keys(ImageFit).map((key) => ImageFit[key])),
};

const defaultProps = {
  enablePreview: false,
  placeholder: images.img_placeholder,
  errorPlaceholder: images.img_error_placeholder,
  imageFit: ImageFit.COVER
};

const AppImage = (props) => {
  const [src, setSrc] = useState();
  const [showFallback, setShowFallback] = useState();
  const [enablePreview, setEnablePreview] = useState();

  useEffect(() => {
    setSrc(props.src);
  }, [props.src]);

  useEffect(() => {
    if (!props.src) {
      setEnablePreview(false);
    } else {
      setEnablePreview(props.enablePreview);
    }
  }, [props.src, props.enablePreview]);

  const onError = useCallback((event) => {
    if (!showFallback && props.fallback) {
      setSrc(props.fallback);
      setShowFallback(true);
    } else {
      setSrc(props.errorPlaceholder);
    }
    const errorCallback = props.onError;
    if (errorCallback) {
      errorCallback(event);
    }
  }, [props.fallback, props.errorPlaceholder, showFallback, props.onError]);

  const placeholder = useMemo(() => {
    return (
      <img src={props.placeholder} alt="placeholder" width={props.width} height={props.height}/>
    );
  }, [props.placeholder, props.width, props.height]);

  const className = useMemo(() =>
    classNames('app-image',
      {
        'circle-image': props.circle,
        'round-image': props.round,
        'bordered-image': props.bordered,
        'image-fit-cover': props.imageFit === ImageFit.COVER,
        'image-fit-contain': props.imageFit === ImageFit.CONTAIN,
        'no-image': !src,
        'square-image': props.square,
      }
    ), [props.circle, props.round, props.bordered, props.imageFit, props.square, src]);

  return (
    // due to className of ant design image not work as expected
    // need this div.app-image for customizing this component style

    // using props whRatio with '$' sign to disable React warning: React does not recognize prop
    <div {...fromBaseProps({ className: className }, props)}>
      <CustomImage src={src} alt={props.alt} placeholder={placeholder}
                   width={props.width} height={props.height}
                   onLoad={props.onLoad} onError={onError} preview={enablePreview}
                   $whRatio={props.whRatio}/>
    </div>
  )
};

AppImage.propTypes = propTypes;

AppImage.defaultProps = defaultProps;

const CustomImage = styled(Image)`
  .ant-image-img {
    aspect-ratio: ${props => props.whRatio}
  }
`;

export default AppImage;