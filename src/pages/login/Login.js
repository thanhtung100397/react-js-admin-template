import React, { useState } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import AppContainer from '../../containers/container/AppContainer';
import AppCard from '../../components/card/AppCard';
import AppForm from '../../components/form/AppForm';
import AppFormItem from '../../components/form/AppFormItem';
import { images } from '../../assets/images';
import './Login.scss';
import { ValidationRule } from '../../constants/validationRules';

const pageStyle = {
  backgroundImage: `url(${images.img_started_background})`
};

const Login = (props) => {
  let [value, setValue] = useState(0);
  return (
    <div className="login-page wh-full" style={pageStyle}>
      <AppContainer className="wh-full">
        <AppCard>




          <Form
            name="basic"
            initialValues={{
              username: 'abcdef',
              password: 'ghijkl'
            }}
            onFinish={(data) => {
              console.log('FORM FINISH', data);
            }}
            onFinishFailed={(errors) => {
              console.log('FORM ERROR', errors);
            }}
          >
            <Form.Item
              labelCol={{
                span: 6
              }}
              wrapperCol={{
                span: 18
              }}
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              labelCol={{
                span: 6
              }}
              wrapperCol={{
                span: 18
              }}
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" onClick={() => setValue(value + 1)}>
                Submit
              </Button>
            </Form.Item>
          </Form>

          <AppForm>
            {
              inputRef => (
               <>
                 <AppForm.Item ref={inputRef} label="Hello world" validateStatus="success" validateMessage="This is success!" validateRules={[ValidationRule.REQUIRED]}>
                   {/*<Input/>*/}
                 </AppForm.Item>
                 {/*<AppFormItem ref={inputRef} label="Hello world 3" labelCol={{width: 20}} showSuccessValidateStatus={true} validateStatus="warning" validateMessage="This is warning!" validateRules={[ValidationRule.REQUIRED]}/>*/}
                 {/*<AppFormItem ref={inputRef} label="Hello world 4 he hehe hehehe" labelCol={{span: 1}} inputCol={{span: 2}} validateStatus="error" validateMessage="This is error!"/>*/}
                 {/*<AppFormItem ref={inputRef} label={<div>Bello</div>} validateStatus="validating" validateMessage="Do validating..."/>*/}
                 {/*<AppFormItem ref={inputRef} label="Hello world 5" labelCol={{width: 20}} showSuccessValidateStatus={true} validateRules={[ValidationRule.REQUIRED, {validate: async (value) => {await new Promise(r => setTimeout(r, 4000)); throw Error("This is error!!!!!!")}}]}/>*/}
                 {/*<AppFormItem ref={inputRef} label="Hello world 6" labelCol={{width: 20}} showSuccessValidateStatus={true} validateRules={[ValidationRule.REQUIRED, {validate: async (value) => {await new Promise(r => setTimeout(r, 2000)); return true}}]}/>*/}
                 {/*<AppFormItem ref={inputRef} label="Hello world 7" labelCol={{width: 20}} showSuccessValidateStatus={true} validateRules={[ValidationRule.REQUIRED, {validate: async (value) => {await new Promise(r => setTimeout(r, 3000)); throw Error("This is heavy error!!!!!!")}}]}/>*/}
                 {/*<AppFormItem ref={inputRef} label="Hello world 8" labelCol={{width: 20}} showSuccessValidateStatus={true} validateRules={[ValidationRule.REQUIRED, {message: 'HALLO WORLD', validate: async (value) => {await new Promise(r => setTimeout(r, 5000)); return false}}]}/>*/}
                 {/*<AppFormItem ref={inputRef} label="Hello world 8" labelCol={{width: 20}} showSuccessValidateStatus={true} validateRules={[ValidationRule.REQUIRED, {transform: async (value) => {await new Promise(r => setTimeout(r, 2000)); return 'HAHA';}, validate: async (value) => {await new Promise(r => setTimeout(r, 2000)); return value === 'hello'}, trigger: async (value, valid, origin) => {await new Promise(r => setTimeout(r, 2000));console.log('TRIGGER', valid, valid, origin)}}]}/>*/}
                 <Button type="primary" htmlType="submit">
                   Submit
                 </Button>
               </>
              )
            }
          </AppForm>
        </AppCard>
      </AppContainer>
    </div>
  )
};

export default Login;