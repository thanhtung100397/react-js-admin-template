import React from "react";
import { images } from "../../assets/images";
import AppContainer from '../../containers/container/AppContainer';
import AppCard from '../../components/card/AppCard';
import './Login.scss';

import { Form, Input, Button, Row, Col } from 'antd';
import AppForm from '../../components/form/AppForm';
import AppInput from '../../components/input/AppInput';

const pageStyle = {
  backgroundImage: `url(${images.img_started_background})`
}

const Login = (props) => {
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
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>


          <AppForm>
            <AppInput label="Hello world" validateStatus="success" validateMessage="This is success!"/>
            <AppInput label="Hello world 3" labelCol={{width: 20}} validateStatus="warning" validateMessage="This is warning!"/>
            <AppInput label="Hello world 4 he hehe hehehe" labelCol={{span: 1}} inputCol={{span: 2}} validateStatus="error" validateMessage="This is error!"/>
            <AppInput label={<div>Bello</div>}/>

            <Row>
              <Col span={12}>
                <AppInput label="Username" labelCol={{width: 20}}/>
              </Col>
              <Col span={12}>
                <AppInput label="Password" labelCol={{width: 20}}/>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <AppInput label="Name" labelCol={{width: 20}}/>
              </Col>
              <Col span={8}>
                <AppInput label="Age" labelCol={{width: 20}}/>
              </Col>
            </Row>
          </AppForm>






        </AppCard>
      </AppContainer>
    </div>
  )
};

export default Login;