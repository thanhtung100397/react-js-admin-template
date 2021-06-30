import PropTypes from 'prop-types';
import classNames from 'classnames';

export const baseProps = {
  className: PropTypes.string,
  style: PropTypes.object
};

export const fromBaseProps = (startedValues = {}, props) => {
  return {
    className: classNames(
      {
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