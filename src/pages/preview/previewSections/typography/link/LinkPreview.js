import React from 'react';
import AppGrid from '../../../../../containers/grid/AppGrid';
import UiPreviewCard from '../../../components/uiPreviewCard/UiPreviewCard';
import AppTypography from '../../../../../components/typography/AppTypography';
import AppNotification from '../../../../../components/notification/AppNotification';

const { Row, Col } = AppGrid;
const { Link } = AppTypography;

const ROW_GUTTER = 24;
const DUMMY_TEXT_1 = "Visit React Homepage";
const DUMMY_TEXT_2 = "visit React Homepage";
const DUMMY_TEXT_3 = "React Homepage";
const DUMMY_TEXT_4 = "React makes it painless to create interactive UIs. Design simple views for each state in " +
  "your application, and React will efficiently update and render just the right components when your data changes";


const LinkPreview = (props) => {
  return (
    <Row gutter={ROW_GUTTER} vStretch={true}>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
        <UiPreviewCard name="Type" description="All component type">
          <>
            <Link href="https://reactjs.org" target="_blank">
              (Default) {DUMMY_TEXT_1}
            </Link>
            <Link href="https://reactjs.org" target="_blank" type="secondary">
              (Secondary) {DUMMY_TEXT_1}
            </Link>
            <Link href="https://reactjs.org" target="_blank" type="success">
              (Success) {DUMMY_TEXT_1}
            </Link>
            <Link href="https://reactjs.org" target="_blank" type="warning">
              (Warning) {DUMMY_TEXT_1}
            </Link>
            <Link href="https://reactjs.org" target="_blank" type="danger">
              (Danger) {DUMMY_TEXT_1}
            </Link>
          </>
        </UiPreviewCard>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
        <UiPreviewCard name="Text Style" description="All supported component text style">
          <>
            <Link href="https://reactjs.org" target="_blank" level={5} bold={true}>
              (Bold) {DUMMY_TEXT_1}
            </Link>
            <Link href="https://reactjs.org" target="_blank" level={5} italic={true}>
              (Italic) {DUMMY_TEXT_1}
            </Link>
            <Link href="https://reactjs.org" target="_blank" level={5} underline={true}>
              (Underline) {DUMMY_TEXT_1}
            </Link>
            <Link href="https://reactjs.org" target="_blank" level={5} disabled={true}>
              (Disabled) {DUMMY_TEXT_1}
            </Link>
          </>
        </UiPreviewCard>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
        <UiPreviewCard name="Other Options" description="All other options of this component">
          <>
            <Link href="https://reactjs.org" target="_blank" firstCap={true}>
              {DUMMY_TEXT_2} (First Caps)
            </Link>
            <Link href="https://reactjs.org" target="_blank" allCaps={true}>
              (All Caps) {DUMMY_TEXT_1}
            </Link>
            <Link href="https://reactjs.org" target="_blank" ellipsis={true}>
              (Ellipsis) {DUMMY_TEXT_4}
            </Link>
            <Link href="https://reactjs.org" target="_blank" copyable={true}>
              (Copyable) {DUMMY_TEXT_1}
            </Link>
            <Link href="https://reactjs.org" target="_blank" level={5} strikethrough={true}>
              (Strike Through) {DUMMY_TEXT_1}
            </Link>
            <Link href="https://reactjs.org" target="_blank" level={5} highlight={true}>
              (Highlight) {DUMMY_TEXT_1}
            </Link>
            <Link href="https://reactjs.org" target="_blank"
                  onClick={() => AppNotification.success('Click Message', 'Text clicked')}>
              (Click listener) {DUMMY_TEXT_1}
            </Link>
            <Link href="https://reactjs.org" textAlign="start">
              (Text align start) {DUMMY_TEXT_3}
            </Link>
            <Link href="https://reactjs.org" textAlign="center">
              (Text align center) {DUMMY_TEXT_3}
            </Link>
            <Link href="https://reactjs.org" textAlign="end">
              (Text align end) {DUMMY_TEXT_3}
            </Link>
          </>
        </UiPreviewCard>
      </Col>
    </Row>
  );
};

export default LinkPreview;