import React from 'react';
import AppNotification from '../../components/notification/AppNotification';
import AppContainer from '../../containers/container/AppContainer';
import AppGrid from '../../containers/grid/AppGrid';
import AppSpace from '../../containers/space/AppSpace';
import AppCard from '../../components/card/AppCard';
import AppTypography from '../../components/typography/AppTypography';
import AppDivider from '../../components/divider/AppDivider';
import AppInput from '../../components/input/AppInput';
import { Icons } from '../../assets/icons';
import './UiPreview.scss';

const { Row, Col } = AppGrid;
const { Title, Text, Link } = AppTypography;

const ROW_GUTTER = 24;
const ITEM_SPACE = 20;
const ROOT_TITLE_LEVEL = 2;
const MAX_TITLE_LEVEL = 5;

const LONG_DUMMY_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt " +
  "ut labore et dolore magna aliqua";

const DUMMY_PARAGRAPH = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt " +
  "ut labore et dolore magna aliqua.\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip " +
  "ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu " +
  "fugiat nulla pariatur. \nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt " +
  "mollit anim id est laborum";

const contentCard = (name, footer, content) => (
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

const getTitleLevel = (depth = 0) => {
  let level = ROOT_TITLE_LEVEL + depth;
  if (level > MAX_TITLE_LEVEL) {
    return MAX_TITLE_LEVEL;
  }
  return level;
};

const newGroup = (index, group, depth = 0) => (
  <div key={index} className="group-container">
    <Title className="group-title" level={getTitleLevel(depth)}>{group.title}</Title>
    {group.content}
    <div className="group-items-container">
      {
        group.items?.map((item, itemIndex) =>
          newGroup(itemIndex, item, depth + 1))
      }
    </div>
  </div>
);

const groups = [
  {
    title: 'I. App Typography',
    items: [
      {
        title: '1. App Title',
        content: (
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
                      (Ellipsis) {LONG_DUMMY_TEXT}
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
        )
      },
      {
        title: '2. App Text',
        content: (
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
                      (Ellipsis) {LONG_DUMMY_TEXT}
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
        )
      },
      {
        title: '3. App Link',
        content: (
          <Row gutter={ROW_GUTTER} vStretch={true}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
              {
                contentCard('Type', 'All component type',
                  <>
                    <Link href="https://reactjs.org" target="_blank">
                      (Default) Visit React Homepage
                    </Link>
                    <Link href="https://reactjs.org" target="_blank" type="secondary">
                      (Secondary) Visit React Homepage
                    </Link>
                    <Link href="https://reactjs.org" target="_blank" type="success">
                      (Success) Visit React Homepage
                    </Link>
                    <Link href="https://reactjs.org" target="_blank" type="warning">
                      (Warning) Visit React Homepage
                    </Link>
                    <Link href="https://reactjs.org" target="_blank" type="danger">
                      (Danger) Visit React Homepage
                    </Link>
                  </>
                )
              }
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
              {
                contentCard('Text Style', 'All supported component text style',
                  <>
                    <Link href="https://reactjs.org" target="_blank" level={5} bold={true}>
                      (Bold) Visit React Homepage
                    </Link>
                    <Link href="https://reactjs.org" target="_blank" level={5} italic={true}>
                      (Italic) Visit React Homepage
                    </Link>
                    <Link href="https://reactjs.org" target="_blank" level={5} underline={true}>
                      (Underline) Visit React Homepage
                    </Link>
                    <Link href="https://reactjs.org" target="_blank" level={5} disabled={true}>
                      (Disabled) Visit React Homepage
                    </Link>
                  </>
                )
              }
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
              {
                contentCard('Other Options', 'All other options of this component',
                  <>
                    <Link href="https://reactjs.org" target="_blank" ellipsis={true}>
                      (Ellipsis) {LONG_DUMMY_TEXT}
                    </Link>
                    <Link href="https://reactjs.org" target="_blank" copyable={true}>
                      (Copyable) Consectetur adipiscing elit
                    </Link>
                    <Link href="https://reactjs.org" target="_blank" level={5} strikethrough={true}>
                      (Strike Through) Consectetur adipiscing elit
                    </Link>
                    <Link href="https://reactjs.org" target="_blank" level={5} highlight={true}>
                      (Highlight) Consectetur adipiscing elit
                    </Link>
                    <Link href="https://reactjs.org" target="_blank"
                          onClick={() => AppNotification.success('Click Message', 'Text clicked')}>
                      (Click listener) Consectetur adipiscing elit
                    </Link>
                  </>
                )
              }
            </Col>
          </Row>
        )
      }
    ]
  },
  {
    title: 'II. App Input',
    items: [
      {
        title: '1. App Text Input',
        content: (
          <Row gutter={ROW_GUTTER} vStretch={true}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
              {
                contentCard('Basic usage', 'Basic use of text input',
                  <AppSpace size={ITEM_SPACE}>
                    <AppInput.Text/>
                    <AppInput.Text placeholder="(Placeholder) Enter text"/>
                    <AppInput.Text value="(Value) Lorem ipsum dolor sit amet"
                                   placeholder="Enter text"/>
                    <AppInput.Text defaultValue="(Default Value) Lorem ipsum dolor sit amet"
                                   placeholder="Enter text"/>
                  </AppSpace>
                )
              }
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
              {
                contentCard('Other Options', 'All other options of this component',
                  <AppSpace size={ITEM_SPACE}>
                    <AppInput.Text placeholder="Text input with icon" icon={<Icons.UserOutlined/>}/>
                    <AppInput.Text placeholder="Text input with clear button"
                                  defaultValue="Clear this text"
                                  allowClear={true}/>
                    <AppInput.Text placeholder="Text input with max length = 10"
                                  maxLength={10}/>
                    <AppInput.Text placeholder="Disabled text input" disabled={true}/>
                    <AppInput.Text placeholder="Text input with onChange (Check console)"
                                  onChange={(event) => console.log('Text input with onChange:', event.target.value)}/>
                    <AppInput.Text placeholder="Borderless text input" borderless={true}/>
                  </AppSpace>
                )
              }
            </Col>
          </Row>
        )
      },
      {
        title: '2. App Password Input',
        content: (
          <Row gutter={ROW_GUTTER} vStretch={true}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
              {
                contentCard('Basic usage', 'Basic use of password input',
                  <AppSpace size={ITEM_SPACE}>
                    <AppInput.Password/>
                    <AppInput.Password placeholder="(Placeholder) Enter password"/>
                    <AppInput.Password placeholder="Without show password button" allowShow={false}/>
                    <AppInput.Password value="Lorem ipsum" placeholder="Enter password"/>
                    <AppInput.Password defaultValue="Lorem ipsum"/>
                  </AppSpace>
                )
              }
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
              {
                contentCard('Other Options', 'All other options of this component',
                  <AppSpace size={ITEM_SPACE}>
                    <AppInput.Password placeholder="Password with icon" icon={<Icons.KeyOutlined/>}/>
                    <AppInput.Password placeholder="Password with clear button"
                                   defaultValue="Lorem ipsum"
                                   allowClear={true}/>
                    <AppInput.Password placeholder="Password with max length = 10"
                                   maxLength={10}/>
                    <AppInput.Password placeholder="Disabled password" disabled={true}/>
                    <AppInput.Password placeholder="Password with onChange (Check console)"
                                   onChange={(event) => console.log('Password with onChange:', event.target.value)}/>
                    <AppInput.Password placeholder="Borderless password" borderless={true}/>
                  </AppSpace>
                )
              }
            </Col>
          </Row>
        )
      },
      {
        title: '3. App Text Area Input',
        content: (
          <Row gutter={ROW_GUTTER} vStretch={true}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
              {
                contentCard('Basic usage', 'Basic use of text area input',
                  <AppSpace size={ITEM_SPACE}>
                    <AppInput.TextArea/>
                    <AppInput.TextArea placeholder="(Placeholder) Enter multi-line text"/>
                    <AppInput.TextArea value={`(Value) ${DUMMY_PARAGRAPH}`}
                                       placeholder="Enter multi-line text"/>
                    <AppInput.TextArea value={undefined} defaultValue={`(Default Value) ${DUMMY_PARAGRAPH}`}
                                       placeholder="Enter multi-line text"/>
                    <AppInput.TextArea value={undefined} defaultValue={DUMMY_PARAGRAPH}
                                       placeholder="Enter multi-line text, fixed 4 line"/>
                  </AppSpace>
                )
              }
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
              {
                contentCard('Rows Options', 'All rows option for text area input',
                  <AppSpace size={ITEM_SPACE}>
                    <AppInput.TextArea placeholder="Fixed 3 rows text area" rows={3}/>
                    <AppInput.TextArea placeholder="Min 3 rows text area" minRows={3}/>
                    <AppInput.TextArea placeholder="Max 5 rows text area" maxRows={5}/>
                    <AppInput.TextArea placeholder="(Min = 3, Max = 5) rows text area" minRows={3} maxRows={5}/>
                    <AppInput.TextArea placeholder="Auto adjust rows text area" autoRows={true}/>
                  </AppSpace>
                )
              }
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
              {
                contentCard('Other Options', 'All other options of this component',
                  <AppSpace size={ITEM_SPACE}>
                    <AppInput.TextArea placeholder="Text area with clear button"
                                       defaultValue={DUMMY_PARAGRAPH}
                                       allowClear={true}/>
                    <AppInput.TextArea placeholder="Text area with max length = 10"
                                       maxLength={10}/>
                    <AppInput.TextArea placeholder="Disabled text area" disabled={true}/>
                    <AppInput.TextArea placeholder="Text area with onChange (Check console)"
                                       onChange={(event) => console.log('Text area with onChange:', event.target.value)}/>
                    <AppInput.TextArea placeholder="Borderless text area" borderless={true}/>
                  </AppSpace>
                )
              }
            </Col>
          </Row>
        )
      },
      {
        title: '4. App Number Input',
        content: (
          <Row gutter={ROW_GUTTER} vStretch={true}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
              {
                contentCard('Basic usage', 'Basic use of number input',
                  <AppSpace size={ITEM_SPACE}>
                    <AppInput.Number fullWidth={true}/>
                    <AppInput.Number placeholder="Enter number"/>
                    <AppInput.Number value={12345}
                                     placeholder="Enter number"/>
                    <AppInput.Number defaultValue={12345}
                                     placeholder="Enter number"/>
                    <AppInput.Number defaultValue={5}
                                     max={10}
                                     min={0}
                                     placeholder="Enter number (min = 0, max = 10)"/>
                  </AppSpace>
                )
              }
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
              {
                contentCard('Other Options', 'All other options of this component',
                  <AppSpace size={ITEM_SPACE}>
                    <AppInput.Number placeholder="Number input with icon" icon={<Icons.UserOutlined/>}/>
                    <AppInput.Number placeholder="Number input with clear button"
                                     defaultValue="12345"/>
                    <AppInput.Number placeholder="Disabled text input" disabled={true}/>
                    <AppInput.Number placeholder="Number input with onChange (Check console)"
                                     onChange={(event) => console.log('Text input with onChange:', event.target.value)}/>
                    <AppInput.Number placeholder="Borderless text input" borderless={true}/>
                  </AppSpace>
                )
              }
            </Col>
          </Row>
        )
      },
    ]
  }
];

//=================================================== Typography =====================================================//

const UiPreview = (props) => {
  return (
    <div className="ui-preview-page page-padding">
      <AppContainer>
        {
          groups.map((group, groupIndex) => newGroup(groupIndex, group))
        }
      </AppContainer>
    </div>
  );
};

export default UiPreview;