import React from 'react';
import AppGrid from '../../../../../containers/grid/AppGrid';
import UiPreviewCard from '../../../components/uiPreviewCard/UiPreviewCard';
import AppTypography from '../../../../../components/typography/AppTypography';
import AppNotification from '../../../../../components/notification/AppNotification';

const { Row, Col } = AppGrid;
const { Title } = AppTypography;

const ROW_GUTTER = 24;
const DUMMY_TEXT_1 = "Lorem ipsum dolor sit amet";
const DUMMY_TEXT_2 = "lorem ipsum dolor sit amet";
const DUMMY_TEXT_3 = "Lorem ipsum";
const DUMMY_TEXT_4 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt " +
  "ut labore et dolore magna aliqua";

const TitlePreview = (props) => {
  return (
    <Row gutter={ROW_GUTTER} vStretch={true}>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
        <UiPreviewCard name="Level" description="All component levels">
          <>
            <Title>
              1. {DUMMY_TEXT_1}
            </Title>
            <Title level={2}>
              2. {DUMMY_TEXT_1}
            </Title>
            <Title level={3}>
              3. {DUMMY_TEXT_1}
            </Title>
            <Title level={4}>
              4. {DUMMY_TEXT_1}
            </Title>
            <Title level={5}>
              5. {DUMMY_TEXT_1}
            </Title>
          </>
        </UiPreviewCard>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
        <UiPreviewCard name="Text Style" description="All supported component text style">
          <>
            <Title level={5} bold={true}>
              (Bold) {DUMMY_TEXT_1}
            </Title>
            <Title level={5} italic={true}>
              (Italic) {DUMMY_TEXT_1}
            </Title>
            <Title level={5} underline={true}>
              (Underline) {DUMMY_TEXT_1}
            </Title>
            <Title level={5} disabled={true}>
              (Disabled) {DUMMY_TEXT_1}
            </Title>
          </>
        </UiPreviewCard>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
        <UiPreviewCard name="Other Options" description="All other options of this component">
          <>
            <Title level={5} firstCap={true}>
              {DUMMY_TEXT_2} (First Caps)
            </Title>
            <Title level={5} allCaps={true}>
              (All Caps) {DUMMY_TEXT_1}
            </Title>
            <Title level={5} ellipsis={true}>
              (Ellipsis) {DUMMY_TEXT_4}
            </Title>
            <Title level={5} copyable={true}>
              (Copyable) {DUMMY_TEXT_1}
            </Title>
            <Title level={5} strikethrough={true}>
              (Strike Through) {DUMMY_TEXT_1}
            </Title>
            <Title level={5} highlight={true}>
              (Highlight) {DUMMY_TEXT_1}
            </Title>
            <Title level={5} onClick={() => AppNotification.success('Click Message', 'Title clicked')}>
              (Click listener) {DUMMY_TEXT_1}
            </Title>
            <Title level={5} textAlign="start">
              (Text align start) {DUMMY_TEXT_3}
            </Title>
            <Title level={5} textAlign="center">
              (Text align center) {DUMMY_TEXT_3}
            </Title>
            <Title level={5} textAlign="end">
              (Text align end) {DUMMY_TEXT_3}
            </Title>
          </>
        </UiPreviewCard>
      </Col>
    </Row>
  )
};

export default TitlePreview;