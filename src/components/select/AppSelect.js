import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { baseProps, fromBaseProps } from '../base';
import { useAppFormItem } from '../form/AppFormItem';
import { Select } from 'antd';
import './AppSelect.scss';

const { Option, OptionGroup } = Select;

const SortRules = {
  ASC: (value1, value2) => value1.toString().toLowerCase().localeCompare(value2.toString().toLowerCase()),
  DESC: (value1, value2) => value2.toString().toLowerCase().localeCompare(value1.toString().toLowerCase()),
};

const FilterRules = {
  MATCH_ANY: (input, value) => value && value.toString().indexOf(input) >= 0,
  MATCH_ANY_IGNORE_CASE: (input, value) => value && value.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0,
  MATCH_START: (input, value) => value && value.toString().startsWith(input),
  MATCH_START_IGNORE_CASE: (input, value) => value && value.toString().toLowerCase().startsWith(input.toLowerCase())
};

const propTypes = {
  ...baseProps,
  mode: PropTypes.oneOf(['multiple', 'tags']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  firstSelected: PropTypes.bool,
  allowClear: PropTypes.bool,
  disabled: PropTypes.bool,
  fullValueOnChange: PropTypes.bool,
  borderless: PropTypes.bool,
  showArrow: PropTypes.bool,
  displayOptionProp: PropTypes.string,
  maxTagCount: PropTypes.number,
  maxTagTextLength: PropTypes.number,
  showSearch: PropTypes.bool,
  filterOptionProp: PropTypes.string,
  filterMatchStart: PropTypes.bool,
  filterMatchCase: PropTypes.bool,
  filterSortType: PropTypes.oneOf(Object.keys(SortRules).map((key) => key.toLowerCase())),
  onFilter: PropTypes.func, // (input, option, optionProp) => {}
  onFilterSort: PropTypes.func, // (option1, option2) => {}
};

const defaultProps = {
  showArrow: true,
  showSearch: false
};

const getOptionValue = (option, filterOptionProp) => {
  if (option[filterOptionProp]) {
    return option[filterOptionProp];
  }
  return option.value;
};

const getInputValue = (value) => {
  return value;
}

const AppSelect = (props) => {
  const {
    filterOptionProp, filterMatchStart, filterMatchCase,
    onFilter, filterSortType, onFilterSort
  } = props;
  const [onChange, disabled] = useAppFormItem(props.disabled, props.onChange, getInputValue);

  const filterOption = useMemo(() => {
    let filterFunc;
    if (onFilter) {
      filterFunc = onFilter;
    } else {
      if (filterMatchStart) {
        filterFunc = filterMatchCase? FilterRules.MATCH_START: FilterRules.MATCH_START_IGNORE_CASE;
      } else {
        filterFunc = filterMatchCase? FilterRules.MATCH_ANY : FilterRules.MATCH_ANY_IGNORE_CASE;
      }
    }
    if (filterFunc) {
      return (input, option) => {
        return filterFunc(
          input,
          getOptionValue(option, filterOptionProp)
        );
      }
    }
  }, [filterOptionProp, filterMatchStart, filterMatchCase, onFilter]);

  const filterSort = useMemo(() => {
    if (onFilterSort) {
      return onFilterSort;
    }
    if (filterSortType) {
      let sortRule = SortRules[filterSortType.toUpperCase()];
      if (sortRule) {
        return (option1, option2) => sortRule(
          getOptionValue(option1, filterOptionProp),
          getOptionValue(option2, filterOptionProp)
        );
      }
    }
  }, [filterOptionProp, filterSortType, onFilterSort]);

  return (
    <Select {...fromBaseProps({className: 'app-select'}, props)}
            disabled={disabled} placeholder={props.placeholder} mode={props.mode}
            value={props.value} defaultValue={props.defaultValue} onChange={onChange}
            defaultActiveFirstOption={props.firstSelected}
            labelInValue={props.fullValueOnChange} allowClear={props.allowClear}
            bordered={!props.borderless} showArrow={props.showArrow}
            maxTagCount={props.maxTagCount} maxTagTextLength={props.maxTagTextLength}
            optionLabelProp={props.displayLabelOptionProp}
            showSearch={props.showSearch} optionFilterProp={props.filterOptionProp}
            filterOption={filterOption} filterSort={filterSort}>
      {props.children}
    </Select>
  )
};

AppSelect.Option = Option;
AppSelect.OptionGroup = OptionGroup;

AppSelect.propTypes = propTypes;

AppSelect.defaultProps = defaultProps;

export default AppSelect;