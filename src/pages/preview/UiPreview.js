import React from 'react';
import AppNotification from '../../components/notification/AppNotification';
import AppContainer from '../../containers/container/AppContainer';
import AppGrid from '../../containers/grid/AppGrid';
import AppCard from '../../components/card/AppCard';
import AppTypography from '../../components/typography/AppTypography';
import AppDivider from '../../components/divider/AppDivider';
import './UiPreview.scss';

const { Row, Col } = AppGrid;
const { Title, Text } = AppTypography;

const ROW_GUTTER = 24;

const contentCard = (name, footer, content) => {
  return (
    <AppCard noBodyPadding={true} whFull={true}>
      <div className="content-container">
        <div className="body">
          {content}
        </div>
        <AppDivider title={name}/>
        <div className="footer">
          {footer}
        </div>
      </div>
    </AppCard>
  );
};

const UiPreview = (props) => {
  return (
    <div className="ui-preview-page page-padding">
      <AppContainer>
        <Title className="group-title" level={3}>I. Typography</Title>
        <AppContainer className="content-padding">
          <div className="section-container">
            <Title className="section-title" level={4}>1. App Title</Title>
            <Row gutter={ROW_GUTTER} vStretch={true}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
                {
                  contentCard('Level', 'All component levels',
                    <>
                      <Title>
                        1. Lorem ipsum dolor sit amet
                      </Title>
                      <Title level={2}>
                        2. Lorem ipsum dolor sit amet
                      </Title>
                      <Title level={3}>
                        3. Lorem ipsum dolor sit amet
                      </Title>
                      <Title level={4}>
                        4. Lorem ipsum dolor sit amet
                      </Title>
                      <Title level={5}>
                        5. Lorem ipsum dolor sit amet
                      </Title>
                    </>
                  )
                }
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
                {
                  contentCard('Text Style', 'All supported component text style',
                    <>
                      <Title level={5} bold={true}>
                        (Bold) Lorem ipsum dolor sit amet
                      </Title>
                      <Title level={5} italic={true}>
                        (Italic) Lorem ipsum dolor sit amet
                      </Title>
                      <Title level={5} underline={true}>
                        (Underline) Lorem ipsum dolor sit amet
                      </Title>
                      <Title level={5} disabled={true}>
                        (Disabled) Lorem ipsum dolor sit amet
                      </Title>
                    </>
                  )
                }
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
                {
                  contentCard('Other Options', 'All other options of this component',
                    <>
                      <Title level={5} ellipsis={true}>
                        (Ellipsis) Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                      </Title>
                      <Title level={5} copyable={true}>
                        (Copyable) Lorem ipsum dolor sit amet
                      </Title>
                      <Title level={5} strikethrough={true}>
                        (Strike Through) Lorem ipsum dolor sit amet
                      </Title>
                      <Title level={5} highlight={true}>
                        (Highlight) Lorem ipsum dolor sit amet
                      </Title>
                      <Title level={5} onClick={() => AppNotification.success('Click Message', 'Title clicked')}>
                        (Click listener) Lorem ipsum dolor sit amet
                      </Title>
                    </>
                  )
                }
              </Col>
            </Row>
          </div>
          <div className="section-container">
            <Title className="section-title" level={4}>2. App Text</Title>
            <Row gutter={ROW_GUTTER} vStretch={true}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
                {
                  contentCard('Type', 'All component type',
                    <>
                      <Text>
                        (Default) Consectetur adipiscing elit
                      </Text>
                      <Text type="secondary">
                        (Secondary) Consectetur adipiscing elit
                      </Text>
                      <Text type="success">
                        (Success) Consectetur adipiscing elit
                      </Text>
                      <Text type="warning">
                        (Warning) Consectetur adipiscing elit
                      </Text>
                      <Text type="danger">
                        (Danger) Consectetur adipiscing elit
                      </Text>
                    </>
                  )
                }
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
                {
                  contentCard('Text Style', 'All supported component text style',
                    <>
                      <Text level={5} bold={true}>
                        (Bold) Consectetur adipiscing elit
                      </Text>
                      <Text level={5} italic={true}>
                        (Italic) Consectetur adipiscing elit
                      </Text>
                      <Text level={5} underline={true}>
                        (Underline) Consectetur adipiscing elit
                      </Text>
                      <Text level={5} disabled={true}>
                        (Disabled) Consectetur adipiscing elit
                      </Text>
                    </>
                  )
                }
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
                {
                  contentCard('Other Options', 'All other options of this component',
                    <>
                      <Text ellipsis={true}>
                        (Ellipsis) Consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                      </Text>
                      <Text copyable={true}>
                        (Copyable) Consectetur adipiscing elit
                      </Text>
                      <Text level={5} strikethrough={true}>
                        (Strike Through) Consectetur adipiscing elit
                      </Text>
                      <Text level={5} highlight={true}>
                        (Highlight) Consectetur adipiscing elit
                      </Text>
                      <Text onClick={() => AppNotification.success('Click Message', 'Text clicked')}>
                        (Click listener) Consectetur adipiscing elit
                      </Text>
                    </>
                  )
                }
              </Col>
            </Row>
          </div>
        </AppContainer>
      </AppContainer>
    </div>
  );
};

export default UiPreview;