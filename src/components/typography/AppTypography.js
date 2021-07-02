import PropTypes  from 'prop-types';
import AppTitle from './title/AppTitle';
import AppText from './text/AppText';
import AppLink from './link/AppLink';

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

const AppTypography = {
  Title: AppTitle,
  Text: AppText,
  Link: AppLink
};

export default AppTypography;