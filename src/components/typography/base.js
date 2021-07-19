import PropTypes from 'prop-types';
import classNames from 'classnames';
import { fromBaseProps } from '../base';
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
  onClick: PropTypes.func,
  firstCap: PropTypes.bool, // display first character uppercase
  allCaps: PropTypes.bool // display all characters uppercase
};

export const typographyBaseClassNames = (props) => ({
  'all-caps': props.allCaps,
  'first-caps': props.firstCap
});

const italicValue = (italic) => { // ant design has bug about Typography italic prop
  if (TypeChecker.isBoolean(italic)) {
    return italic.toString();
  }
};

export const fromTypographyBaseProps = (startedValues = {}, props) => ({
  ...fromBaseProps({
    className: classNames({
      ...typographyBaseClassNames(props),
      [startedValues.className]: startedValues.className
    }),
  }, props),
  strong: props.bold,
  italic: italicValue(props.italic),
  underline: props.underline,
  ellipsis: props.ellipsis,
  copyable: props.copyable,
  delete: props.strikethrough,
  mark: props.highlight,
  disabled: props.disabled,
  onClick: props.onClick
});