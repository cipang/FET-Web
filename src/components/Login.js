import React, { Component } from 'react';
import './login.css';
import AppLayout from './layouts/AppLayout';
import { Button, Card, Form, Icon, Input, Row } from 'antd';

class Login extends Component {

  render() {
    const { getFieldDecorator } = this.props.form;
    const emailIcon = <Icon
                        type="mail"
                        style={{ color: 'rgba(0,0,0,.25)'}}
                      />;
    const passwordIcon = <Icon
                        type="lock"
                        style={{ color: 'rgba(0,0,0,.25)'}}
                      />;
    // Todo: responsive margin top
    return(
      <AppLayout>
        <div className="container login-section"  style={{ width: 450 }}>
          <Card title="Account Login">
            <Form  className="login-form">
              <Form.Item>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Please input your email!' }],
                })(
                  <Input prefix={emailIcon} size="large"  placeholder="email" />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your password!' }],
                })(
                  <Input prefix={passwordIcon} size="large" type="password" placeholder="password" />
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit"style={{ width: '100%' }}>
                  Log in
                </Button>
              </Form.Item>
              Or <a href="">register now!</a>
            </Form>
          </Card>
        </div>
      </AppLayout>
    );
  }
}

export default Form.create()(Login);
