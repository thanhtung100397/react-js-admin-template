import React from 'react';
import AppNotification from '../../components/notification/AppNotification';
import AppContainer from '../../containers/container/AppContainer';
import AppGrid from '../../containers/grid/AppGrid';
import AppSpace from '../../containers/space/AppSpace';
import AppCard from '../../components/card/AppCard';
import AppTypography from '../../components/typography/AppTypography';
import AppDivider from '../../components/divider/AppDivider';
import AppInput from '../../components/input/AppInput';
import AppSelect from '../../components/select/AppSelect';
import AppForm from '../../components/form/AppForm';
import AppButton from '../../components/button/AppButton';
import AppImage from '../../components/image/AppImage';
import AppAlert from '../../components/alert/AppAlert';
import AppMenu, { MenuItemType } from '../../components/menu/AppMenu';
import { Icons } from '../../assets/icons';
import { ValidationRule } from '../../constants/validationRules';
import { delay } from '../../utils/helpers';
import { toRomanNumber } from '../../utils/numberHelpers';
import './UiPreview.scss';

const { Row, Col } = AppGrid;
const { Title, Text, Link } = AppTypography;
const { Option } = AppSelect;

const ROW_GUTTER = 24;
const ITEM_SPACE = 20;
const TINY_ITEM_SPACE = 10;
const ROOT_TITLE_LEVEL = 2;
const MAX_TITLE_LEVEL = 5;

const APP_IMAGE_FIXED_SIZE = 156;
const APP_IMAGE_URL = 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg';
const APP_IMAGE_PLACEHOLDER_URL = `https://via.placeholder.com/${APP_IMAGE_FIXED_SIZE}`;
const APP_IMAGE_BROKEN_URL = 'https://foo.bar/image.png';
const APP_IMAGE_ERROR_PLACEHOLDER_URL = `https://via.placeholder.com/${APP_IMAGE_FIXED_SIZE}/FF0000/FFFFFF/?text=Broken`;
const APP_IMAGE_FALLBACK_URL = 'https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg';

const TINY_DUMMY_TEXT = "Lorem ipsum";

const SHORT_DUMMY_TEXT = "Lorem ipsum dolor sit amet";

const LONG_DUMMY_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt " +
  "ut labore et dolore magna aliqua";

const DUMMY_PARAGRAPH = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt " +
  "ut labore et dolore magna aliqua.\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip " +
  "ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu " +
  "fugiat nulla pariatur. \nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt " +
  "mollit anim id est laborum";

const DEMO_MENU = [
  {
    title: 'Sub menu 1',
    type: MenuItemType.SUB_MENU,
    icon: <Icons.UserOutlined/>,
    children: [
      {
        title: 'Menu item group 1.1',
        type: MenuItemType.ITEM_GROUP,
        children: [
          {
            title: 'Menu item 1.1.1',
            icon: <Icons.KeyOutlined/>,
            type: MenuItemType.ITEM,
          },
          {
            title: 'Menu item 1.1.2',
            icon: <Icons.NumberOutlined/>,
            type: MenuItemType.ITEM,
          }
        ]
      },
      {
        title: 'Menu item group 1.2',
        type: MenuItemType.ITEM_GROUP,
        children: [
          {
            title: 'Menu item 1.2.1',
            icon: <Icons.NumberOutlined/>,
            type: MenuItemType.ITEM,
          },
          {
            title: 'Menu item 1.2.2',
            icon: <Icons.KeyOutlined/>,
            type: MenuItemType.ITEM,
          }
        ]
      },
      {
        title: 'Menu item 1.3',
        icon: <Icons.GlobalOutlined/>,
        type: MenuItemType.ITEM,
      },
      {
        title: 'Menu item 1.4',
        icon: <Icons.NumberOutlined/>,
        type: MenuItemType.ITEM,
      }
    ]
  },
  {
    title: 'Sub menu 2',
    type: MenuItemType.SUB_MENU,
    icon: <Icons.GlobalOutlined/>,
    children: [
      {
        title: 'Menu item 2.1',
        icon: <Icons.KeyOutlined/>,
        type: MenuItemType.ITEM,
      },
      {
        title: 'Menu item 2.2',
        icon: <Icons.NumberOutlined/>,
        type: MenuItemType.ITEM,
      },
      {
        title: 'Sub menu 2.3',
        type: MenuItemType.SUB_MENU,
        icon: <Icons.UserOutlined/>,
        children: [
          {
            title: 'Menu item 2.3.1',
            icon: <Icons.GlobalOutlined/>,
            type: MenuItemType.ITEM,
          },
          {
            title: 'Menu item 2.3.2',
            icon: <Icons.KeyOutlined/>,
            type: MenuItemType.ITEM,
          }
        ]
      },
      {
        title: 'Sub menu 2.4',
        type: MenuItemType.SUB_MENU,
        icon: <Icons.UserOutlined/>,
        children: [
          {
            title: 'Menu item 2.4.1',
            icon: <Icons.NumberOutlined/>,
            type: MenuItemType.ITEM,
          },
          {
            title: 'Menu item 2.4.2',
            icon: <Icons.KeyOutlined/>,
            type: MenuItemType.ITEM,
          }
        ]
      }
    ]
  },
  {
    title: 'Menu item 3',
    type: MenuItemType.ITEM,
  },
  {
    title: 'Menu item 4',
    type: MenuItemType.ITEM,
  }
];

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

const getTitleNumbering = (depth, index) => {
  if (depth === 0) {
    return toRomanNumber(index + 1);
  }
  return index + 1;
};

const newGroup = (index, group, depth = 0) => (
  <div key={index} className="group-container">
    <Title className="group-title" level={getTitleLevel(depth)}>{getTitleNumbering(depth, index)}. {group.title}</Title>
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
    title: 'App Typography',
    items: [
      {
        title: 'App Title',
        content: (
          <Row gutter={ROW_GUTTER} vStretch={true}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
              {
                contentCard('Level', 'All component levels',
                  <>
                    <Title>
                      1. {SHORT_DUMMY_TEXT}
                    </Title>
                    <Title level={2}>
                      2. {SHORT_DUMMY_TEXT}
                    </Title>
                    <Title level={3}>
                      3. {SHORT_DUMMY_TEXT}
                    </Title>
                    <Title level={4}>
                      4. {SHORT_DUMMY_TEXT}
                    </Title>
                    <Title level={5}>
                      5. {SHORT_DUMMY_TEXT}
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
                      (Bold) {SHORT_DUMMY_TEXT}
                    </Title>
                    <Title level={5} italic={true}>
                      (Italic) {SHORT_DUMMY_TEXT}
                    </Title>
                    <Title level={5} underline={true}>
                      (Underline) {SHORT_DUMMY_TEXT}
                    </Title>
                    <Title level={5} disabled={true}>
                      (Disabled) {SHORT_DUMMY_TEXT}
                    </Title>
                  </>
                )
              }
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
              {
                contentCard('Other Options', 'All other options of this component',
                  <>
                    <Title level={5} firstCap={true}>
                      lorem ipsum dolor sit amet (First Caps)
                    </Title>
                    <Title level={5} allCaps={true}>
                      (All Caps) {SHORT_DUMMY_TEXT}
                    </Title>
                    <Title level={5} ellipsis={true}>
                      (Ellipsis) {LONG_DUMMY_TEXT}
                    </Title>
                    <Title level={5} copyable={true}>
                      (Copyable) {SHORT_DUMMY_TEXT}
                    </Title>
                    <Title level={5} strikethrough={true}>
                      (Strike Through) {SHORT_DUMMY_TEXT}
                    </Title>
                    <Title level={5} highlight={true}>
                      (Highlight) {SHORT_DUMMY_TEXT}
                    </Title>
                    <Title level={5} onClick={() => AppNotification.success('Click Message', 'Title clicked')}>
                      (Click listener) {SHORT_DUMMY_TEXT}
                    </Title>
                    <Title level={5} textAlign="start">
                      (Text align start) {TINY_DUMMY_TEXT}
                    </Title>
                    <Title level={5} textAlign="center">
                      (Text align center) {TINY_DUMMY_TEXT}
                    </Title>
                    <Title level={5} textAlign="end">
                      (Text align end) {TINY_DUMMY_TEXT}
                    </Title>
                  </>
                )
              }
            </Col>
          </Row>
        )
      },
      {
        title: 'App Text',
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
                    <Text bold={true}>
                      (Bold) Consectetur adipiscing elit
                    </Text>
                    <Text italic={true}>
                      (Italic) Consectetur adipiscing elit
                    </Text>
                    <Text underline={true}>
                      (Underline) Consectetur adipiscing elit
                    </Text>
                    <Text disabled={true}>
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
                    <Text firstCap={true}>
                      consectetur adipiscing elit (First Caps)
                    </Text>
                    <Text allCaps={true}>
                      (All Caps) Consectetur adipiscing elit
                    </Text>
                    <Text ellipsis={true}>
                      (Ellipsis) {LONG_DUMMY_TEXT}
                    </Text>
                    <Text copyable={true}>
                      (Copyable) Consectetur adipiscing elit
                    </Text>
                    <Text strikethrough={true}>
                      (Strike Through) Consectetur adipiscing elit
                    </Text>
                    <Text highlight={true}>
                      (Highlight) Consectetur adipiscing elit
                    </Text>
                    <Text onClick={() => AppNotification.success('Click Message', 'Text clicked')}>
                      (Click listener) Consectetur adipiscing elit
                    </Text>
                    <Text textAlign="start">
                      (Text align start) {TINY_DUMMY_TEXT}
                    </Text>
                    <Text textAlign="center">
                      (Text align center) {TINY_DUMMY_TEXT}
                    </Text>
                    <Text textAlign="end">
                      (Text align end) {TINY_DUMMY_TEXT}
                    </Text>
                  </>
                )
              }
            </Col>
          </Row>
        )
      },
      {
        title: 'App Link',
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
                    <Link href="https://reactjs.org" target="_blank" firstCap={true}>
                      consectetur adipiscing elit (First Caps)
                    </Link>
                    <Link href="https://reactjs.org" target="_blank" allCaps={true}>
                      (All Caps) Consectetur adipiscing elit
                    </Link>
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
                    <Link href="https://reactjs.org" textAlign="start">
                      (Text align start) {TINY_DUMMY_TEXT}
                    </Link>
                    <Link href="https://reactjs.org" textAlign="center">
                      (Text align center) {TINY_DUMMY_TEXT}
                    </Link>
                    <Link href="https://reactjs.org" textAlign="end">
                      (Text align end) {TINY_DUMMY_TEXT}
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
    title: 'App Input',
    items: [
      {
        title: 'App Text Input',
        content: (
          <Row gutter={ROW_GUTTER} vStretch={true}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
              {
                contentCard('Basic usage', 'Basic use of text input',
                  <AppSpace size={ITEM_SPACE}>
                    <AppInput.Text/>
                    <AppInput.Text placeholder="(Placeholder) Enter text"/>
                    <AppInput.Text value={`(Value) ${SHORT_DUMMY_TEXT}`}
                                   placeholder="Enter text"/>
                    <AppInput.Text defaultValue={`(Default Value) ${SHORT_DUMMY_TEXT}`}
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
        title: 'App Password Input',
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
        title: 'App Text Area Input',
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
        title: 'App Number Input',
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
  },
  {
    title: 'App Select',
    content: (
      <Row gutter={ROW_GUTTER} vStretch={true}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
          {
            contentCard('Basic usage', 'Basic use of text input',
              <AppSpace size={ITEM_SPACE}>
                <AppSelect>
                  <Option value={1}>Lorem</Option>
                  <Option value={2}>Ipsum</Option>
                  <Option value={3}>Dolor</Option>
                  <Option value={4}>Sit</Option>
                  <Option value={5}>Amet</Option>
                </AppSelect>
                <AppSelect placeholder="(Placeholder) Pick one">
                  <Option value={1}>Lorem</Option>
                  <Option value={2}>Ipsum</Option>
                  <Option value={3}>Dolor</Option>
                  <Option value={4}>Sit</Option>
                  <Option value={5}>Amet</Option>
                </AppSelect>
                <AppSelect placeholder="(Placeholder) Pick one"
                           defaultValue={1}>
                  <Option value={1}>Lorem</Option>
                  <Option value={2}>Ipsum</Option>
                  <Option value={3}>Dolor</Option>
                  <Option value={4}>Sit</Option>
                  <Option value={5}>Amet</Option>
                </AppSelect>
                <AppSelect placeholder="(Placeholder) Pick multiple"
                           mode="multiple">
                  <Option value={1}>Lorem</Option>
                  <Option value={2}>Ipsum</Option>
                  <Option value={3}>Dolor</Option>
                  <Option value={4}>Sit</Option>
                  <Option value={5}>Amet</Option>
                </AppSelect>
              </AppSpace>
            )
          }
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
          {
            contentCard('Tags Select', "Basic use of mode = 'tags'",
              <AppSpace size={ITEM_SPACE}>
                <AppSelect placeholder="(Placeholder) Pick or enter tags"
                           mode="tags">
                  <Option value="Lorem">Lorem</Option>
                  <Option value="Ipsum">Ipsum</Option>
                  <Option value="Dolor">Dolor</Option>
                  <Option value="Sit">Sit</Option>
                  <Option value="Amet">Amet</Option>
                </AppSelect>
                <AppSelect placeholder="(Placeholder) Pick or enter tags"
                           mode="tags" defaultValue={['Lorem', 'Ipsum']}>
                  <Option value="Lorem">Lorem</Option>
                  <Option value="Ipsum">Ipsum</Option>
                  <Option value="Dolor">Dolor</Option>
                  <Option value="Sit">Sit</Option>
                  <Option value="Amet">Amet</Option>
                </AppSelect>
                <AppSelect placeholder="(Placeholder) Pick or enter tags (max display = 3)"
                           mode="tags" maxTagCount={3}>
                  <Option value="Lorem">Lorem</Option>
                  <Option value="Ipsum">Ipsum</Option>
                  <Option value="Dolor">Dolor</Option>
                  <Option value="Sit">Sit</Option>
                  <Option value="Amet">Amet</Option>
                </AppSelect>
                <AppSelect placeholder="(Placeholder) Pick or enter tags (max tag text length= 10)"
                           mode="tags" maxTagTextLength={10}>
                  <Option value={SHORT_DUMMY_TEXT}>{SHORT_DUMMY_TEXT}</Option>
                  <Option value="Consectetur adipiscing elit">Consectetur adipiscing elit</Option>
                  <Option value="Sed do eiusmod tempor incididunt">Sed do eiusmod tempor incididunt</Option>
                  <Option value="Ut labore et dolore magna aliqua">Ut labore et dolore magna aliqua</Option>
                  <Option value="Ut enim ad minim veniam">Ut enim ad minim veniam</Option>
                </AppSelect>
              </AppSpace>
            )
          }
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
          {
            contentCard('Search Select', "Basic use of app select with supported filter",
              <AppSpace size={ITEM_SPACE}>
                <AppSelect placeholder="Pick or enter search keyword (by contain, match case)"
                           filterMatchCase={true} showSearch={true}>
                  <Option value="Lorem">Lorem</Option>
                  <Option value="Ipsum">Ipsum</Option>
                  <Option value="Dolor">Dolor</Option>
                  <Option value="Sit">Sit</Option>
                  <Option value="Amet">Amet</Option>
                </AppSelect>
                <AppSelect placeholder="Pick or enter search keyword (by contain, ignore case)"
                           showSearch={true}>
                  <Option value="Lorem">Lorem</Option>
                  <Option value="Ipsum">Ipsum</Option>
                  <Option value="Dolor">Dolor</Option>
                  <Option value="Sit">Sit</Option>
                  <Option value="Amet">Amet</Option>
                </AppSelect>
                <AppSelect placeholder="Pick or enter search keyword (by start, match case, result sort asc)"
                           showSearch={true} filterOptionProp="children"
                           filterMatchStart={true} filterMatchCase={true} filterSortType="asc">
                  <Option value={1}>Lorem</Option>
                  <Option value={7}>Lore</Option>
                  <Option value={8}>Lone</Option>
                  <Option value={2}>Ipsum</Option>
                  <Option value={3}>Dolor</Option>
                  <Option value={4}>Sit</Option>
                  <Option value={5}>Amet</Option>
                </AppSelect>
                <AppSelect placeholder="Pick or enter search keyword (by start, ignore case, result sort asc)"
                           showSearch={true} filterOptionProp="children"
                           filterMatchStart={true} filterSortType="asc">
                  <Option value={1}>Lorem</Option>
                  <Option value={7}>Lore</Option>
                  <Option value={8}>Lone</Option>
                  <Option value={2}>Ipsum</Option>
                  <Option value={3}>Dolor</Option>
                  <Option value={4}>Sit</Option>
                  <Option value={5}>Amet</Option>
                </AppSelect>
                <AppSelect placeholder="Pick or enter search keyword (filter label, by contain, match case)"
                           showSearch={true} filterMatchCase={true} filterOptionProp="children">
                  <Option value={1}>Lorem</Option>
                  <Option value={2}>Ipsum</Option>
                  <Option value={3}>Dolor</Option>
                  <Option value={4}>Sit</Option>
                  <Option value={5}>Amet</Option>
                </AppSelect>
              </AppSpace>
            )
          }
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
          {
            contentCard('Other Options', "All other options of this component",
              <AppSpace size={ITEM_SPACE}>
                <AppSelect icon={<Icons.UserOutlined/>}
                           placeholder="Select with icon">
                  <Option value={1}>Lorem</Option>
                  <Option value={2}>Ipsum</Option>
                  <Option value={3}>Dolor</Option>
                  <Option value={4}>Sit</Option>
                  <Option value={5}>Amet</Option>
                </AppSelect>
                <AppSelect mode="multiple" icon={<Icons.UserOutlined/>}
                           placeholder="Multi-Select with icon">
                  <Option value={1}>Lorem</Option>
                  <Option value={2}>Ipsum</Option>
                  <Option value={3}>Dolor</Option>
                  <Option value={4}>Sit</Option>
                  <Option value={5}>Amet</Option>
                </AppSelect>
                <AppSelect placeholder="Custom display label"
                           displayOptionProp="label">
                  <Option value={1} label="One">1</Option>
                  <Option value={2} label="Two">2</Option>
                  <Option value={3} label="Three">3</Option>
                  <Option value={4} label="Four">4</Option>
                  <Option value={5} label="Five">5</Option>
                </AppSelect>
                <AppSelect allowClear={true} placeholder="Select with clear button">
                  <Option value={1}>Lorem</Option>
                  <Option value={2}>Ipsum</Option>
                  <Option value={3}>Dolor</Option>
                  <Option value={4}>Sit</Option>
                  <Option value={5}>Amet</Option>
                </AppSelect>
                <AppSelect disabled={true} placeholder="Select disabled">
                  <Option value={1}>Lorem</Option>
                  <Option value={2}>Ipsum</Option>
                  <Option value={3}>Dolor</Option>
                  <Option value={4}>Sit</Option>
                  <Option value={5}>Amet</Option>
                </AppSelect>
                <AppSelect onChange={(value) => console.log('Select with onChange:', value)}
                           placeholder="Select with onChange (check console)">
                  <Option value={1}>Lorem</Option>
                  <Option value={2}>Ipsum</Option>
                  <Option value={3}>Dolor</Option>
                  <Option value={4}>Sit</Option>
                  <Option value={5}>Amet</Option>
                </AppSelect>
                <AppSelect fullValueOnChange={true}
                           onChange={(value) => console.log('Select with onChange full value:', value)}
                           placeholder="Select with onChange full value (check console)">
                  <Option value={1}>Lorem</Option>
                  <Option value={2}>Ipsum</Option>
                  <Option value={3}>Dolor</Option>
                  <Option value={4}>Sit</Option>
                  <Option value={5}>Amet</Option>
                </AppSelect>
                <AppSelect borderless={true} showArrow={false}
                           placeholder="Select borderless">
                  <Option value={1}>Lorem</Option>
                  <Option value={2}>Ipsum</Option>
                  <Option value={3}>Dolor</Option>
                  <Option value={4}>Sit</Option>
                  <Option value={5}>Amet</Option>
                </AppSelect>
              </AppSpace>
            )
          }
        </Col>
      </Row>
    )
  },
  {
    title: 'App Form',
    content: (
      <Row gutter={ROW_GUTTER} vStretch={true}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}
             flexContainer={true} rowGut={ROW_GUTTER}>
          <Row>
            <Col span={24}>
              {
                contentCard('Basic usage', 'Basic use of form', (
                  <AppForm onSubmit={(data) => AppNotification.success('FORM SUBMIT',
                    `Hi, ${data.userInfo?.lastName} ${data.userInfo?.firstName}, age: ${data.userInfo?.age}`)}>
                    <AppSpace className="w-full" size={ITEM_SPACE}>
                      <Row>
                        <Col span={12} sidePadding={true}>
                          <AppForm.Item name="userInfo.firstName" label="Firstname" labelCol={{span: 8}}
                                        inputCol={{span: 16}}>
                            <AppInput.Text placeholder="Enter your firstname" allowClear={true}/>
                          </AppForm.Item>
                        </Col>
                        <Col span={12} sidePadding={true}>
                          <AppForm.Item name="userInfo.lastName" label="Lastname" labelCol={{span: 8}}
                                        inputCol={{span: 16}}>
                            <AppInput.Text placeholder="Enter your lastname" allowClear={true}/>
                          </AppForm.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} sidePadding={true}>
                          <AppForm.Item name="userInfo.age" label="Age" labelCol={{span: 4}} inputCol={{span: 20}}>
                            <AppInput.Number placeholder="Enter your age" allowClear={true}/>
                          </AppForm.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={0} sm={4} md={4} lg={4} xl={4} xxl={4} sidePadding={true}/>
                        <Col xs={24} sm={20} md={20} lg={20} xl={20} xxl={20} sidePadding={true}>
                          <AppButton type="primary" htmlType="submit">Submit</AppButton>
                        </Col>
                      </Row>
                    </AppSpace>
                  </AppForm>
                ))
              }
            </Col>
          </Row>
          <Row flex={1}>
            <Col span={24} className="h-full">
              {
                contentCard('Custom validation',
                  'Custom validation for form item\n' +
                  'Note: Custom validation has higher priority than validate rule(s)', (
                    <AppForm>
                      <AppSpace className="w-full" size={ITEM_SPACE}>
                        <Row>
                          <Col span={24}>
                            <AppForm.Item label="Field 1" labelCol={{span: 4}} inputCol={{span: 20}}
                                          validateStatus="success">
                              <AppInput.Text placeholder="Enter value"/>
                            </AppForm.Item>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <AppForm.Item label="Field 2" labelCol={{span: 4}} inputCol={{span: 20}}
                                          validateStatus="success" validateMessage="Look good! can submit">
                              <AppInput.Text defaultValue={SHORT_DUMMY_TEXT}
                                             placeholder="Enter value"/>
                            </AppForm.Item>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <AppForm.Item label="Field 3" labelCol={{span: 4}} inputCol={{span: 20}}
                                          validateStatus="warning">
                              <AppInput.Text placeholder="Enter value"/>
                            </AppForm.Item>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <AppForm.Item label="Field 4" labelCol={{span: 4}} inputCol={{span: 20}}
                                          validateStatus="warning" validateMessage="Seem not good, but can submit">
                              <AppInput.Text defaultValue="Consectetur adipiscing elit"
                                             placeholder="Enter value"/>
                            </AppForm.Item>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <AppForm.Item label="Field 5" labelCol={{span: 4}} inputCol={{span: 20}}
                                          validateStatus="error">
                              <AppInput.Text placeholder="Enter value"/>
                            </AppForm.Item>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <AppForm.Item label="Field 6" labelCol={{span: 4}} inputCol={{span: 20}}
                                          validateStatus="error" validateMessage="Error, cannot submit">
                              <AppInput.Text defaultValue="Ut enim ad minim veniam"
                                             placeholder="Enter value"/>
                            </AppForm.Item>
                          </Col>
                        </Row>
                      </AppSpace>
                    </AppForm>
                  ))
              }
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
          {
            contentCard('Basic usage', 'Basic use of form', (
              <AppForm onSubmit={(data) => console.log(data)}>
                <AppSpace className="w-full" size={ITEM_SPACE}>
                  <Row>
                    <Col span={24} sidePadding={true}>
                      <AppForm.Item name="userInfo.email" label="Email" labelCol={{span: 4}} inputCol={{span: 20}}
                                    validateRules={[ValidationRule.REQUIRED, ValidationRule.EMAIL]}
                                    showSuccessValidateStatus={true}>
                        <AppInput.Text placeholder="Enter your email" allowClear={true}/>
                      </AppForm.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} sidePadding={true}>
                      <AppForm.Item name="userInfo.password" label="Password" labelCol={{span: 4}} inputCol={{span: 20}}
                                    validateRules={[ValidationRule.REQUIRED, ValidationRule.MIN(6)]}
                                    showSuccessValidateStatus={true}>
                        <AppInput.Password placeholder="Enter your password (min length = 6)" allowClear={true}/>
                      </AppForm.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} sidePadding={true}>
                      <AppForm.Item name="userInfo.phone" label="Phone" labelCol={{span: 4}} inputCol={{span: 20}}
                                    validateRules={[ValidationRule.REQUIRED, ValidationRule.PHONE]}
                                    showSuccessValidateStatus={true}>
                        <AppInput.Text placeholder="Enter your phone number" allowClear={true}/>
                      </AppForm.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} sidePadding={true}>
                      <AppForm.Item name="userInfo.department" label="Department" labelCol={{span: 4}} inputCol={{span: 20}}
                                    validateRules={[ValidationRule.REQUIRED]}
                                    showSuccessValidateStatus={true}>
                        <AppInput.Text placeholder="Enter your department" value="IT Department" allowClear={true} disabled={true}/>
                      </AppForm.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12} sidePadding={true}>
                      <AppForm.Item name="userInfo.gender" label="Gender" labelCol={{span: 8}} inputCol={{span: 16}}
                                    validateRules={[ValidationRule.REQUIRED, ValidationRule.ONE_OF_VALUES(['male', 'female'])]}
                                    showSuccessValidateStatus={true}>
                        <AppInput.Text placeholder="Enter 'male' or 'female'" allowClear={true}/>
                      </AppForm.Item>
                    </Col>
                    <Col span={12} sidePadding={true}>
                      <AppForm.Item name="userInfo.age" label="Age" labelCol={{span: 6}} inputCol={{span: 18}}
                                    validateRules={[ValidationRule.REQUIRED, ValidationRule.MIN(0), ValidationRule.MAX(100)]}
                                    showSuccessValidateStatus={true}>
                        <AppInput.Number placeholder="Enter your age (min = 0, max = 100)" allowClear={true}/>
                      </AppForm.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} sidePadding={true}>
                      <AppForm.Item name="userInfo.introduce" label="Introduce" labelCol={{span: 4}} inputCol={{span: 20}}
                                    validateRules={[ValidationRule.MAX(128)]}
                                    showSuccessValidateStatus={true}>
                        <AppInput.TextArea placeholder="Write some introduce about yourself (max 128 characters length)"
                                           rows={5} allowClear={true}/>
                      </AppForm.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} sidePadding={true}>
                      <AppForm.Item name="userInfo.code" label="Code" labelCol={{span: 4}} inputCol={{span: 20}}
                                    validateRules={[ValidationRule.REQUIRED, ValidationRule.MAX(10), ValidationRule.PATTERN('^([a-z])*$')]}
                                    showSuccessValidateStatus={true}>
                        <AppInput.Text placeholder="Enter your code (max length = 10, lowercase alphabetic letters only)"
                                       allowClear={true}/>
                      </AppForm.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} sidePadding={true}>
                      <AppForm.Item name="userInfo.items" label="Items" labelCol={{span: 4}} inputCol={{span: 20}}
                                    validateRules={[ValidationRule.REQUIRED, ValidationRule.MAX(2)]}
                                    showSuccessValidateStatus={true}>
                        <AppSelect wFull={true} placeholder="Pick items (max = 2 items)" mode="multiple">
                          <Option value={1}>TV</Option>
                          <Option value={2}>Tablet</Option>
                          <Option value={3}>PC</Option>
                          <Option value={4}>Laptop</Option>
                          <Option value={5}>Smartphone</Option>
                        </AppSelect>
                      </AppForm.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12} sidePadding={true}>
                      <AppForm.Item name="userInfo.evenNumber" label="Even Num" labelCol={{span: 8}} inputCol={{span: 16}}
                                    validateRules={[ValidationRule.REQUIRED,
                                      {
                                        message: 'Please enter an even number',
                                        validate: (value) => value % 2 === 0
                                      }]}
                                    showSuccessValidateStatus={true}>
                        <AppInput.Number placeholder="Enter any even number (custom validation)"
                                         allowClear={true}/>
                      </AppForm.Item>
                    </Col>
                    <Col span={12} sidePadding={true}>
                      <AppForm.Item name="userInfo.oddNumber" label="Odd Num" labelCol={{span: 8}} inputCol={{span: 16}}
                                    validateRules={[ValidationRule.REQUIRED,
                                      {
                                        message: 'Please enter an odd number',
                                        validate: async (value) => {
                                          await delay(3000);
                                          return value % 2 !== 0;
                                        }
                                      }]}
                                    showSuccessValidateStatus={true}>
                        <AppInput.Number placeholder="Enter any even odd (delay 3s)"
                                         allowClear={true}/>
                      </AppForm.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} sidePadding={true}>
                      <AppForm.Item name="userInfo.task1" label="Task 1" labelCol={{span: 4}} inputCol={{span: 20}}
                                    validateRules={[ValidationRule.REQUIRED,
                                      {
                                        message: 'This task not found',
                                        validate: async (value) => {
                                          await delay(5000);
                                          return true;
                                        }
                                      }]}
                                    showSuccessValidateStatus={true}>
                        <AppInput.Text placeholder="Enter any text (custom validation, delay 5s, success)"
                                         allowClear={true}/>
                      </AppForm.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} sidePadding={true}>
                      <AppForm.Item name="userInfo.task2" label="Task 2" labelCol={{span: 4}} inputCol={{span: 20}}
                                    validateRules={[ValidationRule.REQUIRED,
                                      {
                                        message: 'This task not found',
                                        validate: async (value) => {
                                          await delay(2000);
                                          throw new Error('Unexpected error occurred, please try again');
                                        }
                                      }]}
                                    showSuccessValidateStatus={true}>
                        <AppInput.Text placeholder="Enter any text (custom validation, delay 2s, unexpected error)"
                                         allowClear={true}/>
                      </AppForm.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={0} sm={4} md={4} lg={4} xl={4} xxl={4} sidePadding={true}/>
                    <Col xs={24} sm={20} md={20} lg={20} xl={20} xxl={20} sidePadding={true}>
                      <AppButton type="primary" htmlType="submit">Submit</AppButton>
                    </Col>
                  </Row>
                </AppSpace>
              </AppForm>
            ))
          }
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
          {
            contentCard('Form Item Layout Direction', 'All types of form item layout direction', (
              <>
                <div className="h-full d-flex flex-column v-align-center">
                  <AppForm>
                    <AppSpace className="w-full" size={ITEM_SPACE}>
                      <Row>
                        <Col span={12} sidePadding={true}>
                          <AppForm.Item label="Field 1" labelCol={{span: 8}} inputCol={{span: 16}}>
                            <AppInput.Text placeholder="Enter value (direction horizontal)"/>
                          </AppForm.Item>
                        </Col>
                        <Col span={12} sidePadding={true}>
                          <AppForm.Item label="Field 2" labelCol={{span: 6}} inputCol={{span: 18}}>
                            <AppInput.Text placeholder="Enter value (direction horizontal)"/>
                          </AppForm.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} sidePadding={true}>
                          <AppForm.Item label="Field 3" labelCol={{span: 4}} inputCol={{span: 20}}>
                            <AppInput.Text placeholder="Enter value (direction horizontal)"/>
                          </AppForm.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} sidePadding={true}>
                          <AppForm.Item label="Field 4" labelCol={{span: 4}} inputCol={{span: 20}}
                                        validateRules={[ValidationRule.REQUIRED]}>
                            <AppInput.Text placeholder="Enter value (direction horizontal)"/>
                          </AppForm.Item>
                        </Col>
                      </Row>
                    </AppSpace>
                  </AppForm>
                </div>
                <AppDivider/>
                <div className="h-full d-flex flex-column v-align-center">
                  <AppForm>
                    <AppSpace className="w-full" size={ITEM_SPACE}>
                      <Row>
                        <Col xs={0} sm={4} md={4} lg={4} xl={4} xxl={4}/>
                        <Col xs={12} sm={10} md={10} lg={10} xl={10} xxl={10} sidePadding={true}>
                          <AppForm.Item layoutDirection="vertical" label="Field 1">
                            <AppInput.Text placeholder="Enter value (direction horizontal)"/>
                          </AppForm.Item>
                        </Col>
                        <Col xs={12} sm={10} md={10} lg={10} xl={10} xxl={10} sidePadding={true}>
                          <AppForm.Item layoutDirection="vertical" label="Field 2">
                            <AppInput.Text placeholder="Enter value (direction horizontal)"/>
                          </AppForm.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={0} sm={4} md={4} lg={4} xl={4} xxl={4}/>
                        <Col xs={24} sm={20} md={20} lg={20} xl={20} xxl={20} sidePadding={true}>
                          <AppForm.Item layoutDirection="vertical" label="Field 3">
                            <AppInput.Text placeholder="Enter value (direction vertical)"/>
                          </AppForm.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={0} sm={4} md={4} lg={4} xl={4} xxl={4}/>
                        <Col xs={24} sm={20} md={20} lg={20} xl={20} xxl={20} sidePadding={true}>
                          <AppForm.Item layoutDirection="vertical" label="Field 4"
                                        labelCol={{span: 4}} inputCol={{span: 20}}
                                        validateRules={[ValidationRule.REQUIRED]}>
                            <AppInput.Text placeholder="Enter value (direction vertical)"/>
                          </AppForm.Item>
                        </Col>
                      </Row>
                    </AppSpace>
                  </AppForm>
                </div>
              </>
            ))
          }
        </Col>
      </Row>
    )
  },
  {
    title: 'App Image',
    content: (
      <Row gutter={ROW_GUTTER} vStretch={true}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
          {
            contentCard('Basic usage', 'Basic use of image',
              <AppSpace size={ITEM_SPACE}>
                <AppImage src={APP_IMAGE_URL}/>
                <Row gutter={ROW_GUTTER} vStretch={true}>
                  <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                    <AppImage src={APP_IMAGE_URL} width="100%" height="100%"/>
                  </Col>
                  <Col xs={14} sm={14} md={14} lg={14} xl={14} xxl={14}>
                    <AppImage src={APP_IMAGE_URL} width="100%" height="100%"/>
                  </Col>
                </Row>
              </AppSpace>
            )
          }
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
          {
            contentCard('Shape options', 'All supported image shape: cirle and rounded',
              <AppSpace size={ITEM_SPACE}>
                <Row gutter={ROW_GUTTER} vStretch={true}>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}
                       flexContainer={true} className="flex-column vh-align-center">
                    <AppImage src={APP_IMAGE_URL} circle={true}/>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}
                       flexContainer={true} className="flex-column vh-align-center">
                    <AppImage src={APP_IMAGE_URL} circle={true}
                              width={APP_IMAGE_FIXED_SIZE} height={APP_IMAGE_FIXED_SIZE}/>
                  </Col>
                </Row>
                <Row gutter={ROW_GUTTER} vStretch={true}>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}
                       flexContainer={true} className="flex-column vh-align-center">
                    <AppImage src={APP_IMAGE_URL} round={true}/>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}
                       flexContainer={true} className="flex-column vh-align-center">
                    <AppImage src={APP_IMAGE_URL} round={true}
                              width={APP_IMAGE_FIXED_SIZE} height={APP_IMAGE_FIXED_SIZE}/>
                  </Col>
                </Row>
              </AppSpace>
            )
          }
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
          {
            contentCard('Placeholder options', 'All supported placeholder options: when no image and when load image error',
              <AppSpace size={ITEM_SPACE}>
                <Row gutter={ROW_GUTTER} vStretch={true}>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}
                       flexContainer={true} className="flex-column vh-align-center">
                    <AppImage round={true} width={APP_IMAGE_FIXED_SIZE} height={APP_IMAGE_FIXED_SIZE}/>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}
                       flexContainer={true} className="flex-column vh-align-center">
                    <AppImage placeholder={APP_IMAGE_PLACEHOLDER_URL} round={true}
                              width={APP_IMAGE_FIXED_SIZE} height={APP_IMAGE_FIXED_SIZE}/>
                  </Col>
                </Row>
                <Row gutter={ROW_GUTTER} vStretch={true}>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}
                       flexContainer={true} className="flex-column vh-align-center">
                    <AppImage src={APP_IMAGE_BROKEN_URL} round={true}
                              width={APP_IMAGE_FIXED_SIZE} height={APP_IMAGE_FIXED_SIZE}/>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}
                       flexContainer={true} className="flex-column vh-align-center">
                    <AppImage src={APP_IMAGE_BROKEN_URL} errorPlaceholder={APP_IMAGE_ERROR_PLACEHOLDER_URL}
                              onError={(event) => console.log('Image load error', event)}
                              round={true} width={APP_IMAGE_FIXED_SIZE} height={APP_IMAGE_FIXED_SIZE}/>
                  </Col>
                </Row>
              </AppSpace>
            )
          }
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
          {
            contentCard('Other options', 'Other options: image preview, fallback image, bordered',
              <AppSpace size={ITEM_SPACE}>
                <Row gutter={ROW_GUTTER} vStretch={true}>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}
                       flexContainer={true} className="flex-column vh-align-center">
                    <AppImage src={APP_IMAGE_URL} enablePreview={true} round={true}
                              width={APP_IMAGE_FIXED_SIZE} height={APP_IMAGE_FIXED_SIZE}/>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}
                       flexContainer={true} className="flex-column vh-align-center">
                    <AppImage src={APP_IMAGE_BROKEN_URL} fallback={APP_IMAGE_FALLBACK_URL}
                              enablePreview={true} round={true}
                              width={APP_IMAGE_FIXED_SIZE} height={APP_IMAGE_FIXED_SIZE}/>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}
                       flexContainer={true} className="flex-column vh-align-center">
                    <AppImage src={APP_IMAGE_URL} bordered={true} round={true}
                              width={APP_IMAGE_FIXED_SIZE} height={APP_IMAGE_FIXED_SIZE}/>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}
                       flexContainer={true} className="flex-column vh-align-center">
                    <AppImage src={APP_IMAGE_URL} imageFit="contain" bordered={true} round={true}
                              width={APP_IMAGE_FIXED_SIZE} height={APP_IMAGE_FIXED_SIZE}/>
                  </Col>
                </Row>
              </AppSpace>
            )
          }
        </Col>
      </Row>
    )
  },
  {
    title: 'App Alert',
    content: (
      <Row gutter={ROW_GUTTER} vStretch={true}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
          {
            contentCard('Basic usage', 'Basic use of alert',
              <AppSpace size={ITEM_SPACE}>
                <AppAlert type="success" message="Alert type success"/>
                <AppAlert type="info" message="Alert type info"/>
                <AppAlert type="warning" message="Alert type warning"/>
                <AppAlert type="error" message="Alert type error"/>
              </AppSpace>
            )
          }
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
          {
            contentCard('Alert action', 'Alert custom action',
              <AppSpace size={ITEM_SPACE}>
                <AppAlert type="info" message="Alert with custom actions (horizontal)"
                          action={
                            <AppSpace layoutDirection="horizontal" size={TINY_ITEM_SPACE}>
                              <AppButton onClick={() => AppNotification.info('Action 1', 'Action 1 clicked')}>Action 1</AppButton>
                              <AppButton onClick={() => AppNotification.info('Action 2', 'Action 2 clicked')}>Action 2</AppButton>
                            </AppSpace>
                          }/>
                <AppAlert type="info" message="Alert with custom actions (vertical)"
                          action={
                            <AppSpace layoutDirection="vertical" size={TINY_ITEM_SPACE}>
                              <AppButton onClick={() => AppNotification.info('Action 1', 'Action 1 clicked')}>Action 1</AppButton>
                              <AppButton onClick={() => AppNotification.info('Action 2', 'Action 2 clicked')}>Action 2</AppButton>
                            </AppSpace>
                          }/>
                <AppAlert type="info" message="Alert with custom action and close action" closable={true}
                          action={
                            <AppButton type="primary" onClick={() => AppNotification.info('Action 1', 'Action 1 clicked')}>Action 1</AppButton>
                          }/>
              </AppSpace>
            )
          }
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
          {
            contentCard('Alert expanded', 'Aler with icon and description',
              <AppSpace size={ITEM_SPACE}>
                <Row gutter={ROW_GUTTER}>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <AppSpace className="w-full" size={ITEM_SPACE}>
                      <AppAlert type="success" showIcon={true} message="Alert type success with icon"/>
                      <AppAlert type="info" showIcon={true} message="Alert type info with icon"/>
                    </AppSpace>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <AppSpace className="w-full" size={ITEM_SPACE}>
                      <AppAlert type="warning" showIcon={true} message="Alert type warning with icon"/>
                      <AppAlert type="error" showIcon={true} message="Alert type error with icon"/>
                    </AppSpace>
                  </Col>
                </Row>
                <Row gutter={ROW_GUTTER}>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <AppSpace className="w-full" size={ITEM_SPACE}>
                      <AppAlert type="success" showIcon={true} message="Alert type success expanded with icon"
                                description={LONG_DUMMY_TEXT}/>
                      <AppAlert type="info" showIcon={true} message="Alert type info expanded with icon"
                                description={LONG_DUMMY_TEXT}/>
                    </AppSpace>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <AppSpace className="w-full" size={ITEM_SPACE}>
                      <AppAlert type="warning" showIcon={true} message="Alert type warning expanded with icon"
                                description={LONG_DUMMY_TEXT}/>
                      <AppAlert type="error" showIcon={true} message="Alert type error expanded with icon"
                                description={LONG_DUMMY_TEXT}/>
                    </AppSpace>
                  </Col>
                </Row>
              </AppSpace>
            )
          }
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
          {
            contentCard('Other options', 'All other options of this component',
              <AppSpace size={ITEM_SPACE}>
                <AppAlert type="info" closable={true} message="Alert with close action"/>
                <AppAlert type="info" closable={true} closeText="Close" message="Alert with close action as text"/>
                <AppAlert type="info" closable={true} message="Alert with on close action handler"
                          onClose={() => AppNotification.info('Alert close', 'triggered alert onClose()')}/>
                <AppAlert type="info" closable={true} message="Alert with after close action handler"
                          afterClose={() => AppNotification.info('Alert after close', 'triggered alert afterClose()')}/>
                <AppAlert type="info" autoTextColor={false} message="Alert without auto text color"/>
                <AppAlert type="info" showIcon={true} icon={<Icons.GlobalOutlined/>} message="Alert type info with custom icon"/>
                <AppAlert type="info" showIcon={true} icon={<Icons.GlobalOutlined/>}
                          message="Alert type info expanded with custom icon" description={LONG_DUMMY_TEXT}/>
              </AppSpace>
            )
          }
        </Col>
      </Row>
    )
  },
  {
    title: 'App Menu',
    content: (
      <Row gutter={ROW_GUTTER} vStretch={true}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          {
            contentCard('Basic usage', 'Basic use of menu: vertical, horizontail layout; vertical, horizontal layout expand',
              <AppSpace size={ITEM_SPACE}>
                <Row>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <AppMenu items={DEMO_MENU} direction="horizontal" theme="dark"/>
                  </Col>
                </Row>
                <Row gutter={ITEM_SPACE}>
                  <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <AppMenu items={DEMO_MENU} expandDirection="horizontal" theme="dark"/>
                  </Col>
                  <Col xs={0} sm={0} md={12} lg={12} xl={12} xxl={12}/>
                  <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <AppMenu items={DEMO_MENU} theme="dark"/>
                  </Col>
                </Row>
              </AppSpace>
            )
          }
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          {
            contentCard('Menu item expand trigger', 'Menu item expand event trigger',
              <AppSpace size={ITEM_SPACE}>
                <Row gutter={ITEM_SPACE}>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                    <Text>Allow expand all</Text>
                    <AppMenu items={DEMO_MENU} theme="dark" allowMultiSelect={false} expandCurrentOnly={false}
                             onItemExpandChanged={(menuItem, isExpanded, itemKey) =>
                               AppNotification.info(`[${itemKey}] '${menuItem.title}' ${isExpanded? 'expanded' : 'collapsed'}`)}/>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                    <Text>Allow expand current only</Text>
                    <AppMenu items={DEMO_MENU} theme="dark" allowMultiSelect={false} expandCurrentOnly={true}
                             onItemExpandChanged={(menuItem, isExpanded, itemKey) =>
                               AppNotification.info(`[${itemKey}] '${menuItem.title}' ${isExpanded? 'expanded' : 'collapsed'}`)}/>
                  </Col>
                </Row>
              </AppSpace>
            )
          }
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          {
            contentCard('Menu item select trigger', 'Menu item select event trigger',
              <AppSpace size={ITEM_SPACE}>
                <Row gutter={ITEM_SPACE}>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                    <Text>Multi-selection</Text>
                    <AppMenu items={DEMO_MENU} theme="dark" allowMultiSelect={true}
                             onItemSelectChanged={(menuItem, isSelected, itemKey) =>
                               AppNotification.info(`[${itemKey}] '${menuItem.title}' ${isSelected? 'selected' : 'de-selected'}`)}/>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                    <Text>Single selection (no de-select)</Text>
                    <AppMenu items={DEMO_MENU} theme="dark" allowMultiSelect={false}
                             onItemSelectChanged={(menuItem, isSelected, itemKey) =>
                               AppNotification.info(`[${itemKey}] '${menuItem.title}' ${isSelected? 'selected' : 'de-selected'}`)}/>
                  </Col>
                </Row>
              </AppSpace>
            )
          }
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          {
            contentCard('Other options', 'Basic use of menu: vertical, horizontail layout; vertical, horizontal layout expand',
              <AppSpace size={ITEM_SPACE}>
                <Row gutter={ITEM_SPACE}>
                  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
                    <Text>Only expand current selected</Text>
                    <AppMenu items={DEMO_MENU} theme="dark" expandCurrentOnly={true}/>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
                    <Text>Allow multiple expand</Text>
                    <AppMenu items={DEMO_MENU} theme="dark"/>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
                    <Text>Auto expand all sub-menu(s)</Text>
                    <AppMenu items={DEMO_MENU} theme="dark" expandAll={true}/>
                  </Col>
                </Row>
              </AppSpace>
            )
          }
        </Col>
      </Row>
    )
  }
];

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