import React from 'react';
import AppNotification from '../../components/notification/AppNotification';
import AppContainer from '../../containers/container/AppContainer';
import AppRow from '../../containers/grid/AppRow';
import AppCol from '../../containers/grid/AppCol';
import AppCard from '../../components/card/AppCard';
import AppTitle from '../../components/typography/AppTitle';
import AppDivider from '../../components/divider/AppDivider';
import './UiPreview.scss';

const ROW_GUTTER = 24;

const contentCard = (name, footer, content) => {
  return (
    <AppCard noBodyPadding={true}>
      <div className="content">
        {content}
      </div>
      <AppDivider title={name}/>
      <div className="footer">
        {footer}
      </div>
    </AppCard>
  );
};

const UiPreview = (props) => {
  return (
    <div className="ui-preview-page page-padding">
      <AppContainer>
        <AppTitle className="group-title" level={3}>I. Typography</AppTitle>
        <AppContainer className="content-padding">
          <AppTitle className="section-title" level={4}>1. App Title</AppTitle>
          <AppRow gutter={ROW_GUTTER}>
            <AppCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
              {
                contentCard('Level', 'All component levels',
                  <>
                    <AppTitle>
                      1. Lorem ipsum dolor sit amet
                    </AppTitle>
                    <AppTitle level={2}>
                      2. Lorem ipsum dolor sit amet
                    </AppTitle>
                    <AppTitle level={3}>
                      3. Lorem ipsum dolor sit amet
                    </AppTitle>
                    <AppTitle level={4}>
                      4. Lorem ipsum dolor sit amet
                    </AppTitle>
                    <AppTitle level={5}>
                      5. Lorem ipsum dolor sit amet
                    </AppTitle>
                  </>
                )
              }
            </AppCol>
            <AppCol xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
              <AppRow>
                <AppCol span={24}>
                  {
                    contentCard('Text Style', 'All supported component text style',
                      <>
                        <AppTitle level={5} bold={true}>
                          (Bold) Lorem ipsum dolor sit amet
                        </AppTitle>
                        <AppTitle level={5} italic={true}>
                          (Italic) Lorem ipsum dolor sit amet
                        </AppTitle>
                        <AppTitle level={5} underline={true}>
                          (Underline) Lorem ipsum dolor sit amet
                        </AppTitle>
                        <AppTitle level={5} disabled={true}>
                          (Disabled) Lorem ipsum dolor sit amet
                        </AppTitle>
                      </>
                    )
                  }
                </AppCol>
              </AppRow>
              <AppRow>
                <AppCol span={24}>
                  {
                    contentCard('Other Options', 'All other options of this component',
                      <>
                        <AppTitle level={5} ellipsis={true}>
                          (Ellipsis) Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                          in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                          non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                        </AppTitle>
                        <AppTitle level={5} copyable={true}>
                          (Copyable) Lorem ipsum dolor sit amet
                        </AppTitle>
                        <AppTitle level={5} onClick={() => AppNotification.success('Click Event Trigger', 'Title clicked')}>
                          (Click listener) Lorem ipsum dolor sit amet
                        </AppTitle>
                      </>
                    )
                  }
                </AppCol>
              </AppRow>
            </AppCol>
          </AppRow>
        </AppContainer>

      </AppContainer>
    </div>
  );
};

export default UiPreview;