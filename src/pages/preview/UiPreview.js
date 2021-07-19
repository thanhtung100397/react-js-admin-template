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
import { Icons } from '../../assets/icons';
import { ValidationRule } from '../../constants/validationRules';
import { delay } from '../../utils/helpers';
import './UiPreview.scss';

const { Row, Col } = AppGrid;
const { Title, Text, Link } = AppTypography;
const { Option } = AppSelect;

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
                    <Title level={5} firstCap={true}>
                      lorem ipsum dolor sit amet (First Caps)
                    </Title>
                    <Title level={5} allCaps={true}>
                      (All Caps) Lorem ipsum dolor sit amet
                    </Title>
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
  },
  {
    title: 'III. App Select',
    content: (
      <Row gutter={ROW_GUTTER} vStretch={true}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
          {
            contentCard('Basic usage', 'Basic use of text input',
              <AppSpace size={ITEM_SPACE}>
                <AppSelect wFull={true}>
                  <Option value={1}>Lorem</Option>
                  <Option value={2}>Ipsum</Option>
                  <Option value={3}>Dolor</Option>
                  <Option value={4}>Sit</Option>
                  <Option value={5}>Amet</Option>
                </AppSelect>
                <AppSelect wFull={true} placeholder="(Placeholder) Pick one">
                  <Option value={1}>Lorem</Option>
                  <Option value={2}>Ipsum</Option>
                  <Option value={3}>Dolor</Option>
                  <Option value={4}>Sit</Option>
                  <Option value={5}>Amet</Option>
                </AppSelect>
                <AppSelect wFull={true} placeholder="(Placeholder) Pick one"
                           defaultValue={1}>
                  <Option value={1}>Lorem</Option>
                  <Option value={2}>Ipsum</Option>
                  <Option value={3}>Dolor</Option>
                  <Option value={4}>Sit</Option>
                  <Option value={5}>Amet</Option>
                </AppSelect>
                <AppSelect wFull={true} placeholder="(Placeholder) Pick multiple"
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
                <AppSelect wFull={true} placeholder="(Placeholder) Pick or enter tags"
                           mode="tags">
                  <Option value="Lorem">Lorem</Option>
                  <Option value="Ipsum">Ipsum</Option>
                  <Option value="Dolor">Dolor</Option>
                  <Option value="Sit">Sit</Option>
                  <Option value="Amet">Amet</Option>
                </AppSelect>
                <AppSelect wFull={true} placeholder="(Placeholder) Pick or enter tags"
                           mode="tags" defaultValue={['Lorem', 'Ipsum']}>
                  <Option value="Lorem">Lorem</Option>
                  <Option value="Ipsum">Ipsum</Option>
                  <Option value="Dolor">Dolor</Option>
                  <Option value="Sit">Sit</Option>
                  <Option value="Amet">Amet</Option>
                </AppSelect>
                <AppSelect wFull={true} placeholder="(Placeholder) Pick or enter tags (max display = 3)"
                           mode="tags" maxTagCount={3}>
                  <Option value="Lorem">Lorem</Option>
                  <Option value="Ipsum">Ipsum</Option>
                  <Option value="Dolor">Dolor</Option>
                  <Option value="Sit">Sit</Option>
                  <Option value="Amet">Amet</Option>
                </AppSelect>
                <AppSelect wFull={true} placeholder="(Placeholder) Pick or enter tags (max tag text length= 10)"
                           mode="tags" maxTagTextLength={10}>
                  <Option value="Lorem ipsum dolor sit amet">Lorem ipsum dolor sit amet</Option>
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
                <AppSelect wFull={true} placeholder="Pick or enter search keyword (by contain, match case)"
                           filterMatchCase={true} showSearch={true}>
                  <Option value="Lorem">Lorem</Option>
                  <Option value="Ipsum">Ipsum</Option>
                  <Option value="Dolor">Dolor</Option>
                  <Option value="Sit">Sit</Option>
                  <Option value="Amet">Amet</Option>
                </AppSelect>
                <AppSelect wFull={true} placeholder="Pick or enter search keyword (by contain, ignore case)"
                           showSearch={true}>
                  <Option value="Lorem">Lorem</Option>
                  <Option value="Ipsum">Ipsum</Option>
                  <Option value="Dolor">Dolor</Option>
                  <Option value="Sit">Sit</Option>
                  <Option value="Amet">Amet</Option>
                </AppSelect>
                <AppSelect wFull={true} placeholder="Pick or enter search keyword (by start, match case, result sort asc)"
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
                <AppSelect wFull={true} placeholder="Pick or enter search keyword (by start, ignore case, result sort asc)"
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
                <AppSelect wFull={true} placeholder="Pick or enter search keyword (filter label, by contain, match case)"
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
                <AppSelect wFull={true} placeholder="Custom display label"
                           displayOptionProp="label">
                  <Option value={1} label="One">1</Option>
                  <Option value={2} label="Two">2</Option>
                  <Option value={3} label="Three">3</Option>
                  <Option value={4} label="Four">4</Option>
                  <Option value={5} label="Five">5</Option>
                </AppSelect>
                <AppSelect wFull={true} allowClear={true}
                           placeholder="Select with clear button">
                  <Option value={1}>Lorem</Option>
                  <Option value={2}>Ipsum</Option>
                  <Option value={3}>Dolor</Option>
                  <Option value={4}>Sit</Option>
                  <Option value={5}>Amet</Option>
                </AppSelect>
                <AppSelect wFull={true} disabled={true}
                           placeholder="Select disabled">
                  <Option value={1}>Lorem</Option>
                  <Option value={2}>Ipsum</Option>
                  <Option value={3}>Dolor</Option>
                  <Option value={4}>Sit</Option>
                  <Option value={5}>Amet</Option>
                </AppSelect>
                <AppSelect wFull={true} onChange={(value) => console.log('Select with onChange:', value)}
                           placeholder="Select with onChange (check console)">
                  <Option value={1}>Lorem</Option>
                  <Option value={2}>Ipsum</Option>
                  <Option value={3}>Dolor</Option>
                  <Option value={4}>Sit</Option>
                  <Option value={5}>Amet</Option>
                </AppSelect>
                <AppSelect wFull={true} fullValueOnChange={true}
                           onChange={(value) => console.log('Select with onChange full value:', value)}
                           placeholder="Select with onChange full value (check console)">
                  <Option value={1}>Lorem</Option>
                  <Option value={2}>Ipsum</Option>
                  <Option value={3}>Dolor</Option>
                  <Option value={4}>Sit</Option>
                  <Option value={5}>Amet</Option>
                </AppSelect>
                <AppSelect wFull={true} borderless={true} showArrow={false}
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
    title: 'IV. App Form',
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
                              <AppInput.Text defaultValue="Lorem ipsum dolor sit amet"
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
                                          throw "Unexpected error occurred, please try again";
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