import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../base';
import {
  SketchPicker, PhotoshopPicker, BlockPicker, AlphaPicker, HuePicker, TwitterPicker, GithubPicker, ChromePicker,
  CirclePicker, SliderPicker, CompactPicker, MaterialPicker, SwatchesPicker
} from 'react-color';
import { rgbaToHex } from '../../utils/colorHelpers';
import './AppColorPicker.scss';

export const ColorPickerMode = {
  SKETCH: (props) => <SketchPicker {...props}/>,
  PHOTOSHOP: (props) => <PhotoshopPicker {...props}/>,
  BLOCK: (props) => <BlockPicker {...props}/>,
  ALPHA: (props) => <AlphaPicker {...props}/>,
  HUE: (props) => <HuePicker {...props}/>,
  TWITTER: (props) => <TwitterPicker {...props}/>,
  GITHUB: (props) => <GithubPicker {...props}/>,
  CHROME: (props) => <ChromePicker {...props}/>,
  CIRCLE: (props) => <CirclePicker {...props}/>,
  SLIDER: (props) => <SliderPicker {...props}/>,
  COMPACT: (props) => <CompactPicker {...props}/>,
  MATERIAL: (props) => <MaterialPicker {...props}/>,
  SWATCHES: (props) => <SwatchesPicker {...props}/>,
};

export const DEFAULT_PICKER = ColorPickerMode.SKETCH;

const propTypes = {
  ...baseProps,
  mode: PropTypes.oneOf(Object.keys(ColorPickerMode).map(key => key.toLowerCase())),
  color: PropTypes.string,
  defaultColor: PropTypes.string,
  onColorChange: PropTypes.func, // ( { hex, rgb: {r, g, b, a} , hsl: {h, s, l, a} } ) => {}
  onColorChanged: PropTypes.func, // ( { hex, rgb: {r, g, b, a} , hsl: {h, s, l, a} } ) => {}
};

const defaultProps = {
  mode: 'sketch',
  defaultColor: '#000000'
};

const AppColorPicker = (props) => {
  const { mode, color, defaultColor, onColorChange, onColorChanged, ...pickerProps } = props;

  const [pickColor, setPickColor] = useState();

  useEffect(() => {
    setPickColor(props.color || defaultColor);
  }, [props.color])

  const handleColorChange = useCallback((color) => {
    color.hex = rgbaToHex(color.rgb);
    setPickColor(color.hex);
    if (onColorChange) {
      onColorChange(color)
    }
  }, [onColorChange]);

  const handleColorChanged = useCallback((color) => {
    color.hex = rgbaToHex(color.rgb);
    setPickColor(color.hex);
    if (onColorChanged) {
      onColorChanged(color)
    }
  }, [onColorChanged]);

  const ColorPicker = useMemo(() => {
    let colorPicker = ColorPickerMode[mode.toUpperCase()]
    if (!colorPicker) {
      colorPicker = DEFAULT_PICKER;
    }
    return colorPicker;
  }, [mode]);

  return <ColorPicker {...fromBaseProps({ className: 'app-color-picker' }, props)}
                      {...pickerProps} color={pickColor}
                      onChange={handleColorChange}
                      onChangeComplete={handleColorChanged}/>;
};

AppColorPicker.propTypes = propTypes;

AppColorPicker.defaultProps = defaultProps;

export default AppColorPicker;