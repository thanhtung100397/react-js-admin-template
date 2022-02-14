import React from 'react';
import { baseProps } from '../../../../components/base';
import PropTypes from 'prop-types';
import AppDivider from '../../../../components/divider/AppDivider';
import AppCard from '../../../../components/card/AppCard';
import './UiPreviewCard.scss';
import AppForm from '../../../../components/form/AppForm';

const propTypes = {
  ...baseProps,
  name: PropTypes.string,
  description: PropTypes.string,
};

const defaultProps = {
};

const UiPreviewCard = (props) => {
  return (
    <AppCard className="ui-preview-card" noBodyPadding={true} whFull={true}>
      <div className="content-container">
        <div className="body">
          {props.children}
        </div>
        <AppDivider title={props.name}/>
        <div className="footer">
          {props.description}
        </div>
      </div>
    </AppCard>
  );
};

AppForm.propTypes = propTypes;

AppForm.defaultProps = defaultProps;

export default UiPreviewCard;