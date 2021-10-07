import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import AppContainer from '../../containers/container/AppContainer';
import AppSpace from '../../containers/space/AppSpace';
import AppLanguageSelect from '../../translations/components/AppLanguageSelect';
import AppCard from '../../components/card/AppCard';
import AppImage from '../../components/image/AppImage';
import AppTypography from '../../components/typography/AppTypography';
import AppForm from '../../components/form/AppForm';
import AppInput from '../../components/input/AppInput';
import AppButton from '../../components/button/AppButton';
import { ValidationRule } from '../../constants/validationRules';
import { images } from '../../assets/images';
import { ColorIcons } from '../../assets/icons';
import './Login.scss';
import { useDispatch } from 'react-redux';
import { signInAction } from '../../state/data/api/auth/signIn/signIn';

const { Title } = AppTypography;

const pageStyle = {
  backgroundImage: `url(${images.img_started_background})`
};

const Login = (props) => {
  const [signingIn, setSigningIn] = useState();
  const dispatch = useDispatch();

  const handleFormSubmit = (data) => {
    // setSigningIn(true);
    dispatch(signInAction.FETCH_API({
      body: data
    }));
  };

  return (
    <AppContainer className="login-page wh-full" style={pageStyle}>
      <AppLanguageSelect icon={<ColorIcons.GlobalOutlined/>} borderless={false}/>
      <AppCard>
        <div className="login-form-container d-flex flex-column h-align-center">
          <AppImage className="logo-image"
                    circle={true} bordered={true}
                    src={images.img_app_logo}
                    placeholder={images.img_logo_placeholder}
                    width={64} height={64}/>
          <Title className="sign-in-title" level={4} allCaps={true}>
            <FormattedMessage id="ID_SIGN_IN"/>
          </Title>
          <AppForm onSubmit={handleFormSubmit}>
            <AppSpace className="w-full" size={12}>
              <AppForm.Item layoutDirection="vertical"
                            name="username" label={<FormattedMessage id="ID_USERNAME"/>}
                            validateRules={[ValidationRule.REQUIRED]}>
                <AppInput.Text icon={<ColorIcons.UserOutlined/>} allowClear={true}
                               placeholderID="ID_USERNAME" autoComplete="off"/>
              </AppForm.Item>
              <AppForm.Item layoutDirection="vertical"
                            name="password" label={<FormattedMessage id="ID_PASSWORD"/>}
                            validateRules={[ValidationRule.REQUIRED]}>
                <AppInput.Password icon={<ColorIcons.KeyOutlined/>} allowClear={true}
                                   placeholderID="ID_PASSWORD"/>
              </AppForm.Item>
              <AppButton className="btn-sign-in w-full" type="primary" htmlType="submit"
                         loading={signingIn}>
                <FormattedMessage id="ID_SIGN_IN"/>
              </AppButton>
            </AppSpace>
          </AppForm>
        </div>
      </AppCard>
    </AppContainer>
  )
};

export default Login;
