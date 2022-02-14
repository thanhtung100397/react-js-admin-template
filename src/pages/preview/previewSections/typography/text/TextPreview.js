import React from 'react';
import AppGrid from '../../../../../containers/grid/AppGrid';
import UiPreviewCard from '../../../components/uiPreviewCard/UiPreviewCard';
import AppTypography from '../../../../../components/typography/AppTypography';
import AppNotification from '../../../../../components/notification/AppNotification';

const { Row, Col } = AppGrid;
const { Text } = AppTypography;

const ROW_GUTTER = 24;
const DUMMY_TEXT_1 = "Lorem ipsum dolor sit amet";
const DUMMY_TEXT_2 = "lorem ipsum dolor sit amet";
const DUMMY_TEXT_3 = "Lorem ipsum";
const DUMMY_TEXT_4 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt " +
  "ut labore et dolore magna aliqua";

const TextPreview = (props) => {
  return (
    <Row gutter={ROW_GUTTER} vStretch={true}>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
        <UiPreviewCard name="Type" description="All component type">
          <>
            <Text>
              (Default) {DUMMY_TEXT_1}
            </Text>
            <Text type="secondary">
              (Secondary) {DUMMY_TEXT_1}
            </Text>
            <Text type="success">
              (Success) {DUMMY_TEXT_1}
            </Text>
            <Text type="warning">
              (Warning) {DUMMY_TEXT_1}
            </Text>
            <Text type="danger">
              (Danger) {DUMMY_TEXT_1}
            </Text>
          </>
        </UiPreviewCard>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
        <UiPreviewCard name="Text Style" description="All supported component text style">
          <>
            <Text bold={true}>
              (Bold) {DUMMY_TEXT_1}
            </Text>
            <Text italic={true}>
              (Italic) {DUMMY_TEXT_1}
            </Text>
            <Text underline={true}>
              (Underline) {DUMMY_TEXT_1}
            </Text>
            <Text disabled={true}>
              (Disabled) {DUMMY_TEXT_1}
            </Text>
          </>
        </UiPreviewCard>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
        <UiPreviewCard name="Other Options" description="All other options of this component">
          <>
            <Text firstCap={true}>
              {DUMMY_TEXT_2} (First Caps)
            </Text>
            <Text allCaps={true}>
              (All Caps) {DUMMY_TEXT_1}
            </Text>
            <Text ellipsis={true}>
              (Ellipsis) {DUMMY_TEXT_4}
            </Text>
            <Text copyable={true}>
              (Copyable) {DUMMY_TEXT_1}
            </Text>
            <Text strikethrough={true}>
              (Strike Through) {DUMMY_TEXT_1}
            </Text>
            <Text highlight={true}>
              (Highlight) {DUMMY_TEXT_1}
            </Text>
            <Text onClick={() => AppNotification.success('Click Message', 'Text clicked')}>
              (Click listener) {DUMMY_TEXT_1}
            </Text>
            <Text textAlign="start">
              (Text align start) {DUMMY_TEXT_3}
            </Text>
            <Text textAlign="center">
              (Text align center) {DUMMY_TEXT_3}
            </Text>
            <Text textAlign="end">
              (Text align end) {DUMMY_TEXT_3}
            </Text>
          </>
        </UiPreviewCard>
      </Col>
    </Row>
  );
};

export default TextPreview;