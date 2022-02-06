import PropTypes from 'prop-types';
import classNames from 'classnames';

export const baseProps = {
  className: PropTypes.string,
  style: PropTypes.object,
  wFull: PropTypes.bool,
  hFull: PropTypes.bool,
  whFull: PropTypes.bool,
  theme: PropTypes.object
};

export const baseClassNames = (props) => ({
  'w-full': props.wFull,
  'h-full': props.hFull,
  'wh-full': props.whFull
});

export const fromBaseProps = (startedValues = {}, props) => {
  return {
    className: classNames({
        ...baseClassNames(props),
        [startedValues.className]: startedValues.className,
        [props.className]: props.className
      }
    ),
    style: {
      ...startedValues.style,
      ...props.style
    }
  }
};