import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../base';
import {
  SketchPicker, PhotoshopPicker, BlockPicker, AlphaPicker, HuePicker, TwitterPicker, GithubPicker, ChromePicker,
  CirclePicker, SliderPicker, CompactPicker, SwatchesPicker
} from 'react-color';
import { alphaToHex } from '../../utils/colorHelpers';
import './AppColorPicker.scss';

const propTypes = {
  ...baseProps,
  color: PropTypes.string,
  defaultColor: PropTypes.string,
  onColorChange: PropTypes.func, // ( { hex, rgb: {r, g, b, a} , hsl: {h, s, l, a} } ) => {}
  onColorChanged: PropTypes.func, // ( { hex, rgb: {r, g, b, a} , hsl: {h, s, l, a} } ) => {}
};

const defaultProps = {
  defaultColor: '#000000'
};

const AppColorPicker = (props, ColorPicker) => {
  const { color, defaultColor, onColorChange, onColorChanged, ...pickerProps } = props;

  const [pickColor, setPickColor] = useState();

  useEffect(() => {
    setPickColor(props.color || defaultColor);
  }, [props.color])

  const handleColorChange = useCallback((color) => {
    if (color.rgb.a !== 1) {
      color.hex = color.hex + alphaToHex(color.rgb.a)
    }
    setPickColor(color.hex);
    if (onColorChange) {
      onColorChange(color)
    }
  }, [onColorChange]);

  const handleColorChanged = useCallback((color) => {
    if (onColorChanged) {
      onColorChanged(color)
    }
  }, [onColorChanged]);

  return <ColorPicker {...fromBaseProps({ className: 'app-color-picker' }, props)}
                      {...pickerProps} color={pickColor}
                      onChange={handleColorChange}
                      onChangeComplete={handleColorChanged}/>;
};

AppColorPicker.propTypes = propTypes;

AppColorPicker.defaultProps = defaultProps;

AppColorPicker.Sketch = (props) => AppColorPicker(props, SketchPicker);
AppColorPicker.Photoshop = (props) => AppColorPicker(props, PhotoshopPicker);
AppColorPicker.Block = (props) => AppColorPicker(props, BlockPicker);
AppColorPicker.Github = (props) => AppColorPicker(props, GithubPicker);
AppColorPicker.Twitter = (props) => AppColorPicker(props, TwitterPicker);
AppColorPicker.Chrome = (props) => AppColorPicker(props, ChromePicker);
AppColorPicker.Alpha = (props) => AppColorPicker(props, AlphaPicker);
AppColorPicker.Hue = (props) => AppColorPicker(props, HuePicker);
AppColorPicker.Circle = (props) => AppColorPicker(props, CirclePicker);
AppColorPicker.Slider = (props) => AppColorPicker(props, SliderPicker);
AppColorPicker.Compact = (props) => AppColorPicker(props, CompactPicker);
AppColorPicker.Swatches = (props) => AppColorPicker(props, SwatchesPicker);

export default AppColorPicker;