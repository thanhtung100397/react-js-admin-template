import PropTypes from 'prop-types';
import { TypeChecker } from '../../utils/helpers';

export const typographyPropTypes = {
  bold: PropTypes.bool, // bold style
  italic: PropTypes.bool, // italic style
  underline: PropTypes.bool, // content underline style
  ellipsis: PropTypes.bool, // display ellipsis when text overflows
  copyable: PropTypes.bool, // whether content can be copyable
  strikethrough: PropTypes.bool, // strike through line style
  highlight: PropTypes.bool, // highlight style
  disabled: PropTypes.bool, // disabled content
  onClick: PropTypes.func
};

const italicValue = (italic) => { // ant design has bug about Typography italic prop
  if (TypeChecker.isBoolean(italic)) {
    return italic.toString();
  }
};

export const fromTypographyProps = (props) => {
  return {
    strong: props.bold,
    italic: italicValue(props.italic),
    underline: props.underline,
    ellipsis: props.ellipsis,
    copyable: props.copyable,
    delete: props.strikethrough,
    mark: props.highlight,
    disabled: props.disabled,
    onClick: props.onClick
  }
};