import React from 'react';
import AppLayout from './layouts/AppLayout';
import BottomNav from './commons/BottomNav';
import { Button, Card, Form, Icon, Input, Row, Col } from 'antd';

class Register extends React.Component {

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 16 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 32 },
        sm: { span: 18 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <AppLayout>
        <div className="container login-section">
          <Card title = "Register an account">
            <Form {...formItemLayout}>
            <Form.Item label="E-mail">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  }, {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Password" hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  }, {
                    validator: this.validateToNextPassword,
                  },
                ],
                   })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="Confirm Password" hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  }, {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            </Form>
            <Form.Item>
              <BottomNav
                loading = {false}
                goBackButtonText = {'Cancel'}
                goNextButtonText = {'Register'}
              />
            </Form.Item>
          </Card>
        </div>
      </AppLayout>
    );
  }
}

export default Form.create()(Register);
